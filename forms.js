(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const categories = ['food','interior','service','bakery','atmosphere'];
  const formCopy = {
    ro: {
      bookingTitle:'Un loc la masa noastră', bookingIntro:'Trimite o cerere de rezervare. Pentru cerințe speciale, sună-ne.', bookingSubmit:'Trimite cererea', bookingSending:'Se trimite…', bookingSuccess:'Cererea de rezervare a fost trimisă. Pentru confirmare sau modificări, sună la 060 328 232.', bookingError:'Cererea nu a putut fi trimisă. Încearcă din nou sau sună la 060 328 232.', reviewTitle:'Împărtășește experiența ta', reviewIntro:'Părerea ta ne ajută să devenim mai buni.', reviewSubmit:'Trimite recenzia', reviewSending:'Se trimite…', reviewSuccess:'Mulțumim! Recenzia ta a fost trimisă.', reviewError:'Recenzia nu a putut fi trimisă. Încearcă din nou sau sună la 060 328 232.', close:'Închide', name:'Nume și prenume', date:'Data', time:'Ora', guests:'Număr de persoane', email:'Email (opțional)', category:'Categorie', rating:'Notă generală', comment:'Impresiile tale', highlight:'Ce recomanzi? (opțional)', aspects:'Evaluare pe categorii (opțional)', optional:'Opțional', notRated:'Neevaluat', phoneAlternative:'Sau sună la 060 328 232', requestNote:'Rezervarea este o cerere; pentru confirmare, sună-ne.', selectTime:'Alege ora', selectCategory:'Alege categoria', invalidBooking:'Verifică numele, data, ora (08:00–22:00) și numărul de persoane (1–20).', invalidReview:'Completează numele, recenzia și o notă între 1 și 5.'
    },
    en: {
      bookingTitle:'A place at our table', bookingIntro:'Send a reservation request. Call us for special requests.', bookingSubmit:'Send request', bookingSending:'Sending…', bookingSuccess:'Your reservation request has been sent. Call 060 328 232 for confirmation or changes.', bookingError:'Your request could not be sent. Try again or call 060 328 232.', reviewTitle:'Share your experience', reviewIntro:'Your feedback helps us get better.', reviewSubmit:'Send review', reviewSending:'Sending…', reviewSuccess:'Thank you! Your review has been sent.', reviewError:'Your review could not be sent. Try again or call 060 328 232.', close:'Close', name:'Full name', date:'Date', time:'Time', guests:'Number of guests', email:'Email (optional)', category:'Category', rating:'Overall rating', comment:'Your experience', highlight:'What do you recommend? (optional)', aspects:'Category ratings (optional)', optional:'Optional', notRated:'Not rated', phoneAlternative:'Or call 060 328 232', requestNote:'This is a reservation request; call us to confirm.', selectTime:'Choose a time', selectCategory:'Choose a category', invalidBooking:'Check your name, date, time (08:00–22:00), and number of guests (1–20).', invalidReview:'Enter your name, review, and a rating between 1 and 5.'
    },
    ru: {
      bookingTitle:'Место за нашим столом', bookingIntro:'Отправьте запрос на бронирование. По особым пожеланиям позвоните нам.', bookingSubmit:'Отправить запрос', bookingSending:'Отправка…', bookingSuccess:'Запрос на бронирование отправлен. Для подтверждения или изменений позвоните по номеру 060 328 232.', bookingError:'Не удалось отправить запрос. Попробуйте ещё раз или позвоните по номеру 060 328 232.', reviewTitle:'Поделитесь впечатлениями', reviewIntro:'Ваш отзыв помогает нам становиться лучше.', reviewSubmit:'Отправить отзыв', reviewSending:'Отправка…', reviewSuccess:'Спасибо! Ваш отзыв отправлен.', reviewError:'Не удалось отправить отзыв. Попробуйте ещё раз или позвоните по номеру 060 328 232.', close:'Закрыть', name:'Имя и фамилия', date:'Дата', time:'Время', guests:'Количество гостей', email:'Email (необязательно)', category:'Категория', rating:'Общая оценка', comment:'Ваши впечатления', highlight:'Что вы рекомендуете? (необязательно)', aspects:'Оценки по категориям (необязательно)', optional:'Необязательно', notRated:'Без оценки', phoneAlternative:'Или позвоните: 060 328 232', requestNote:'Это запрос на бронирование; позвоните для подтверждения.', selectTime:'Выберите время', selectCategory:'Выберите категорию', invalidBooking:'Проверьте имя, дату, время (08:00–22:00) и количество гостей (1–20).', invalidReview:'Укажите имя, текст отзыва и оценку от 1 до 5.'
    }
  };
  window.CROSTA_FORM_COPY = formCopy;
  Object.assign(formCopy.ro,{phone:'Telefon de contact (opțional)',invalidPhone:'Verifică numărul de telefon.'});
  Object.assign(formCopy.en,{phone:'Contact phone (optional)',invalidPhone:'Check the phone number.'});
  Object.assign(formCopy.ru,{phone:'Контактный телефон (необязательно)',invalidPhone:'Проверьте номер телефона.'});
  const language = () => window.CrostaUI?.language || (['ro','en','ru'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ro');
  const text = key => formCopy[language()][key] || key;
  const field = (form, name) => form.elements.namedItem(name);
  const localDate = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; };
  const openers = new WeakMap();
  const busy = new Set();
  const statuses = new Map();
  const submissionIDs = new Map();
  function syncScrollLock() { document.body.classList.toggle('dialog-open', Boolean($('dialog[open]'))); }
  function showStatus(kind, key, state, reference='') {
    reference=/^CR-\d+$/.test(reference)?reference:'';
    statuses.set(kind, {key,state,reference});
    const status = $(`#${kind}-status`);
    if (!status) return;
    status.textContent = text(key)+(reference ? ` · ${reference}` : '');
    status.dataset.state = state;
    status.classList.toggle('is-error', state === 'error');
    status.classList.toggle('is-success', state === 'success');
    status.setAttribute('role', state === 'error' ? 'alert' : 'status');
    status.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite');
  }
  function translateForms() {
    $$('[data-form-copy]').forEach(element => { const key = element.dataset.formCopy; if (formCopy[language()][key]) element.textContent = text(key); });
    $$('[data-form-placeholder]').forEach(element => { element.placeholder = text(element.dataset.formPlaceholder); });
    $$('[data-close-form]').forEach(element => { element.setAttribute('aria-label', text('close')); });
    ['booking','review'].forEach(kind => {
      const submit = $(`#${kind}-form [type="submit"]`);
      if (submit) { const label = submit.querySelector('[data-form-copy], [data-i18n]'); (label || submit).textContent = text(`${kind}${busy.has(kind) ? 'Sending' : 'Submit'}`); }
      const status = statuses.get(kind);
      if (status) showStatus(kind, status.key, status.state, status.reference);
    });
  }
  function clearStatus(kind) { statuses.delete(kind); const status = $(`#${kind}-status`); if (status) { status.textContent=''; delete status.dataset.state; status.classList.remove('is-error','is-success'); } }
  function openForm(kind, opener) {
    const dialog = $(`#${kind}-dialog`);
    if (!dialog) return;
    window.CrostaUI?.closeNavigation();
    window.CrostaUI?.closeDish();
    ['booking','review'].filter(value => value !== kind).forEach(value => { const other = $(`#${value}-dialog`); if (other?.open) other.close(); });
    openers.set(dialog, opener || document.activeElement);
    if (!busy.has(kind)) clearStatus(kind);
    if (kind === 'booking') { const date = $('#booking-form [name="date"]'); if (date) date.min = localDate(); }
    translateForms();
    if (!dialog.open) dialog.showModal();
    syncScrollLock();
  }
  function closeForm(kind) { const dialog=$(`#${kind}-dialog`); if (dialog?.open) dialog.close(); syncScrollLock(); }
  document.addEventListener('click', event => {
    const booking = event.target.closest('[data-booking]');
    if (booking) { event.preventDefault(); openForm('booking', booking); return; }
    const review = event.target.closest('#review-write');
    if (review) { event.preventDefault(); openForm('review', review); return; }
    const close = event.target.closest('[data-close-form]');
    if (close) { event.preventDefault(); closeForm(close.dataset.closeForm); }
  });
  ['booking','review'].forEach(kind => {
    const dialog = $(`#${kind}-dialog`);
    if (!dialog) return;
    dialog.addEventListener('close', () => {
      syncScrollLock();
      const opener = openers.get(dialog);
      if (opener?.isConnected && !opener.closest('dialog:not([open])')) opener.focus({preventScroll:true});
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeForm(kind);
    });
  });
  async function send(kind, endpoint, payload, onSuccess) {
    if (busy.has(kind)) return;
    const fingerprint=JSON.stringify(payload);
    const previous=submissionIDs.get(kind);
    const requestId=previous?.fingerprint===fingerprint?previous.requestId:window.crypto?.randomUUID?.();
    if(requestId){submissionIDs.set(kind,{fingerprint,requestId});payload={...payload,requestId};}
    busy.add(kind);
    const form = $(`#${kind}-form`);
    const submit = form.querySelector('[type="submit"]');
    if (submit) submit.disabled = true;
    form.setAttribute('aria-busy','true');
    showStatus(kind, `${kind}Sending`, 'pending');
    translateForms();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload), signal:controller.signal});
      const result = await response.json();
      if (!response.ok || !result || typeof result !== 'object' || result.success === false || result.error) throw new Error('Submission failed');
      if (onSuccess) onSuccess();
      form.reset();
      submissionIDs.delete(kind);
      showStatus(kind, `${kind}Success`, 'success', result.reference);
    } catch {
      showStatus(kind, `${kind}Error`, 'error');
    } finally {
      clearTimeout(timeout);
      busy.delete(kind);
      if (submit) submit.disabled = false;
      form.removeAttribute('aria-busy');
      translateForms();
    }
  }
  const booking = $('#booking-form');
  if (booking) {
    const date = field(booking,'date'); if (date) date.min=localDate();
    const guests = field(booking,'guests'); if (guests) { guests.min='1'; guests.max='20'; guests.step='1'; }
    booking.addEventListener('submit', event => {
      event.preventDefault();
      if (busy.has('booking') || !booking.reportValidity()) return;
      const payload={name:String(field(booking,'name')?.value || '').trim().slice(0,120), date:String(field(booking,'date')?.value || ''), time:String(field(booking,'time')?.value || ''), guests:Number(field(booking,'guests')?.value)};
      const phone=String(field(booking,'phone')?.value||'').replace(/[\s()-]/g,'');
      if(phone&&!/^\+?\d{8,15}$/.test(phone)){showStatus('booking','invalidPhone','error');return;}
      if(phone)payload.phone=phone;
      const dateValid=/^\d{4}-\d{2}-\d{2}$/.test(payload.date) && Number.isFinite(new Date(payload.date+'T12:00:00').getTime()) && payload.date>=localDate();
      const timeValid=Array.from({length:15},(_,index)=>`${String(index+8).padStart(2,'0')}:00`).includes(payload.time);
      if (!payload.name || !dateValid || !timeValid || !Number.isInteger(payload.guests) || payload.guests<1 || payload.guests>20) { showStatus('booking','invalidBooking','error'); return; }
      send('booking','/api/send-email',payload);
    });
  }
  const review = $('#review-form');
  if (review) review.addEventListener('submit', event => {
    event.preventDefault();
    if (busy.has('review') || !review.reportValidity()) return;
    const payload={name:String(field(review,'name')?.value || '').trim().slice(0,120), email:String(field(review,'email')?.value || '').trim().slice(0,254), category:String(field(review,'category')?.value || 'food'), rating:Number(field(review,'rating')?.value), comment:String(field(review,'comment')?.value || '').trim().slice(0,6000), highlight:String(field(review,'highlight')?.value || '').trim().slice(0,500), aspectRatings:{}};
    categories.forEach(key => { const value=Number(field(review,`aspect-${key}`)?.value); if (Number.isInteger(value) && value>=1 && value<=5) payload.aspectRatings[key]=value; });
    if (!payload.name || !payload.comment || !categories.includes(payload.category) || !Number.isInteger(payload.rating) || payload.rating<1 || payload.rating>5) { showStatus('review','invalidReview','error'); return; }
    const submittedLanguage=language();
    send('review','/api/submit-review',payload, () => {
      const saved={id:`user-rev-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, author:payload.name, date:localDate(), category:payload.category, rating:payload.rating, aspectRatings:payload.aspectRatings, comment:{[submittedLanguage]:payload.comment}, highlight:payload.highlight ? {[submittedLanguage]:payload.highlight} : '', likes:0, isUserSubmitted:true};
      const sanitized=window.CrostaUI?.sanitizeUserReview(saved) || saved;
      const previous=window.CrostaUI?.getUserReviews() || [];
      try { localStorage.setItem('crosta_user_reviews',JSON.stringify([sanitized,...previous].slice(0,100))); } catch {}
      document.dispatchEvent(new CustomEvent('crosta:review-saved',{detail:{review:sanitized}}));
    });
  });
  document.addEventListener('crosta:language',translateForms);
  translateForms();
  window.CrostaForms={open:openForm,close:closeForm};
})();
