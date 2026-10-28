'use strict';
const express=require('express');
const path=require('node:path');
const nodemailer=require('nodemailer');
require('dotenv').config();
const {createStore,StaffError}=require('./server/staff-store.cjs');
const {installStaffRoutes}=require('./server/staff-routes.cjs');
const {validate}=require('./server/submissions.cjs');

function createApp(options={}){
  const app=express(),store=options.store||createStore(),origin=options.origin||process.env.STAFF_APP_ORIGIN||'https://crosta.kitchen';
  app.locals.store=store;
  app.disable('x-powered-by');app.set('trust proxy','loopback');
  app.use(express.json({limit:'24kb'}));app.use(express.urlencoded({extended:false,limit:'24kb'}));
  installStaffRoutes(app,store,{origin});
  app.use((req,res,next)=>{
    if(/^\/\./.test(req.path)||/^\/(server|scripts|tests|database|node_modules)(\/|$)/.test(req.path)||/^\/(server\.js|package(-lock)?\.json|GEMINI\.md|ASSETS\.md)$/.test(req.path)||/^\/api\/.*\.(js|cjs)$/.test(req.path))return res.sendStatus(404);
    next();
  });
  app.use('/staff',(req,res,next)=>{res.set({'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"});next();});
  const limits=new Map();
  async function submit(kind,req,res){
    let saved;
    try{
      if(req.get('origin')&&req.get('origin')!==origin)throw new StaffError(403,'ORIGIN_REJECTED');
      const payload=validate(kind,req.body);
      const now=Date.now(),key=req.ip,previous=limits.get(key);
      if(previous&&previous.until>now&&previous.count>=60)throw new StaffError(429,'TRY_LATER');
      if(limits.size>10000)for(const [ip,item]of limits)if(item.until<=now)limits.delete(ip);
      limits.set(key,{count:previous&&previous.until>now?previous.count+1:1,until:previous&&previous.until>now?previous.until:now+60000});
      if(store.ready()){
        saved=store.save(kind,payload,req.body.requestId);
        if(!saved.created)return res.json({success:true,reference:`CR-${saved.request.number}`,message:'Request already saved.'});
      }
      let notification='sent';
      try{
        const mail={from:`"Crosta ${kind==='booking'?'Reservations':'Reviews'}" <${process.env.GMAIL_USER}>`,to:process.env.GMAIL_USER,subject:`Crosta • ${kind==='booking'?'Reservation request':'New review'}${saved?` CR-${saved.request.number}`:''}`,text:kind==='booking'?`Name: ${payload.name}\nDate: ${payload.date}\nTime: ${payload.time}\nGuests: ${payload.guests}\nPhone: ${payload.phone||'Not provided'}\n${payload.notes}`:`Name: ${payload.name}\nEmail: ${payload.email||'Not provided'}\nCategory: ${payload.category}\nRating: ${payload.rating}/5\nRecommendation: ${payload.highlight}\n\n${payload.comment}`};
        if(options.sendMail)await options.sendMail(mail);
        else{
          if(!process.env.GMAIL_USER||!process.env.GMAIL_APP_PASSWORD){notification='not_configured';throw new Error('EMAIL_UNAVAILABLE');}
          await nodemailer.createTransport({service:'gmail',connectionTimeout:8000,greetingTimeout:8000,socketTimeout:10000,auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}}).sendMail(mail);
        }
      }catch{
        if(notification!=='not_configured')notification='failed';
        if(!saved)throw new StaffError(503,'EMAIL_UNAVAILABLE');
      }
      if(saved)store.notification(saved.request.id,notification);
      return res.json({success:true,message:saved?'Request saved.':'Request sent.',...(saved?{reference:`CR-${saved.request.number}`}:{})});
    }catch(error){
      if(saved)return res.json({success:true,reference:`CR-${saved.request.number}`,message:'Request saved.'});
      return res.status(error instanceof StaffError?error.status:503).json({message:error instanceof StaffError?error.code:'SERVICE_UNAVAILABLE'});
    }
  }
  app.post('/api/send-email',(req,res)=>submit('booking',req,res));
  app.post('/api/submit-review',(req,res)=>submit('review',req,res));
  app.use('/api',(req,res)=>res.status(404).json({code:'NOT_FOUND'}));
  app.use(express.static(__dirname,{dotfiles:'ignore',setHeaders:(res,filename)=>{if(filename.endsWith('.html'))res.setHeader('Cache-Control','no-cache, no-store, must-revalidate');else if(/\.(js|css)$/.test(filename))res.setHeader('Cache-Control','public, max-age=300, must-revalidate');}}));
  app.get('*',(req,res)=>{if(req.path.startsWith('/staff/'))return res.sendStatus(404);res.sendFile(path.join(__dirname,'index.html'));});
  app.use((error,req,res,next)=>{if(res.headersSent)return next(error);res.status(error.status===413?413:400).json({message:'INVALID_REQUEST'});});
  return app;
}
if(require.main===module){const port=process.env.PORT||3000;createApp().listen(port,()=>console.log(`Crosta server listening on port ${port}`));}
module.exports={createApp};
