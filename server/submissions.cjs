'use strict';
const {StaffError,localDay}=require('./staff-store.cjs');
const {uuid}=require('./staff-routes.cjs');
const categories=['food','interior','service','bakery','atmosphere'];
function validate(kind,input={}){
  if(!input||typeof input!=='object'||Array.isArray(input))throw new StaffError(400,'INVALID_REQUEST');
  const text=(key,max)=>typeof input[key]==='string'?input[key].trim().slice(0,max):'';
  const name=text('name',120);if(!name)throw new StaffError(400,'INVALID_NAME');
  if(input.requestId!==undefined&&!uuid.test(input.requestId))throw new StaffError(400,'INVALID_REQUEST_ID');
  if(kind==='booking'){
    const date=text('date',10),time=text('time',5),guests=Number(input.guests),phone=text('phone',25).replace(/[\s()-]/g,'');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date+'T12:00:00Z'))||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date||date<localDay(new Date())||!/^((0[89])|(1\d)|(2[0-2])):00$/.test(time)||!Number.isInteger(guests)||guests<1||guests>20||(phone&&!/^\+?\d{8,15}$/.test(phone)))throw new StaffError(400,'INVALID_BOOKING');
    return {name,date,time,guests,phone,notes:text('notes',1000)};
  }
  const category=text('category',30)||'food',rating=Number(input.rating),comment=text('comment',6000),email=text('email',254),highlight=text('highlight',500);
  if(!categories.includes(category)||!Number.isInteger(rating)||rating<1||rating>5||comment.length<10||(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))throw new StaffError(400,'INVALID_REVIEW');
  const aspectRatings=Object.fromEntries(categories.filter(key=>Number.isInteger(input.aspectRatings?.[key])&&input.aspectRatings[key]>=1&&input.aspectRatings[key]<=5).map(key=>[key,input.aspectRatings[key]]));
  return {name,email,category,rating,comment,highlight,aspectRatings};
}
module.exports={validate};
