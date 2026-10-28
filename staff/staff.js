(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const labels={new:'Nouă',confirmed:'Confirmată',seated:'La masă',completed:'Încheiată',cancelled:'Anulată',reviewed:'Citită',archived:'Arhivată'};
  const actions={confirmed:'Confirmă rezervarea',seated:'Marchează sosirea',completed:'Încheie vizita',reviewed:'Marchează citită',archived:'Arhivează recenzia'};
  const categories={food:'Mâncare',interior:'Interior',service:'Serviciu',bakery:'Patiserie & cafea',atmosphere:'Atmosferă'};
  const terminal=['completed','cancelled','archived'];
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const time=value=>new Intl.DateTimeFormat('ro-MD',{timeZone:'Europe/Chisinau',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
  const day=value=>new Intl.DateTimeFormat('ro-MD',{day:'numeric',month:'long',year:'numeric'}).format(new Date(value+'T12:00:00'));
  const badge=status=>`<span class="badge ${esc(status)}">${esc(labels[status]||status)}</span>`;
  let demo=false,kind='booking',requests=[],demoRequests=[],selected=null,offset=0,total=0,busy=false,loading=false,pendingLoad=false,revision=0,searchTimer;
  function showError(message){$('error').hidden=!message;$('error').textContent=message;}
  function showLogin(){revision++;demo=false;requests=[];demoRequests=[];selected=null;$('dashboard').hidden=true;$('login').hidden=false;$('logout').hidden=true;$('requestList').replaceChildren();$('detail').replaceChildren();$('password').value='';showError('');}
  async function api(path,options={}){
    const response=await fetch(`/api/staff/${path}`,{credentials:'same-origin',cache:'no-store',...options,headers:{'Content-Type':'application/json',...options.headers}});
    const data=await response.json().catch(()=>({code:'SERVICE_UNAVAILABLE'}));
    if(!response.ok){if(response.status===401||response.status===403){showLogin();$('loginMessage').textContent='Intră din nou pentru a continua.';}const error=new Error(data.code||'SERVICE_UNAVAILABLE');throw error;}
    return data;
  }
  function filterOptions(){
    const values=kind==='booking'?['active','all','new','confirmed','seated','completed','cancelled']:['active','all','new','reviewed','archived'];
    $('statusFilter').innerHTML=values.map(value=>`<option value="${value}">${value==='active'?'Solicitări active':value==='all'?'Toate':labels[value]}</option>`).join('');
    document.querySelectorAll('[data-kind]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.kind===kind)));
    $('doneLabel').textContent=kind==='booking'?'Încheiate astăzi':'Procesate astăzi';
  }
  function enter(user){revision++;$('login').hidden=true;$('dashboard').hidden=false;$('logout').hidden=demo;$('demoBanner').hidden=!demo;$('staffName').textContent=demo?'O privire asupra zilei tale. Date demonstrative.':`Bun venit, ${user.display_name}.`;kind='booking';offset=0;selected=null;$('search').value='';filterOptions();renderEmpty();load();}
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
    loading=true;const current=revision;$('refresh').disabled=true;$('syncState').textContent=demo?'Demonstrație':'Se actualizează…';
    try{
      let result;
      if(demo){
        const status=$('statusFilter').value,search=$('search').value.trim().toLowerCase(),rows=demoRequests.filter(row=>row.kind===kind);
        const filtered=rows.filter(row=>(status==='all'||(status==='active'&&!terminal.includes(row.status))||row.status===status)&&`${row.payload.name} CR-${row.number}`.toLowerCase().includes(search));
        result={requests:filtered.slice(offset,offset+50),total:filtered.length,counts:{new:rows.filter(row=>row.status==='new').length,active:rows.filter(row=>!terminal.includes(row.status)).length,completed_today:rows.filter(row=>['completed','reviewed','archived'].includes(row.status)).length}};
      }else result=await api(`requests?kind=${kind}&status=${encodeURIComponent($('statusFilter').value)}&search=${encodeURIComponent($('search').value.trim())}&offset=${offset}`);
      if(current!==revision)return;
      requests=result.requests;total=result.total;$('newCount').textContent=result.counts.new;$('activeCount').textContent=result.counts.active;$('doneCount').textContent=result.counts.completed_today;renderList();
      const updated=requests.find(row=>row.id===selected?.id);
      if(updated&&!document.activeElement?.closest('#cancelForm')){selected=updated;renderDetail();}else if(selected&&!updated){selected=null;renderEmpty();}
      $('syncState').textContent=demo?'Date fictive':`Actualizat ${new Intl.DateTimeFormat('ro-MD',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Chisinau'}).format(new Date())}`;showError('');
    }catch{if(current===revision&&!$('dashboard').hidden){showError('Nu putem actualiza solicitările. Datele afișate pot fi vechi.');$('syncState').textContent='Conexiune întreruptă';}}
    finally{loading=false;$('refresh').disabled=false;if(pendingLoad){pendingLoad=false;load();}}
  }
  function renderList(){
    $('requestList').innerHTML=requests.length?requests.map(row=>`<button type="button" class="request-row ${selected?.id===row.id?'selected':''}" data-request="${esc(row.id)}" aria-pressed="${selected?.id===row.id}"><span class="row-top"><strong>CR-${row.number}</strong>${badge(row.status)}</span><span class="customer">${esc(row.payload.name)}</span><span class="row-bottom">${row.kind==='booking'?`<span>${esc(day(row.payload.date))} · ${esc(row.payload.time)}</span><strong>${row.payload.guests} persoane</strong>`:`<span>${esc(categories[row.payload.category])}</span><strong>${row.payload.rating} / 5</strong>`}</span><span class="received">Primită ${esc(time(row.created_at))}</span></button>`).join(''):'<div class="empty"><h2>Totul este la zi.</h2><p>Nicio solicitare pentru această selecție.</p></div>';
    $('pageInfo').textContent=total?`${offset+1}–${Math.min(offset+50,total)} din ${total}`:'0 solicitări';$('previous').disabled=offset===0;$('next').disabled=offset+50>=total;
  }
  function renderEmpty(){$('detail').innerHTML='<div class="empty"><span class="empty-mark" aria-hidden="true">c.</span><h2>Fiecare oaspete contează.</h2><p>Alege o solicitare pentru a vedea detaliile.</p></div>';}
  function renderDetail(){
    if(!selected){renderEmpty();return;}
    const row=selected,p=row.payload;
    const next=row.kind==='booking'?({new:'confirmed',confirmed:'seated',seated:'completed'}[row.status]):({new:'reviewed',reviewed:'archived'}[row.status]);
    const validPhone=/^\+?\d{8,15}$/.test(p.phone||'');
    const info=row.kind==='booking'?`<div class="booking-facts"><div><span>Data</span><strong>${esc(day(p.date))}</strong></div><div><span>Ora</span><strong>${esc(p.time)}</strong></div><div><span>Oaspeți</span><strong>${p.guests} persoane</strong></div></div><h3>Contact</h3><p>${validPhone?`<a href="tel:${esc(p.phone)}">${esc(p.phone)}</a>`:'Număr de telefon nespecificat.'}</p>${p.notes?`<h3>Observații</h3><p>${esc(p.notes)}</p>`:''}`:`<div class="review-rating">${p.rating}<span> / 5</span></div><p class="review-quote">${esc(p.comment)}</p>${p.highlight?`<h3>Recomandă</h3><p>${esc(p.highlight)}</p>`:''}${p.email?`<h3>Email</h3><p>${esc(p.email)}</p>`:''}<div class="aspect-list">${Object.entries(p.aspectRatings||{}).map(([key,value])=>`<span>${esc(categories[key])} <strong>${value}/5</strong></span>`).join('')}</div><p class="fee-note">Marcarea drept citită sau arhivată nu modifică recenziile afișate pe site.</p>`;
    $('detail').innerHTML=`<div class="detail-title"><h2>CR-${row.number}</h2>${badge(row.status)}</div><p class="meta">${row.kind==='booking'?'Rezervare':'Recenzie'} · ${esc(time(row.created_at))}</p><hr><h3>Oaspete</h3><p class="guest-name">${esc(p.name)}</p>${info}<p class="fee-note">${demo?'Demonstrație — nicio notificare nu este trimisă.':({sent:'Notificare email trimisă.',failed:'Emailul nu a fost trimis. Solicitarea este salvată în panou.',pending:'Notificare email în așteptare.',not_configured:'Emailul nu este configurat. Solicitarea este salvată în panou.'}[row.notification_status]||'')}</p>${next?`<div class="actions"><button type="button" class="primary" data-next="${next}">${actions[next]}</button>${row.kind==='booking'?'<button type="button" id="cancelRequest" class="cancel">Anulează rezervarea</button>':''}</div>`:''}${row.kind==='booking'&&!terminal.includes(row.status)?'<form id="cancelForm" hidden><label for="cancelNote">Motivul anulării</label><textarea id="cancelNote" minlength="3" maxlength="240" required></textarea><div class="actions"><button type="submit" class="cancel">Confirmă anularea</button><button id="cancelBack" type="button" class="quiet">Înapoi</button></div></form>':''}<hr><h3>Istoric</h3><ol id="history" class="history"><li>Se încarcă…</li></ol>`;
    const id=row.id;
    (demo?Promise.resolve({events:row.events}):api(`history?id=${encodeURIComponent(id)}`)).then(({events})=>{if(selected?.id!==id||!$('history'))return;$('history').innerHTML=events.map(event=>`<li>${esc(labels[event.to_status]||event.to_status)} · ${esc(time(event.created_at))}${event.note?`<small>${esc(event.note)}</small>`:''}</li>`).join('')||'<li>Fără evenimente.</li>';}).catch(()=>{if(selected?.id===id&&$('history'))$('history').textContent='Istoricul nu este disponibil momentan.';});
  }
  async function update(status,note=''){
    if(busy||!selected)return;
    busy=true;const row=selected;let errorText='';showError('');$('detail').querySelectorAll('button,textarea').forEach(element=>element.disabled=true);
    try{if(demo){row.status=status;row.version++;row.events.push({to_status:status,note,created_at:new Date().toISOString()});}else selected=(await api('requests',{method:'PATCH',body:JSON.stringify({id:row.id,version:row.version,status,note})})).request;renderDetail();}
    catch(error){errorText=error.message==='VERSION_CONFLICT'?'Un coleg a modificat această solicitare. Verifică noua stare.':'Modificarea nu a fost salvată. Încearcă din nou.';}
    finally{busy=false;await load();if(errorText)showError(errorText);}
  }
  $('loginForm').addEventListener('submit',async event=>{event.preventDefault();$('signIn').disabled=true;$('loginMessage').textContent='Se verifică…';try{const result=await api('session',{method:'POST',body:JSON.stringify({email:$('email').value.trim(),password:$('password').value})});demo=false;$('password').value='';$('loginMessage').textContent='';enter(result.staff);}catch(error){$('password').value='';$('loginMessage').textContent=error.message==='TRY_LATER'?'Prea multe încercări. Încearcă din nou peste 15 minute.':'Conectarea a eșuat. Verifică datele și accesul aprobat.';}finally{$('signIn').disabled=false;}});
  $('demo').addEventListener('click',()=>{demo=true;demoRequests=makeDemo();enter({});});
  $('exitDemo').addEventListener('click',showLogin);
  $('logout').addEventListener('click',async()=>{try{await api('session',{method:'DELETE',body:'{}'});showLogin();}catch{showError('Ieșirea nu a putut fi confirmată. Încearcă din nou.');}});
  document.querySelectorAll('[data-kind]').forEach(button=>button.addEventListener('click',()=>{if(busy)return;revision++;kind=button.dataset.kind;offset=0;selected=null;$('search').value='';filterOptions();renderEmpty();load();}));
  $('refresh').addEventListener('click',load);
  $('statusFilter').addEventListener('change',()=>{revision++;offset=0;selected=null;renderEmpty();load();});
  $('search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{revision++;offset=0;selected=null;renderEmpty();load();},250);});
  $('previous').addEventListener('click',()=>{offset=Math.max(0,offset-50);load();});$('next').addEventListener('click',()=>{offset+=50;load();});
  $('requestList').addEventListener('click',event=>{if(busy)return;const button=event.target.closest('[data-request]');if(button){selected=requests.find(row=>row.id===button.dataset.request);renderList();renderDetail();if(window.matchMedia('(max-width:850px)').matches)$('detail').scrollIntoView({behavior:'smooth',block:'start'});}});
  $('detail').addEventListener('click',event=>{if(event.target.closest('[data-next]'))update(event.target.closest('[data-next]').dataset.next);if(event.target.id==='cancelRequest'){$('cancelForm').hidden=false;$('cancelNote').focus();}if(event.target.id==='cancelBack')$('cancelForm').hidden=true;});
  $('detail').addEventListener('submit',event=>{if(event.target.id==='cancelForm'){event.preventDefault();const note=$('cancelNote').value.trim();if(note.length>=3)update('cancelled',note);}});
  setInterval(()=>{if(!document.hidden&&!demo&&!document.activeElement?.closest('#cancelForm'))load();},15000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!demo)load();});
  $('signIn').disabled=true;
  api('session').then(result=>{$('setup').hidden=result.ready;$('signIn').disabled=!result.ready;$('email').disabled=!result.ready;$('password').disabled=!result.ready;if(result.staff&&!demo)enter(result.staff);}).catch(()=>{$('loginMessage').textContent='Conectare indisponibilă momentan. Reîncarcă pagina.';});
})();
