(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const {t,locale}=window.staffI18n;
  const labels=()=>({new:t("Nouă"),confirmed:t("Confirmată"),seated:t("La masă"),completed:t("Încheiată"),cancelled:t("Anulată"),reviewed:t("Citită"),archived:t("Arhivată")});
  const actions=()=>({confirmed:t("Confirmă rezervarea"),seated:t("Marchează sosirea"),completed:t("Încheie vizita"),reviewed:t("Marchează citită"),archived:t("Arhivează recenzia")});
  const categories=()=>({food:t("Mâncare"),interior:t("Interior"),service:t("Serviciu"),bakery:t("Patiserie & cafea"),atmosphere:t("Atmosferă")});
  const terminal=['completed','cancelled','archived'];
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const time=value=>new Intl.DateTimeFormat(locale(),{timeZone:'Europe/Chisinau',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
  const day=value=>new Intl.DateTimeFormat(locale(),{day:'numeric',month:'long',year:'numeric'}).format(new Date(value+'T12:00:00'));
  const badge=status=>`<span class="badge ${esc(status)}">${esc(labels()[status]||status)}</span>`;
  let currentUser=null;
  let demo=false,kind='booking',requests=[],demoRequests=[],selected=null,offset=0,total=0,busy=false,loading=false,pendingLoad=false,revision=0,searchTimer;
  function showError(message){$('error').hidden=!message;$('error').textContent=message;}
  function showLogin(){revision++;demo=false;requests=[];demoRequests=[];selected=null;$('dashboard').hidden=true;$('login').hidden=false;$('logout').hidden=true;$('requestList').replaceChildren();$('detail').replaceChildren();$('password').value='';showError('');window.scrollTo({top:0,behavior:'auto'});}
  async function api(path,options={}){
    const response=await fetch(`/api/staff/${path}`,{credentials:'same-origin',cache:'no-store',...options,headers:{'Content-Type':'application/json',...options.headers}});
    const data=await response.json().catch(()=>({code:'SERVICE_UNAVAILABLE'}));
    if(!response.ok){if(response.status===401||response.status===403){showLogin();$('loginMessage').textContent=t("Intră din nou pentru a continua.");}const error=new Error(data.code||'SERVICE_UNAVAILABLE');throw error;}
    return data;
  }
  function filterOptions(){
    const values=['active','new','all'];
    $('statusFilter').innerHTML=values.map(value=>`<option value="${value}">${value==='active'?(kind==='booking'?t("Rezervări în curs"):t("Recenzii de gestionat")):value==='all'?t("Toate, inclusiv încheiate"):t("Doar cele noi")}</option>`).join('');
    document.querySelectorAll('[data-kind]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.kind===kind)));
  }
  function enter(user){currentUser=user;revision++;$('login').hidden=true;$('dashboard').hidden=false;$('logout').hidden=demo;$('demoBanner').hidden=!demo;$('staffName').textContent=demo?t("Încearcă panoul cu date fictive."):`${t("Bun venit,")} ${user.display_name}.`;kind='booking';offset=0;selected=null;$('search').value='';filterOptions();renderEmpty();load();window.scrollTo({top:0,behavior:'auto'});}
  function makeDemo(){
    const now=new Date(),today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Chisinau',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
    const samples=[
      {kind:'booking',status:'new',payload:{name:'Oaspete demonstrativ A',date:today,time:'13:00',guests:4,phone:'',notes:'Exemplu de rezervare pentru un prânz în familie.'}},
      {kind:'booking',status:'confirmed',payload:{name:'Oaspete demonstrativ B',date:today,time:'18:00',guests:2,phone:'',notes:''}},
      {kind:'booking',status:'seated',payload:{name:'Oaspete demonstrativ C',date:today,time:'10:00',guests:3,phone:'',notes:''}},
      {kind:'review',status:'new',payload:{name:'Oaspete demonstrativ D',category:'food',rating:5,comment:'Un mic dejun foarte bun și o atmosferă plăcută. Acesta este un exemplu fictiv.',highlight:'Shakshuka',email:'',aspectRatings:{food:5,service:5}}},
      {kind:'review',status:'reviewed',payload:{name:'Oaspete demonstrativ E',category:'atmosphere',rating:4,comment:'Un loc liniștit pentru cafea și conversații. Recenzie fictivă pentru demonstrație.',email:'',aspectRatings:{atmosphere:4}}}
    ];
    return samples.map((sample,index)=>({...sample,id:`demo-${index+1}`,number:1005-index,version:0,notification_status:'not_configured',created_at:new Date(now.getTime()-(index+1)*7*60000).toISOString(),updated_at:now.toISOString(),events:[{to_status:'new',created_at:now.toISOString(),note:'Exemplu fictiv.'}]}));
  }
  async function load(){
    if(busy||$('dashboard').hidden)return;
    if(loading){pendingLoad=true;return;}
    loading=true;const current=revision;$('refresh').disabled=true;$('syncState').textContent=demo?t("Demonstrație"):t("Se actualizează…");
    try{
      let result;
      if(demo){
        const status=$('statusFilter').value,search=$('search').value.trim().toLowerCase(),rows=demoRequests.filter(row=>row.kind===kind);
        const filtered=rows.filter(row=>(status==='all'||(status==='active'&&!terminal.includes(row.status))||row.status===status)&&`${row.payload.name} CR-${row.number}`.toLowerCase().includes(search));
        result={requests:filtered.slice(offset,offset+50),total:filtered.length,counts:{new:rows.filter(row=>row.status==='new').length,active:rows.filter(row=>!terminal.includes(row.status)).length,completed_today:rows.filter(row=>['completed','reviewed','archived'].includes(row.status)).length}};
      }else result=await api(`requests?kind=${kind}&status=${encodeURIComponent($('statusFilter').value)}&search=${encodeURIComponent($('search').value.trim())}&offset=${offset}`);
      if(current!==revision)return;
      requests=result.requests;total=result.total;$('listSummary').textContent=kind==='booking'?`${t("Rezervări noi:")} ${result.counts.new} · ${t("În curs:")} ${result.counts.active}`:`${t("Recenzii noi:")} ${result.counts.new}`;renderList();
      const updated=requests.find(row=>row.id===selected?.id);
      if(updated&&!document.activeElement?.closest('#cancelForm')){selected=updated;renderDetail();}else if(selected&&!updated){selected=null;renderEmpty();}
      $('syncState').textContent=demo?t("Date fictive"):`${t("Actualizat")} ${new Intl.DateTimeFormat(locale(),{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Chisinau'}).format(new Date())}`;showError('');
    }catch{if(current===revision&&!$('dashboard').hidden){showError(t("Nu putem actualiza solicitările. Datele afișate pot fi vechi."));$('syncState').textContent=t("Conexiune întreruptă");}}
    finally{loading=false;$('refresh').disabled=false;if(pendingLoad){pendingLoad=false;load();}}
  }
  function renderList(){
    $('requestList').innerHTML=requests.length?requests.map(row=>`<button type="button" class="request-row ${selected?.id===row.id?'selected':''}" data-request="${esc(row.id)}" aria-pressed="${selected?.id===row.id}"><span class="row-top"><span class="customer">${esc(row.payload.name)}</span>${badge(row.status)}</span><span class="row-bottom">${row.kind==='booking'?`<span>${esc(day(row.payload.date))} · ${esc(row.payload.time)}</span><strong>${row.payload.guests} ${t("persoane")}</strong>`:`<span>${esc(categories()[row.payload.category])}</span><strong>${row.payload.rating} / 5</strong>`}</span></button>`).join(''):`<div class="empty"><h2>${t("Totul este la zi.")}</h2><p>${t("Nicio solicitare pentru această selecție.")}</p></div>`;
    document.querySelector('.pagination').hidden=total<=50;
    $('pageInfo').textContent=total?`${offset+1}–${Math.min(offset+50,total)} ${t("din")} ${total}`:t("0 solicitări");$('previous').disabled=offset===0;$('next').disabled=offset+50>=total;
  }
  function renderEmpty(){$('detail').hidden=true;$('detail').replaceChildren();document.querySelector('.request-layout').classList.remove('has-selection');}
  function renderDetail(){
    if(!selected){renderEmpty();return;}
    const historyOpen=$('detail').querySelector('.extra-details')?.open;
    const cancelDraft=$('cancelNote')?.value,cancelWasOpen=$('cancelForm')&&!$('cancelForm').hidden;
    $('detail').hidden=false;document.querySelector('.request-layout').classList.add('has-selection');
    const row=selected,p=row.payload;
    const next=row.kind==='booking'?({new:'confirmed',confirmed:'seated',seated:'completed'}[row.status]):({new:'reviewed',reviewed:'archived'}[row.status]);
    const validPhone=/^\+?\d{8,15}$/.test(p.phone||'');
    const info=row.kind==='booking'?`<div class="booking-facts"><div><span>${t("Data")}</span><strong>${esc(day(p.date))}</strong></div><div><span>${t("Ora")}</span><strong>${esc(p.time)}</strong></div><div><span>${t("Oaspeți")}</span><strong>${p.guests} ${t("persoane")}</strong></div></div><h3>${t("Contact")}</h3><p>${validPhone?`<a href="tel:${esc(p.phone)}">${esc(p.phone)}</a>`:t("Număr de telefon nespecificat.")}</p>${p.notes?`<h3>${t("Observații")}</h3><p>${esc(p.notes)}</p>`:''}`:`<div class="review-rating">${p.rating}<span> / 5</span></div><p class="review-quote">${esc(p.comment)}</p>${p.highlight?`<h3>${t("Recomandă")}</h3><p>${esc(p.highlight)}</p>`:''}${p.email?`<h3>${t("Email")}</h3><p>${esc(p.email)}</p>`:''}<div class="aspect-list">${Object.entries(p.aspectRatings||{}).map(([key,value])=>`<span>${esc(categories()[key])} <strong>${value}/5</strong></span>`).join('')}</div><p class="fee-note">${t("Marcarea drept citită sau arhivată nu modifică recenziile afișate pe site.")}</p>`;
    $('detail').innerHTML=`<button type="button" id="closeDetail" class="quiet back-button">${t("← Înapoi la listă")}</button><div class="detail-title"><h2>${esc(p.name)}</h2>${badge(row.status)}</div>${info}${next?`<div class="actions"><button type="button" class="primary" data-next="${next}">${actions()[next]}</button>${row.kind==='booking'?`<button type="button" id="cancelRequest" class="cancel">${t("Anulează rezervarea")}</button>`:''}</div>`:''}${row.kind==='booking'&&!terminal.includes(row.status)?`<form id="cancelForm" hidden><label for="cancelNote">${t("Motivul anulării")}</label><textarea id="cancelNote" minlength="3" maxlength="240" required></textarea><div class="actions"><button type="submit" class="cancel">${t("Confirmă anularea")}</button><button id="cancelBack" type="button" class="quiet">${t("Înapoi")}</button></div></form>`:''}<details class="extra-details" ${historyOpen?'open':''}><summary>${t("Istoric și alte detalii")}</summary><p class="meta">CR-${row.number} · ${t("Primită")} ${esc(time(row.created_at))}</p><p class="fee-note">${demo?t("Demonstrație — nicio notificare nu este trimisă."):({sent:t("Notificare email trimisă."),failed:t("Emailul nu a fost trimis. Solicitarea este salvată în panou."),pending:t("Notificare email în așteptare."),not_configured:t("Emailul nu este configurat. Solicitarea este salvată în panou.")}[row.notification_status]||'')}</p><ol id="history" class="history"><li>${t("Se încarcă…")}</li></ol></details>`;
    if(cancelWasOpen&&$('cancelForm')){$('cancelForm').hidden=false;$('cancelNote').value=cancelDraft;}
    const id=row.id;
    (demo?Promise.resolve({events:row.events}):api(`history?id=${encodeURIComponent(id)}`)).then(({events})=>{if(selected?.id!==id||!$('history'))return;$('history').innerHTML=events.map(event=>`<li>${esc(labels()[event.to_status]||event.to_status)} · ${esc(time(event.created_at))}${event.note?`<small>${esc(event.note)}</small>`:''}</li>`).join('')||`<li>${t("Fără evenimente.")}</li>`;}).catch(()=>{if(selected?.id===id&&$('history'))$('history').textContent=t("Istoricul nu este disponibil momentan.");});
  }
  async function update(status,note=''){
    if(busy||!selected)return;
    busy=true;const row=selected;let errorText='';showError('');$('detail').querySelectorAll('button,textarea').forEach(element=>element.disabled=true);
    try{if(demo){row.status=status;row.version++;row.events.push({to_status:status,note,created_at:new Date().toISOString()});}else selected=(await api('requests',{method:'PATCH',body:JSON.stringify({id:row.id,version:row.version,status,note})})).request;renderDetail();}
    catch(error){errorText=error.message==='VERSION_CONFLICT'?t("Un coleg a modificat această solicitare. Verifică noua stare."):t("Modificarea nu a fost salvată. Încearcă din nou.");}
    finally{busy=false;await load();if(errorText)showError(errorText);}
  }
  $('loginForm').addEventListener('submit',async event=>{event.preventDefault();$('signIn').disabled=true;$('loginMessage').textContent=t("Se verifică…");try{const result=await api('session',{method:'POST',body:JSON.stringify({email:$('email').value.trim(),password:$('password').value})});demo=false;$('password').value='';$('loginMessage').textContent='';enter(result.staff);}catch(error){$('password').value='';$('loginMessage').textContent=error.message==='TRY_LATER'?t("Prea multe încercări. Încearcă din nou peste 15 minute."):t("Conectarea a eșuat. Verifică datele și accesul aprobat.");}finally{$('signIn').disabled=false;}});
  $('demo').addEventListener('click',()=>{demo=true;demoRequests=makeDemo();enter({});});
  $('exitDemo').addEventListener('click',showLogin);
  $('logout').addEventListener('click',async()=>{try{await api('session',{method:'DELETE',body:'{}'});showLogin();}catch{showError(t("Ieșirea nu a putut fi confirmată. Încearcă din nou."));}});
  document.querySelectorAll('[data-kind]').forEach(button=>button.addEventListener('click',()=>{if(busy)return;revision++;kind=button.dataset.kind;offset=0;selected=null;$('search').value='';filterOptions();renderEmpty();load();}));
  $('refresh').addEventListener('click',load);
  $('statusFilter').addEventListener('change',()=>{revision++;offset=0;selected=null;renderEmpty();load();});
  $('search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{revision++;offset=0;selected=null;renderEmpty();load();},250);});
  $('previous').addEventListener('click',()=>{offset=Math.max(0,offset-50);load();});$('next').addEventListener('click',()=>{offset+=50;load();});
  $('requestList').addEventListener('click',event=>{if(busy)return;const button=event.target.closest('[data-request]');if(button){selected=requests.find(row=>row.id===button.dataset.request);renderList();renderDetail();if(window.matchMedia('(max-width:850px)').matches)$('detail').scrollIntoView({behavior:'smooth',block:'start'});}});
  $('detail').addEventListener('click',event=>{if(event.target.id==='closeDetail'){const id=selected?.id;selected=null;renderEmpty();renderList();document.querySelector(`[data-request="${id}"]`)?.focus();return;}if(event.target.closest('[data-next]'))update(event.target.closest('[data-next]').dataset.next);if(event.target.id==='cancelRequest'){$('cancelForm').hidden=false;$('cancelNote').focus();}if(event.target.id==='cancelBack')$('cancelForm').hidden=true;});
  $('detail').addEventListener('submit',event=>{if(event.target.id==='cancelForm'){event.preventDefault();const note=$('cancelNote').value.trim();if(note.length>=3)update('cancelled',note);}});
  setInterval(()=>{if(!document.hidden&&!demo&&!document.activeElement?.closest('#cancelForm'))load();},15000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!demo)load();});
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
    if(busy)return;
    const filter=$('statusFilter').value,note=$('cancelNote')?.value,cancelOpen=$('cancelForm')&&!$('cancelForm').hidden;
    window.staffI18n.set(button.dataset.lang);revision++;filterOptions();if(filter)$('statusFilter').value=filter;
    $('loginMessage').textContent='';showError('');
    if(!$('dashboard').hidden){$('staffName').textContent=demo?t('Încearcă panoul cu date fictive.'):`${t('Bun venit,')} ${currentUser.display_name}.`;renderList();renderDetail();if(cancelOpen&&$('cancelForm')){$('cancelForm').hidden=false;$('cancelNote').value=note;}load();}
  }));
  $('signIn').disabled=true;
  api('session').then(result=>{$('setup').hidden=result.ready;$('loginForm').hidden=!result.ready;$('signIn').disabled=!result.ready;$('email').disabled=!result.ready;$('password').disabled=!result.ready;if(result.staff&&!demo)enter(result.staff);}).catch(()=>{$('loginMessage').textContent=t("Conectare indisponibilă momentan. Reîncarcă pagina.");});
})();
