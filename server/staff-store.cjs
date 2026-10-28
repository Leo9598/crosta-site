'use strict';
const {DatabaseSync} = require('node:sqlite');
const {randomUUID,randomBytes,createHash,scrypt,timingSafeEqual} = require('node:crypto');
const {promisify} = require('node:util');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const derive = promisify(scrypt);
const digest = value => createHash('sha256').update(value).digest('hex');
const localDay = date => new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Chisinau',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
class StaffError extends Error { constructor(status,code){super(code);this.status=status;this.code=code;} }
const transitions = {
  booking:{new:['confirmed','cancelled'],confirmed:['seated','cancelled'],seated:['completed','cancelled']},
  review:{new:['reviewed','archived'],reviewed:['archived']}
};
async function passwordHash(password){
  const salt=randomBytes(16).toString('hex');
  return `${salt}:${(await derive(password,salt,64)).toString('hex')}`;
}
async function passwordMatches(password,stored){
  const [salt,hash]=String(stored||'').split(':');
  const value=await derive(password,salt||'crosta-invalid-account',64);
  const expected=Buffer.from(hash||'00'.repeat(64),'hex');
  return expected.length===value.length && timingSafeEqual(expected,value);
}
function createStore(options={}){
  const directory=options.directory||process.env.CROSTA_PRIVATE_DIR||path.join(os.homedir(),'.local','share','crosta');
  const publicRoot=path.resolve(__dirname,'..'),privateRoot=path.resolve(directory);
  if(privateRoot===publicRoot||privateRoot.startsWith(publicRoot+path.sep))throw new Error('Staff storage must be outside the public website directory.');
  fs.mkdirSync(directory,{recursive:true,mode:0o700});
  fs.chmodSync(directory,0o700);
  const filename=path.join(directory,'staff.sqlite');
  const db=new DatabaseSync(filename);
  fs.chmodSync(filename,0o600);
  db.exec(`PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS staff_users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,display_name TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('owner','staff')),password_hash TEXT NOT NULL,active INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE IF NOT EXISTS staff_sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES staff_users(id),expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS requests(id TEXT PRIMARY KEY,number INTEGER UNIQUE NOT NULL,kind TEXT NOT NULL CHECK(kind IN ('booking','review')),request_key TEXT UNIQUE NOT NULL,request_digest TEXT NOT NULL,payload TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'new',version INTEGER NOT NULL DEFAULT 0,notification_status TEXT NOT NULL DEFAULT 'pending',created_at TEXT NOT NULL,updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS request_events(id INTEGER PRIMARY KEY,request_id TEXT NOT NULL REFERENCES requests(id),actor_id TEXT REFERENCES staff_users(id),from_status TEXT,to_status TEXT NOT NULL,note TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS request_queue ON requests(kind,status,created_at DESC);
    CREATE INDEX IF NOT EXISTS request_history ON request_events(request_id,id);`);
  const now=options.now||(()=>new Date());
  const safeUser=user=>user?{id:user.id,email:user.email,display_name:user.display_name,role:user.role}:null;
  const unpack=row=>row?{id:row.id,number:row.number,kind:row.kind,payload:JSON.parse(row.payload),status:row.status,version:row.version,notification_status:row.notification_status,created_at:row.created_at,updated_at:row.updated_at}:null;
  function ready(){return Boolean(db.prepare("SELECT 1 FROM staff_users WHERE active=1 AND role='owner' LIMIT 1").get());}
  function save(kind,payload,key){
    const requestKey=key||randomUUID(),fingerprint=digest(JSON.stringify({kind,payload})),at=now().toISOString();
    db.exec('BEGIN IMMEDIATE');
    try{
      const previous=db.prepare('SELECT * FROM requests WHERE request_key=?').get(requestKey);
      if(previous){if(previous.request_digest!==fingerprint)throw new StaffError(409,'REQUEST_CONFLICT');db.exec('COMMIT');return {created:false,request:unpack(previous)};}
      const id=randomUUID(),number=db.prepare('SELECT COALESCE(MAX(number),1000)+1 AS next FROM requests').get().next;
      db.prepare('INSERT INTO requests(id,number,kind,request_key,request_digest,payload,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)').run(id,number,kind,requestKey,fingerprint,JSON.stringify(payload),at,at);
      db.prepare("INSERT INTO request_events(request_id,to_status,created_at) VALUES(?,'new',?)").run(id,at);
      db.exec('COMMIT');return {created:true,request:unpack(db.prepare('SELECT * FROM requests WHERE id=?').get(id))};
    }catch(error){db.exec('ROLLBACK');throw error;}
  }
  function change(id,version,status,actor,note=''){
    db.exec('BEGIN IMMEDIATE');
    try{
      if(!db.prepare('SELECT 1 FROM staff_users WHERE id=? AND active=1').get(actor))throw new StaffError(403,'STAFF_ONLY');
      const row=db.prepare('SELECT * FROM requests WHERE id=?').get(id);
      if(!row)throw new StaffError(404,'NOT_FOUND');
      if(row.version!==version)throw new StaffError(409,'VERSION_CONFLICT');
      if(!transitions[row.kind][row.status]?.includes(status))throw new StaffError(400,'INVALID_TRANSITION');
      if(status==='cancelled'&&note.trim().length<3)throw new StaffError(400,'NOTE_REQUIRED');
      const at=now().toISOString();
      db.prepare('UPDATE requests SET status=?,version=version+1,updated_at=? WHERE id=?').run(status,at,id);
      db.prepare('INSERT INTO request_events(request_id,actor_id,from_status,to_status,note,created_at) VALUES(?,?,?,?,?,?)').run(id,actor,row.status,status,note.trim(),at);
      db.exec('COMMIT');return unpack(db.prepare('SELECT * FROM requests WHERE id=?').get(id));
    }catch(error){db.exec('ROLLBACK');throw error;}
  }
  function snapshot({kind='booking',status='active',search='',offset=0}){
    const rows=db.prepare('SELECT * FROM requests WHERE kind=? ORDER BY created_at DESC,number DESC').all(kind);
    const terminal=['completed','cancelled','archived'];
    const filtered=rows.filter(row=>(status==='all'||(status==='active'&&!terminal.includes(row.status))||status===row.status)&&(!search||normalize(`${JSON.parse(row.payload).name} ${JSON.parse(row.payload).phone||''} ${JSON.parse(row.payload).email||''} CR-${row.number}`).includes(normalize(search))));
    const today=localDay(now());
    return {requests:filtered.slice(offset,offset+50).map(unpack),total:filtered.length,counts:{new:rows.filter(row=>row.status==='new').length,active:rows.filter(row=>!terminal.includes(row.status)).length,completed_today:rows.filter(row=>['completed','reviewed','archived'].includes(row.status)&&localDay(new Date(row.updated_at))===today).length}};
  }
  const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  return {db,directory,ready,save,change,snapshot,
    async createUser(email,name,role,password){
      const hash=await passwordHash(password),id=randomUUID();
      db.prepare('INSERT INTO staff_users(id,email,display_name,role,password_hash) VALUES(?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET display_name=excluded.display_name,role=excluded.role,password_hash=excluded.password_hash,active=1').run(id,email.toLowerCase(),name,role,hash);
      const user=db.prepare('SELECT * FROM staff_users WHERE email=?').get(email.toLowerCase());
      db.prepare('DELETE FROM staff_sessions WHERE user_id=?').run(user.id);return safeUser(user);
    },
    async login(email,password){
      const user=db.prepare('SELECT * FROM staff_users WHERE email=? AND active=1').get(email.toLowerCase());
      const valid=await passwordMatches(password,user?.password_hash);if(!user||!valid)throw new StaffError(401,'SIGN_IN_FAILED');
      const token=randomBytes(32).toString('hex');
      db.prepare('DELETE FROM staff_sessions WHERE expires_at<=?').run(now().getTime());
      db.prepare('INSERT INTO staff_sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').run(digest(token),user.id,now().getTime()+8*60*60*1000);
      return {token,user:safeUser(user)};
    },
    session(token){if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return safeUser(db.prepare('SELECT u.* FROM staff_users u JOIN staff_sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>? AND u.active=1').get(digest(token),now().getTime()));},
    logout(token){if(token)db.prepare('DELETE FROM staff_sessions WHERE token_hash=?').run(digest(token));},
    disableUser(email){const user=db.prepare('SELECT id FROM staff_users WHERE email=?').get(email.toLowerCase());if(user){db.prepare('UPDATE staff_users SET active=0 WHERE id=?').run(user.id);db.prepare('DELETE FROM staff_sessions WHERE user_id=?').run(user.id);}},
    notification(id,status){db.prepare('UPDATE requests SET notification_status=? WHERE id=?').run(status,id);},
    history(id){if(!db.prepare('SELECT 1 FROM requests WHERE id=?').get(id))throw new StaffError(404,'NOT_FOUND');return db.prepare('SELECT from_status,to_status,note,created_at FROM request_events WHERE request_id=? ORDER BY id').all(id);},
    close(){db.close();}
  };
}
module.exports={createStore,StaffError,localDay};
