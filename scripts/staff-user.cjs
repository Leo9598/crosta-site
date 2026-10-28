#!/usr/bin/env node
'use strict';
const {createStore}=require('../server/staff-store.cjs');
const readline=require('node:readline');
const {Writable}=require('node:stream');
async function main(){
  const [command,email,name='Personal',role='staff']=process.argv.slice(2);
  if(!['create','disable'].includes(command)||!/^\S+@\S+\.\S+$/.test(email||'')||!['owner','staff'].includes(role)){
    console.error('Usage: node scripts/staff-user.cjs create EMAIL "Display name" owner|staff\n       node scripts/staff-user.cjs disable EMAIL');process.exitCode=1;return;
  }
  if(command==='create'&&!process.stdin.isTTY){console.error('Run this in an interactive terminal. The password is entered privately.');process.exitCode=1;return;}
  const store=createStore();
  try{
    if(command==='disable'){store.disableUser(email);console.log('Account disabled; existing sessions revoked.');return;}
    let muted=false;
    const output=new Writable({write(chunk,encoding,callback){if(!muted)process.stdout.write(chunk,encoding);callback();}});
    const rl=readline.createInterface({input:process.stdin,output,terminal:true});
    const secret=prompt=>new Promise(resolve=>{process.stdout.write(prompt);muted=true;rl.question('',answer=>{muted=false;process.stdout.write('\n');resolve(answer);});});
    const password=await secret('New password (at least 12 characters, hidden): ');
    const confirm=await secret('Repeat password (hidden): ');rl.close();
    if(password.length<12||password.length>200||password!==confirm)throw new Error('Passwords must match and contain 12–200 characters.');
    await store.createUser(email.trim().toLowerCase(),name.slice(0,100),role,password);
    console.log('Account configured. Sign in at https://crosta.kitchen/staff/');
    if(role==='owner')console.log('Live dashboard storage is now active. New website requests will be saved before email is attempted.');
  }finally{store.close();}
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
