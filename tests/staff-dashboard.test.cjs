'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {mkdtempSync,rmSync,statSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {randomUUID}=require('node:crypto');
const {createStore}=require('../server/staff-store.cjs');
const {createApp}=require('../server.js');
const origin='https://crosta.kitchen';
const email='owner@example.test',password='Test-only password 481!';
async function fixture(run){
  const directory=mkdtempSync(path.join(tmpdir(),'crosta-dashboard-test-'));
  const store=createStore({directory});let failEmail=false,emails=0;
  const app=createApp({store,origin,sendMail:async()=>{emails++;if(failEmail)throw new Error('Simulated mail failure');}});
  const server=await new Promise(resolve=>{const instance=app.listen(0,'127.0.0.1',()=>resolve(instance));});
  const base=`http://127.0.0.1:${server.address().port}`;
  const request=async(url,{method='GET',body,cookie,requestOrigin=origin}={})=>{
    const response=await fetch(base+url,{method,headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...(requestOrigin?{Origin:requestOrigin}:{}),...(cookie?{Cookie:cookie}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
    const text=await response.text();let data;try{data=JSON.parse(text);}catch{data=text;}
    return {status:response.status,headers:response.headers,data};
  };
  const signIn=async()=>{const result=await request('/api/staff/session',{method:'POST',body:{email,password}});assert.equal(result.status,200);return result.headers.get('set-cookie').split(';')[0];};
  try{await run({store,directory,request,signIn,emailFailure:()=>{failEmail=true;},emails:()=>emails});}
  finally{await new Promise(resolve=>server.close(resolve));store.close();rmSync(directory,{recursive:true,force:true});}
}
const booking=()=>({requestId:randomUUID(),name:'Test Guest',date:new Date(Date.now()+86400000).toISOString().slice(0,10),time:'13:00',guests:3,phone:'+37360000000'});
const review=()=>({requestId:randomUUID(),name:'Test Reviewer',email:'guest@example.test',category:'food',rating:5,comment:'Test-only review for the integration test.',highlight:'Shakshuka',aspectRatings:{food:5}});
test('locked deployment exposes no private data and preserves the existing email flow',()=>fixture(async({store,request,emails})=>{
  const session=await request('/api/staff/session');assert.deepEqual(session.data,{ready:false,staff:null});
  for(const url of ['/api/staff/requests','/api/staff/history?id='+randomUUID()]){const result=await request(url);assert.equal(result.status,401);assert.equal(result.headers.get('cache-control'),'no-store');assert.equal(result.data.code,'SIGN_IN_REQUIRED');}
  assert.equal((await request('/api/staff/session',{method:'POST',body:{email,password}})).status,503);
  const submitted=await request('/api/send-email',{method:'POST',body:booking()});assert.equal(submitted.status,200);assert.equal(emails(),1);assert.equal(store.snapshot({kind:'booking'}).total,0);
}));
test('staff login uses secure cookies, protected storage and approved accounts',()=>fixture(async({store,directory,request})=>{
  await store.createUser(email,'Test Owner','owner',password);
  assert.equal(statSync(directory).mode&0o777,0o700);assert.equal(statSync(path.join(directory,'staff.sqlite')).mode&0o777,0o600);
  assert.equal((await request('/api/staff/session',{method:'POST',requestOrigin:'https://other.test',body:{email,password}})).status,403);
  assert.equal((await request('/api/staff/session',{method:'POST',body:{email,password:'Wrong password 999'}})).status,401);
  const result=await request('/api/staff/session',{method:'POST',body:{email,password}});assert.equal(result.status,200);
  assert.match(result.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Strict/);assert(!JSON.stringify(result.data).includes('password'));assert(!JSON.stringify(result.data).includes('token'));
  const cookie=result.headers.get('set-cookie').split(';')[0];assert.equal((await request('/api/staff/session',{cookie})).data.staff.role,'owner');
  const raw=cookie.split('=')[1],stored=store.db.prepare('SELECT * FROM staff_sessions').get();assert.notEqual(stored.token_hash,raw);
  store.disableUser(email);assert.equal((await request('/api/staff/requests',{cookie})).status,401);
  assert.equal(store.ready(),true,'revoking a login must not stop durable request capture after activation');
}));
test('reservations persist before mail; retry UUIDs are idempotent and conflicts are rejected',()=>fixture(async({store,request,signIn,emailFailure,emails})=>{
  await store.createUser(email,'Test Owner','owner',password);emailFailure();
  const payload=booking();const result=await request('/api/send-email',{method:'POST',body:payload});assert.equal(result.status,200);assert.match(result.data.reference,/^CR-\d+$/);assert(!JSON.stringify(result.data).includes(payload.name));
  const again=await request('/api/send-email',{method:'POST',body:payload});assert.equal(again.data.reference,result.data.reference);assert.equal(emails(),1);
  assert.equal((await request('/api/send-email',{method:'POST',body:{...payload,guests:4}})).status,409);
  const cookie=await signIn();const snapshot=await request('/api/staff/requests?kind=booking&status=all',{cookie});assert.equal(snapshot.data.total,1);assert.equal(snapshot.data.requests[0].notification_status,'failed');assert.equal(snapshot.data.requests[0].payload.phone,payload.phone);
  assert.equal((await request('/api/staff/requests?kind=booking&search=Test%20Guest',{cookie})).data.total,1);
}));
test('status updates enforce origin, versions, valid transitions and an audit trail',()=>fixture(async({store,request,signIn})=>{
  const user=await store.createUser(email,'Test Owner','owner',password),cookie=await signIn();
  const saved=store.save('booking',booking(),randomUUID()).request;
  const update=(status,version,note='',requestOrigin=origin)=>request('/api/staff/requests',{method:'PATCH',cookie,requestOrigin,body:{id:saved.id,status,version,note}});
  assert.equal((await update('confirmed',0,'','https://other.test')).status,403);
  assert.equal((await update('completed',0)).status,400);
  const confirmed=await update('confirmed',0);assert.equal(confirmed.status,200);assert.equal(confirmed.data.request.version,1);
  assert.equal((await update('seated',0)).status,409);
  assert.equal((await update('cancelled',1,'')).status,400);
  assert.equal((await update('cancelled',1,'Guest changed plans.')).status,200);
  const history=await request('/api/staff/history?id='+saved.id,{cookie});assert.equal(history.data.events.length,3);assert.equal(history.data.events[2].note,'Guest changed plans.');
  assert.equal((await update('confirmed',2)).status,400);
  assert.throws(()=>store.change(saved.id,2,'confirmed',user.id),/INVALID_TRANSITION/);
  assert.equal((await request('/api/staff/requests?offset=bad',{cookie})).status,400);
  await request('/api/staff/session',{method:'DELETE',cookie,body:{}});assert.equal((await request('/api/staff/requests',{cookie})).status,401);
}));
test('reviews are saved privately and can be read and archived',()=>fixture(async({store,request,signIn})=>{
  await store.createUser(email,'Test Owner','owner',password);const cookie=await signIn();
  assert.equal((await request('/api/submit-review',{method:'POST',body:review()})).status,200);
  const list=await request('/api/staff/requests?kind=review',{cookie});const row=list.data.requests[0];assert.equal(row.payload.rating,5);
  for(const [status,version]of [['reviewed',0],['archived',1]])assert.equal((await request('/api/staff/requests',{method:'PATCH',cookie,body:{id:row.id,version,status}})).status,200);
  assert.equal((await request('/api/staff/requests?kind=review',{cookie})).data.total,0);
  assert.equal((await request('/api/staff/requests?kind=review&status=all',{cookie})).data.total,1);
}));
test('invalid submissions do not save data or call the mail transport',()=>fixture(async({store,request,emails})=>{
  await store.createUser(email,'Test Owner','owner',password);
  for(const payload of [{...booking(),guests:0},{...booking(),date:'2026-02-30'},{...booking(),time:'03:00'},{...booking(),phone:'<script>'},{...booking(),requestId:'bad'}])assert.equal((await request('/api/send-email',{method:'POST',body:payload})).status,400);
  assert.equal((await request('/api/submit-review',{method:'POST',body:{...review(),rating:99}})).status,400);
  assert.equal(emails(),0);assert.equal(store.snapshot({kind:'booking'}).total,0);
}));
test('private source, environment, and storage paths cannot be downloaded',()=>fixture(async({request})=>{
  for(const url of ['/server.js','/server/staff-store.cjs','/scripts/staff-user.cjs','/database/README.md','/tests/staff-dashboard.test.cjs','/node_modules/express/package.json','/.env','/api/send-email.js'])assert.equal((await request(url)).status,404,url);
  const page=await request('/staff/');assert.equal(page.status,200);assert.match(page.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.equal(page.headers.get('x-robots-tag'),'noindex, nofollow');
}));
test('repeated bad staff passwords are throttled',()=>fixture(async({store,request})=>{
  await store.createUser(email,'Test Owner','owner',password);
  for(let i=0;i<5;i++)assert.equal((await request('/api/staff/session',{method:'POST',body:{email,password:'Wrong password 999'}})).status,401);
  assert.equal((await request('/api/staff/session',{method:'POST',body:{email,password}})).status,429);
}));
test('SQLite requests and staff sessions survive process restarts',async()=>{
  const directory=mkdtempSync(path.join(tmpdir(),'crosta-persistence-test-'));let store=createStore({directory});
  try{
    await store.createUser(email,'Test Owner','owner',password);const session=await store.login(email,password);const saved=store.save('booking',booking(),randomUUID()).request;store.close();store=createStore({directory});
    assert.equal(store.snapshot({kind:'booking'}).requests[0].id,saved.id);assert.equal(store.session(session.token).email,email);assert.equal(store.history(saved.id).length,1);
  }finally{store.close();rmSync(directory,{recursive:true,force:true});}
});
test('today uses Chisinau date, sorts before pagination, and excludes cancelled guests',()=>{
  const directory=mkdtempSync(path.join(tmpdir(),'crosta-today-'));
  const store=createStore({directory,now:()=>new Date('2026-10-28T23:30:00Z')});
  try{
    for(let i=0;i<52;i++)store.save('booking',{name:`Guest ${i}`,date:'2026-10-29',time:i===51?'08:00':'18:00',guests:2});
    store.save('booking',{name:'Yesterday',date:'2026-10-28',time:'09:00',guests:9});
    store.save('booking',{name:'Tomorrow',date:'2026-10-30',time:'09:00',guests:9});
    const cancelled=store.save('booking',{name:'Cancelled',date:'2026-10-29',time:'10:00',guests:8}).request;
    store.db.prepare("UPDATE requests SET status='cancelled' WHERE id=?").run(cancelled.id);
    const result=store.snapshot({status:'today'});
    assert.equal(result.today,'2026-10-29');assert.equal(result.total,53);assert.equal(result.guests,104);
    assert.equal(result.requests[0].payload.time,'08:00');assert.equal(result.requests[1].status,'cancelled');
    assert.equal(result.requests.length,50);assert.equal(store.snapshot({status:'today',offset:50}).requests.length,3);
    assert.equal(store.snapshot({status:'today',search:'Tomorrow'}).total,0);
  }finally{store.close();rmSync(directory,{recursive:true,force:true});}
});
