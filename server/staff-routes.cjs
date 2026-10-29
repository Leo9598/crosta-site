'use strict';
const {StaffError}=require('./staff-store.cjs');
const statuses=['today','all','active','new','confirmed','seated','completed','cancelled','reviewed','archived'];
const uuid=/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const cookie='crosta_staff';
function secureResponse(req,res,next){res.set({'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'});next();}
function sameOrigin(req,origin){if(req.get('origin')!==origin||!req.is('application/json'))throw new StaffError(403,'ORIGIN_REJECTED');}
function token(req){const value=String(req.headers.cookie||'').split(';').find(item=>item.trim().startsWith(cookie+'='));return value?value.trim().slice(cookie.length+1):'';}
function setCookie(res,value,seconds){res.setHeader('Set-Cookie',`${cookie}=${value}; Path=/api/staff; HttpOnly; Secure; SameSite=Strict; Max-Age=${seconds}`);}
function fail(res,error){const known=error instanceof StaffError;return res.status(known?error.status:503).json({code:known?error.code:'SERVICE_UNAVAILABLE'});}
function installStaffRoutes(app,store,{origin=process.env.STAFF_APP_ORIGIN||'https://crosta.kitchen'}={}){
  const attempts=new Map();
  app.use('/api/staff',secureResponse);
  app.all('/api/staff/session',async(req,res)=>{
    try{
      if(req.method==='GET')return res.json({ready:store.ready(),staff:store.session(token(req))});
      if(!['POST','DELETE'].includes(req.method))throw new StaffError(405,'METHOD_NOT_ALLOWED');
      sameOrigin(req,origin);
      if(req.method==='DELETE'){store.logout(token(req));setCookie(res,'',0);return res.json({success:true});}
      if(!store.ready())throw new StaffError(503,'SETUP_REQUIRED');
      const key=req.ip,now=Date.now(),entry=attempts.get(key);
      if(entry&&entry.until>now&&entry.count>=5)throw new StaffError(429,'TRY_LATER');
      if(attempts.size>10000)for(const [ip,item]of attempts)if(item.until<=now)attempts.delete(ip);
      const {email,password}=req.body||{};
      if(typeof email!=='string'||email.length>254||typeof password!=='string'||password.length<12||password.length>200)throw new StaffError(400,'SIGN_IN_FAILED');
      try{const session=await store.login(email.trim(),password);store.logout(token(req));attempts.delete(key);setCookie(res,session.token,28800);return res.json({staff:session.user});}
      catch(error){attempts.set(key,{count:entry&&entry.until>now?entry.count+1:1,until:entry&&entry.until>now?entry.until:now+15*60000});throw error;}
    }catch(error){return fail(res,error);}
  });
  app.all('/api/staff/requests',(req,res)=>{
    try{
      if(!['GET','PATCH'].includes(req.method))throw new StaffError(405,'METHOD_NOT_ALLOWED');
      if(req.method==='PATCH')sameOrigin(req,origin);
      const staff=store.session(token(req));if(!staff)throw new StaffError(401,'SIGN_IN_REQUIRED');
      if(req.method==='GET'){
        const {kind='booking',status='active',search='',offset='0'}=req.query;
        if((status==='today'&&kind!=='booking')||!['booking','review'].includes(kind)||!statuses.includes(status)||typeof search!=='string'||search.length>100||!/^\d{1,5}$/.test(String(offset))||Number(offset)>10000)throw new StaffError(400,'INVALID_FILTER');
        return res.json(store.snapshot({kind,status,search,offset:Number(offset)}));
      }
      const {id,version,status,note=''}=req.body||{};
      if(!uuid.test(id||'')||!Number.isInteger(version)||version<0||typeof status!=='string'||typeof note!=='string'||note.length>240)throw new StaffError(400,'INVALID_UPDATE');
      return res.json({request:store.change(id,version,status,staff.id,note)});
    }catch(error){return fail(res,error);}
  });
  app.all('/api/staff/history',(req,res)=>{
    try{
      if(req.method!=='GET')throw new StaffError(405,'METHOD_NOT_ALLOWED');
      if(!store.session(token(req)))throw new StaffError(401,'SIGN_IN_REQUIRED');
      if(!uuid.test(req.query.id||''))throw new StaffError(400,'INVALID_REQUEST');
      return res.json({events:store.history(req.query.id)});
    }catch(error){return fail(res,error);}
  });
}
module.exports={installStaffRoutes,uuid};
