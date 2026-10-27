(() => {
  'use strict';
  const data = window.CROSTA_DATA;
  if (!data) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const readStored = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const persist = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let lang = readStored('crosta_language', readStored('preferredLang', 'ro'));
  if (!['ro', 'en', 'ru'].includes(lang)) lang = 'ro';
  let category = -2;
  let dietary = 'all';
  let search = '';
  let reviewCategory = 'all';
  let showAllReviews = false;
  let openDish = null;
  const copy = {
    ro: {empty:'Nu am găsit preparate.', emptyHint:'Încearcă alt ingredient sau schimbă filtrele.', clear:'Resetează filtrele', close:'Închide', dishes:'preparate', details:'Vezi detalii', allergens:'Alergeni', signature:'Semnătură', weight:'Porție', reviewCount:'recenzii', helpful:'Util', allDishes:'Toate preparatele', bakery:'Brutărie', navOpen:'Deschide navigarea', navClose:'Închide navigarea'},
    en: {empty:'No dishes found.', emptyHint:'Try another ingredient or change the filters.', clear:'Reset filters', close:'Close', dishes:'dishes', details:'View details', allergens:'Allergens', signature:'Signature', weight:'Serving', reviewCount:'reviews', helpful:'Helpful', allDishes:'All dishes', bakery:'Bakery', navOpen:'Open navigation', navClose:'Close navigation'},
    ru: {empty:'Блюда не найдены.', emptyHint:'Попробуйте другой ингредиент или измените фильтры.', clear:'Сбросить фильтры', close:'Закрыть', dishes:'блюд', details:'Подробнее', allergens:'Аллергены', signature:'Фирменное', weight:'Порция', reviewCount:'отзывов', helpful:'Полезно', allDishes:'Все блюда', bakery:'Выпечка', navOpen:'Открыть меню навигации', navClose:'Закрыть меню навигации'}
  };
  const t = key => data.translations[lang]?.[key] || data.translations.ro?.[key] || key;
  const c = key => copy[lang][key] || key;
  const localized = value => typeof value === 'object' && value !== null ? (value[lang] || value.ro || value.en || Object.values(value).find(text => typeof text === 'string' && text) || '') : value;
  const flatten = cat => cat.subcategories ? cat.subcategories.flatMap(sub => sub.items) : (cat.items || []);
  const dishes = data.menuData.flatMap(flatten);
  const dishById = new Map(dishes.map(dish => [dish.id, dish]));
  const menuIntroductions = {
    ro:['Ouă, syrniki și dimineți fără grabă.','Ceva proaspăt copt, alături de cafeaua ta.','De pus în mijlocul mesei. De savurat împreună.','Combinații proaspete, cu legume, brânzeturi și verdețuri.','Un bol cald, de la prima până la ultima lingură.','Preparate calde, cu garnitura potrivită.','Pentru finalul dulce al mesei.'],
    en:['Eggs, syrniki, and unhurried mornings.','Something freshly baked, with your favourite coffee.','For the middle of the table. For sharing.','Fresh combinations of vegetables, cheese, and greens.','A warm bowl, from the first spoonful to the last.','Hot dishes, with just the right side.','For a sweet finish to your meal.'],
    ru:['Яйца, сырники и неспешные утра.','Свежая выпечка к любимому кофе.','В центр стола. Чтобы разделить с близкими.','Свежие сочетания овощей, сыров и зелени.','Тёплый суп — от первой ложки до последней.','Горячие блюда с подходящим гарниром.','Для сладкого завершения обеда.']
  };
  const categoryPhotos = {0:'assets/crosta-terrace.webp',6:'assets/crosta-cake.webp'};
  const mealCopy = {
    ro:{morning:'Mic dejun',later:'Bucate calde & supe',recommended:'Recomandat acum',morningHeading:'O dimineață pe gustul tău.',laterHeading:'Poftă de prânz sau cină?',note:'Sugestii după ora din Chișinău. Poți alege oricând orice categorie.'},
    en:{morning:'Breakfast',later:'Main dishes & soups',recommended:'Suggested now',morningHeading:'A good start to your day.',laterHeading:'In the mood for lunch or dinner?',note:'Suggestions based on the time in Chișinău. Every category is always available to browse.'},
    ru:{morning:'Завтраки',later:'Горячие блюда и супы',recommended:'Рекомендуем сейчас',morningHeading:'Вкусное начало дня.',laterHeading:'Что-нибудь на обед или ужин?',note:'Рекомендации по времени в Кишинёве. Все разделы меню всегда доступны для просмотра.'}
  };
  function mealSuggestion(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Chisinau',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;
    const morning = Number(hour) < 12;
    return {morning,time:`${hour}:${minute}`,indices:morning ? [0] : [5,4]};
  }
  const tagName = tag => ({signature:c('signature'), vegetarian:t('tagVegetarian'), fish:t('tagFish'), spicy:t('tagSpicy'), bakery:c('bakery')})[tag] || tag;
  const tagHTML = tags => (tags || []).map(tag => `<span class="tag tag-${escape(tag)}">${tag === 'signature' ? '<span aria-hidden="true">✦</span> ' : ''}${escape(tagName(tag))}</span>`).join('');
  function categories() {
    const el = $('#category-tabs');
    if (!el) return;
    const suggestion = mealSuggestion();
    const suggestedCount = suggestion.indices.reduce((count,index) => count + flatten(data.menuData[index]).length,0);
    const suggestedLabel = mealCopy[lang][suggestion.morning ? 'morning' : 'later'];
    el.innerHTML = `<button class="category-tab category-suggestion ${category === -2 ? 'active' : ''}" type="button" data-category="-2" aria-pressed="${category === -2}"><span><small>${escape(mealCopy[lang].recommended)}</small>${escape(suggestedLabel)}</span><span class="tab-count">${suggestedCount}</span></button><button class="category-tab ${category === -1 ? 'active' : ''}" type="button" data-category="-1" aria-pressed="${category === -1}">${escape(t('allFilter'))}<span class="tab-count">${dishes.length}</span></button>` + data.menuData.map((cat, index) => {
      const subnav = category === index && cat.subcategories ? `<div class="category-subnav">${cat.subcategories.map((group, groupIndex) => group.items.some(matches) ? `<button type="button" data-menu-jump="menu-group-${index}-${groupIndex}">${escape(localized(group.name))}</button>` : '').join('')}</div>` : '';
      return `<button class="category-tab ${category === index ? 'active' : ''}" type="button" data-category="${index}" aria-pressed="${category === index}"><span>${escape(localized(cat.category))}</span><span class="tab-count">${flatten(cat).length}</span></button>${subnav}`;
    }).join('');
  }
  function filters() {
    const el = $('#diet-filters');
    if (!el) return;
    const entries = [['all',t('filterAllDietary')], ['signature',t('tagSignature')], ['vegetarian',t('tagVegetarian')], ['fish',t('tagFish')], ['spicy',t('tagSpicy')]];
    el.innerHTML = entries.map(([value, label]) => `<button type="button" class="filter-chip ${dietary === value ? 'active' : ''}" data-diet="${value}" aria-pressed="${dietary === value}">${escape(label)}</button>`).join('');
  }
  function matches(dish) {
    const text = normalize([dish.name, dish.description, dish.allergens].flatMap(value => typeof value === 'object' && value !== null ? Object.values(value) : [value || '']).join(' '));
    return (dietary === 'all' || (dish.tags || []).includes(dietary)) && (!search || search.split(/\s+/).every(term => text.includes(term)));
  }
  function menuItem(dish) {
    return `<button type="button" class="menu-item" data-dish="${escape(dish.id)}" aria-label="${escape(localized(dish.name))} — ${dish.price} MDL. ${escape(c('details'))}"><span class="item-heading"><h4>${escape(localized(dish.name))}</h4><span class="item-price">${dish.price}<span class="currency">MDL</span></span></span><p class="item-description">${escape(localized(dish.description))}</p><span class="item-meta"><span class="item-tags">${tagHTML(dish.tags)}</span><span class="item-weight">${escape(dish.weight)}</span><span class="item-detail-link">${escape(c('details'))}<span class="icon-arrow" aria-hidden="true"></span></span></span></button>`;
  }
  function renderMenu() {
    const target = $('#menu-results');
    if (!target) return;
    let count = 0;
    let html = '';
    const suggestion = mealSuggestion();
    if (category === -2) html = `<div class="menu-time-note"><div><span class="eyebrow">${escape(mealCopy[lang].recommended)} <span aria-hidden="true">·</span> ${suggestion.time} · Chișinău</span><h3>${escape(mealCopy[lang][suggestion.morning ? 'morningHeading' : 'laterHeading'])}</h3><p>${escape(mealCopy[lang].note)}</p></div></div>`;
    const menuCategories = category === -2 ? suggestion.indices.map(index => ({cat:data.menuData[index],index})) : data.menuData.map((cat,index) => ({cat,index}));
    menuCategories.forEach(({cat,index}) => {
      if (category !== -2 && category !== -1 && category !== index) return;
      const groups = cat.subcategories || [{name:cat.category, items:cat.items}];
      let categoryHTML = '';
      let categoryCount = 0;
      groups.forEach((group, groupIndex) => {
        const items = (group.items || []).filter(matches);
        if (!items.length) return;
        count += items.length;
        categoryCount += items.length;
        categoryHTML += `<section class="menu-group" id="menu-group-${index}-${groupIndex}"><div class="menu-group-head"><span class="group-number" aria-hidden="true">${String(groupIndex+1).padStart(2,'0')}</span><div><span class="group-category">${escape(localized(cat.category))}</span><h3 class="menu-group-title">${escape(localized(group.name))}</h3></div><span class="group-count">${items.length} ${escape(c('dishes'))}</span></div><div class="menu-items">${items.map(menuItem).join('')}</div></section>`;
      });
      if (categoryCount) {
        const photo = categoryPhotos[index];
        html += `<div class="menu-category menu-tone-${index}"><div class="menu-category-intro"><div class="menu-category-copy"><span class="eyebrow">${escape(window.CROSTA_COPY?.[lang]?.menuEyebrow || '')}</span><h3>${escape(localized(cat.category))}</h3><p>${escape(menuIntroductions[lang][index])}</p><span class="category-total">${categoryCount} ${escape(c('dishes'))} <span aria-hidden="true">·</span> ${escape(window.CROSTA_COPY?.[lang]?.priceNote || 'MDL')}</span></div>${photo ? `<img src="${photo}" alt="" loading="lazy" decoding="async" width="${index === 0 ? 360 : 480}" height="640">` : `<span class="category-numeral" aria-hidden="true">${String(index+1).padStart(2,'0')}</span>`}</div>${categoryHTML}</div>`;
      }
    });
    const emptyHTML = `<div class="menu-empty"><h3>${escape(c('empty'))}</h3><p>${escape(c('emptyHint'))}</p><button type="button" class="text-link" data-reset-menu>${escape(c('clear'))}<span class="icon-arrow" aria-hidden="true"></span></button></div>`;
    target.innerHTML = count ? html : html + emptyHTML;
    if ($('#menu-count')) $('#menu-count').textContent = `${count} ${c('dishes')}`;
  }
  function renderDish(id, show = true) {
    const dish = dishById.get(id);
    const dialog = $('#dish-dialog');
    const content = $('#dish-content');
    if (!dish || !dialog || !content) return;
    openDish = id;
    content.innerHTML = `<button type="button" class="dialog-close" data-close-dialog aria-label="${escape(c('close'))}">×</button><div class="dish-meta">${tagHTML(dish.tags)}</div><h2 id="dish-title">${escape(localized(dish.name))}</h2><div class="dish-price">${dish.price} <span>MDL</span><span class="dish-weight">${escape(dish.weight)}</span></div><p class="dish-description">${escape(localized(dish.description))}</p>${dish.allergens ? `<div class="dish-allergens"><h3>${escape(c('allergens'))}</h3><p>${escape(localized(dish.allergens))}</p></div>` : ''}<p class="dish-note">${escape(t('note7'))}</p><button type="button" class="button button-dark" data-booking data-reserve-dish>${escape(t('reserveThisDish'))} <span class="icon-arrow" aria-hidden="true"></span></button>`;
    dialog.setAttribute('aria-labelledby', 'dish-title');
    if (show && !dialog.open) { dialog.showModal(); document.body.classList.add('dialog-open'); }
  }
  function closeDish() { const dialog = $('#dish-dialog'); if (dialog?.open) dialog.close(); document.body.classList.toggle('dialog-open', Boolean($('dialog[open]'))); openDish = null; }
  const reviewCategories = ['food','interior','service','bakery','atmosphere'];
  const reviewCategoryName = key => t(({food:'catFood',interior:'catInterior',service:'catService',bakery:'catBakery',atmosphere:'catAtmosphere'})[key]);
  let liked = [];
  try { liked = JSON.parse(readStored('crosta_redesign_helpful', readStored('crosta_liked_reviews', '[]'))); if (!Array.isArray(liked)) liked = []; } catch {}
  function sanitizeUserReview(review, index = 0) {
    if (!review || typeof review !== 'object' || Array.isArray(review)) return null;
    const cleanText = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
    const cleanLocalized = (value, limit) => {
      if (typeof value === 'string') return cleanText(value, limit);
      if (!value || typeof value !== 'object' || Array.isArray(value)) return '';
      const result = Object.fromEntries(['ro','en','ru'].map(key => [key, cleanText(value[key], limit)]).filter(([, text]) => text));
      return Object.keys(result).length ? result : '';
    };
    const author = cleanText(review.author || review.name, 120);
    const comment = cleanLocalized(review.comment, 6000);
    const rating = Number(review.rating);
    if (!author || !comment || !Number.isInteger(rating) || rating < 1 || rating > 5) return null;
    const date = typeof review.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(review.date) && Number.isFinite(new Date(review.date + 'T12:00:00').getTime()) ? review.date : new Date().toISOString().slice(0,10);
    return {
      id:cleanText(review.id, 120) || `saved-review-${index}`, author, date,
      category:reviewCategories.includes(review.category) ? review.category : 'food', rating,
      aspectRatings:Object.fromEntries(reviewCategories.filter(key => Number.isInteger(Number(review.aspectRatings?.[key])) && Number(review.aspectRatings[key]) >= 1 && Number(review.aspectRatings[key]) <= 5).map(key => [key, Number(review.aspectRatings[key])])),
      highlight:cleanLocalized(review.highlight, 500), comment,
      likes:Number.isFinite(Number(review.likes)) ? Math.max(0, Math.min(1000000, Math.floor(Number(review.likes)))) : 0,
      isUserSubmitted:true
    };
  }
  function getUserReviews() {
    try {
      const reviews = JSON.parse(readStored('crosta_user_reviews', '[]'));
      return Array.isArray(reviews) ? reviews.slice(0,100).map(sanitizeUserReview).filter(Boolean) : [];
    } catch { return []; }
  }
  const sessionReviews = [];
  const allReviews = () => { const saved = getUserReviews(); return [...sessionReviews.filter(review => !saved.some(item => item.id === review.id)), ...saved, ...data.defaultReviews]; };
  function renderReviewFilters() {
    const el = $('#review-filters');
    if (!el) return;
    el.innerHTML = ['all', ...reviewCategories].map(key => `<button type="button" class="filter-chip ${reviewCategory === key ? 'active' : ''}" data-review-filter="${key}" aria-pressed="${reviewCategory === key}">${escape(key === 'all' ? t('filterAll') : reviewCategoryName(key))}<span>${key === 'all' ? allReviews().length : allReviews().filter(r => r.category === key).length}</span></button>`).join('');
  }
  function reviewHTML(review) {
    const date = new Intl.DateTimeFormat(({ro:'ro-RO',en:'en-GB',ru:'ru-RU'})[lang], {day:'numeric',month:'short',year:'numeric'}).format(new Date(review.date + 'T12:00:00'));
    const initials = review.author.split(/\s+/).slice(0,2).map(s => s[0]).join('');
    const isLiked = liked.includes(review.id);
    return `<article class="review-card"><div class="review-card-top"><span class="review-category">${escape(reviewCategoryName(review.category))}</span><span class="review-stars" aria-label="${review.rating} / 5">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span></div><blockquote>${escape(localized(review.comment))}</blockquote>${review.highlight ? `<p class="review-highlight"><span>${escape(t('recommendsLabel'))}</span> ${escape(localized(review.highlight))}</p>` : ''}<div class="review-aspects">${Object.entries(review.aspectRatings || {}).map(([key, value]) => `<span>${escape(reviewCategoryName(key))} ${value}★</span>`).join('')}</div><div class="review-author-row"><span class="review-avatar" aria-hidden="true">${escape(initials)}</span><span class="review-author"><strong>${escape(review.author)}</strong><time datetime="${escape(review.date)}">${escape(date)}</time></span><button type="button" class="review-helpful ${isLiked ? 'active' : ''}" data-helpful="${escape(review.id)}" aria-pressed="${isLiked}" aria-label="${escape(c('helpful'))}">♡ <span>${review.likes + Number(isLiked)}</span></button></div></article>`;
  }
  function renderReviewSummary() {
    const reviews = allReviews();
    const average = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '4.8';
    $$('#reviews-avg-score, #hero-rating-score, .review-score > strong, .hero-rating b').forEach(element => { element.textContent = average; });
    if ($('#reviews-total-count')) $('#reviews-total-count').textContent = reviews.length;
    const ratingLabel = {ro:`${average.replace('.', ',')} din 5 stele`, en:`${average} out of 5 stars`, ru:`${average.replace('.', ',')} из 5 звёзд`}[lang];
    $('.review-score .rating-stars')?.setAttribute('aria-label', ratingLabel);
    const summary = $('#review-summary');
    if (!summary) return;
    summary.innerHTML = reviewCategories.map(key => {
      const values = allReviews().flatMap(review => [review.category === key ? review.rating : null, review.aspectRatings?.[key]]).filter(value => typeof value === 'number');
      const baseline = {food:4.8, interior:4.8, service:4.7, bakery:4.9, atmosphere:4.8};
      const average = values.length ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1) : baseline[key].toFixed(1);
      return `<div class="rating-metric"><span>${escape(reviewCategoryName(key))}</span><strong>${average}</strong></div>`;
    }).join('');
  }
  function renderReviews() {
    const target = $('#reviews-grid');
    if (!target) return;
    const reviews = allReviews().filter(review => reviewCategory === 'all' || review.category === reviewCategory);
    target.innerHTML = (showAllReviews ? reviews : reviews.slice(0,3)).map(reviewHTML).join('');
    const more = $('#reviews-more');
    if (more) { more.hidden = reviews.length <= 3; more.textContent = showAllReviews ? t('showLessReviews') : `${t('loadMoreReviews')} (${reviews.length - 3})`; more.setAttribute('aria-expanded', String(showAllReviews)); }
  }
  function restoreButtonFocus(attribute, value) {
    $$(`[${attribute}]`).find(element => element.getAttribute(attribute) === String(value))?.focus({preventScroll:true});
  }
  function scrollMenuStart() {
    const results = $('#menu-results');
    if (results?.scrollIntoView) results.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'start'});
  }
  function updateNavigationLabel() {
    const toggle = $('#mobile-toggle');
    if (toggle) toggle.setAttribute('aria-label', c(toggle.getAttribute('aria-expanded') === 'true' ? 'navClose' : 'navOpen'));
  }
  function localizeAccessibility() {
    const labels = {
      ro: {nav:'Navigare principală', language:'Limbă', discover:'Descoperă Crosta', categories:'Categorii de meniu', dietary:'Filtre alimentare', craft:'Crosta pe Instagram', reviews:'Categorii de recenzii', rating:'4,8 din 5 stele', dish:'Detalii despre preparat'},
      en: {nav:'Main navigation', language:'Language', discover:'Discover Crosta', categories:'Menu categories', dietary:'Dietary filters', craft:'Crosta on Instagram', reviews:'Review categories', rating:'4.8 out of 5 stars', dish:'Dish details'},
      ru: {nav:'Основная навигация', language:'Язык', discover:'Откройте для себя Crosta', categories:'Категории меню', dietary:'Фильтры питания', craft:'Crosta в Instagram', reviews:'Категории отзывов', rating:'4,8 из 5 звёзд', dish:'Информация о блюде'}
    }[lang];
    const ariaSelectors = {'#site-nav':'nav', '.language-switch':'language', '.scroll-link':'discover', '#category-tabs':'categories', '#diet-filters':'dietary', '.social-section':'craft', '#review-filters':'reviews', '.review-score .rating-stars':'rating', '#dish-dialog':'dish'};
    Object.entries(ariaSelectors).forEach(([selector, key]) => $(selector)?.setAttribute('aria-label', labels[key]));
    const imageAlts = {
      ro: {'crosta-berry.webp':'Preparat Crosta cu fructe de pădure, migdale și mentă', 'crosta-cake.webp':'Felie de tort cu cremă la Crosta', 'interior.webp':'Interiorul Crosta Kitchen & Bakery, Chișinău', 'crosta-terrace.webp':'Mic dejun și cafea pe terasa Crosta'},
      en: {'crosta-berry.webp':'A Crosta dish with berries, almonds and mint', 'crosta-cake.webp':'A slice of layered cream cake at Crosta', 'interior.webp':'Inside Crosta Kitchen & Bakery in Chișinău', 'crosta-terrace.webp':'Breakfast and coffee on Crosta’s terrace'},
      ru: {'crosta-berry.webp':'Блюдо Crosta с ягодами, миндалём и мятой', 'crosta-cake.webp':'Кусочек слоёного торта с кремом в Crosta', 'interior.webp':'Интерьер Crosta Kitchen & Bakery в Кишинёве', 'crosta-terrace.webp':'Завтрак и кофе на террасе Crosta'}
    }[lang];
    $$('img').forEach(image => { const filename = image.getAttribute('src')?.split('/').pop(); if (imageAlts[filename]) image.alt = imageAlts[filename]; });
    $('.daily-strip')?.setAttribute('aria-label', {ro:'Alege din meniu', en:'Explore the menu', ru:'Выберите из меню'}[lang]);
    $('.map-link iframe')?.setAttribute('title', {ro:'Locația Crosta Kitchen & Bakery', en:'Crosta Kitchen & Bakery location', ru:'Расположение Crosta Kitchen & Bakery'}[lang]);
    updateNavigationLabel();
  }
  function setLanguage(next) {
    if (!['ro','en','ru'].includes(next)) return;
    lang = next;
    persist('crosta_language', lang);
    persist('preferredLang', lang);
    document.documentElement.lang = lang;
    const description = window.CROSTA_COPY?.[lang]?.metaDescription;
    if (description) $('meta[name="description"]')?.setAttribute('content', description);
    $$('[data-i18n]').forEach(el => { const value = data.translations[lang]?.[el.dataset.i18n]; if (value !== undefined) el.textContent = value; });
    $$('[data-copy]').forEach(el => { const value = window.CROSTA_COPY?.[lang]?.[el.dataset.copy]; if (value !== undefined) { if (el.hasAttribute('data-copy-html')) el.innerHTML = value; else el.textContent = value; } });
    $$('[data-lang]').forEach(el => { el.classList.toggle('active', el.dataset.lang === lang); el.setAttribute('aria-pressed', String(el.dataset.lang === lang)); });
    const input = $('#menu-search');
    if (input) { input.placeholder = t('searchPlaceholder'); input.setAttribute('aria-label', t('searchPlaceholder')); }
    categories(); filters(); renderMenu(); renderReviewFilters(); renderReviews(); localizeAccessibility(); renderReviewSummary();
    if (openDish) renderDish(openDish, false);
    document.dispatchEvent(new CustomEvent('crosta:language', {detail:{lang}}));
  }
  $('#menu-search')?.addEventListener('input', event => { search = normalize(event.target.value.trim()); if (search && category !== -1) { category = -1; categories(); } renderMenu(); });
  document.addEventListener('click', event => {
    const language = event.target.closest('[data-lang]');
    if (language) { setLanguage(language.dataset.lang); return; }
    if (event.target.closest('a[href="#menu"]:not([data-menu-category])') && category === -2) { categories(); renderMenu(); }
    const shortcut = event.target.closest('[data-menu-category]');
    if (shortcut) {
      const next = Number(shortcut.dataset.menuCategory);
      if (Number.isInteger(next) && next >= 0 && next < data.menuData.length) {
        category = next; dietary = 'all'; search = '';
        if ($('#menu-search')) $('#menu-search').value = '';
        categories(); filters(); renderMenu();
      }
      return;
    }
    const jump = event.target.closest('[data-menu-jump]');
    if (jump) { $(`#${jump.dataset.menuJump}`)?.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'start'}); return; }
    const cat = event.target.closest('[data-category]');
    if (cat) { category = Number(cat.dataset.category); if (category === -2) { dietary = 'all'; search = ''; if ($('#menu-search')) $('#menu-search').value = ''; filters(); } categories(); renderMenu(); restoreButtonFocus('data-category', category); scrollMenuStart(); return; }
    const diet = event.target.closest('[data-diet]');
    if (diet) { dietary = diet.dataset.diet; filters(); categories(); renderMenu(); restoreButtonFocus('data-diet', dietary); return; }
    const reset = event.target.closest('[data-reset-menu]');
    if (reset) { dietary = 'all'; category = -1; search = ''; if ($('#menu-search')) $('#menu-search').value = ''; categories(); filters(); renderMenu(); return; }
    const dish = event.target.closest('[data-dish]');
    if (dish) { renderDish(dish.dataset.dish); return; }
    if (event.target.closest('[data-close-dialog], [data-reserve-dish]')) { closeDish(); return; }
    const reviewFilter = event.target.closest('[data-review-filter]');
    if (reviewFilter) { reviewCategory = reviewFilter.dataset.reviewFilter; showAllReviews = false; renderReviewFilters(); renderReviews(); restoreButtonFocus('data-review-filter', reviewCategory); return; }
    const helpful = event.target.closest('[data-helpful]');
    if (helpful) { const id = helpful.dataset.helpful; liked = liked.includes(id) ? liked.filter(value => value !== id) : [...liked,id]; persist('crosta_redesign_helpful', JSON.stringify(liked)); persist('crosta_liked_reviews', JSON.stringify(liked)); renderReviews(); restoreButtonFocus('data-helpful', id); return; }
    if (event.target.closest('#reviews-more')) { showAllReviews = !showAllReviews; renderReviews(); return; }
    if (event.target.closest('#site-nav a')) closeNavigation();
  });
  function closeNavigation() { $('#site-nav')?.classList.remove('open'); $('#mobile-toggle')?.setAttribute('aria-expanded','false'); document.body.classList.remove('nav-open'); updateNavigationLabel(); }
  $('#mobile-toggle')?.addEventListener('click', () => { const isOpen = $('#mobile-toggle').getAttribute('aria-expanded') === 'true'; $('#mobile-toggle').setAttribute('aria-expanded', String(!isOpen)); $('#site-nav')?.classList.toggle('open', !isOpen); document.body.classList.toggle('nav-open', !isOpen); updateNavigationLabel(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });
  $('#dish-dialog')?.addEventListener('click', event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDish(); } });
  $('#dish-dialog')?.addEventListener('close', () => { document.body.classList.toggle('dialog-open', Boolean($('dialog[open]'))); openDish = null; });
  document.addEventListener('crosta:review-saved', event => { const review = sanitizeUserReview(event.detail?.review); if (review && !getUserReviews().some(item => item.id === review.id) && !sessionReviews.some(item => item.id === review.id)) sessionReviews.unshift(review); reviewCategory = 'all'; showAllReviews = false; renderReviewFilters(); renderReviews(); renderReviewSummary(); });
  if ($('#year')) $('#year').textContent = new Date().getFullYear();
  setLanguage(lang);
  window.CrostaUI = {setLanguage, openDish:renderDish, closeDish, closeNavigation, getUserReviews, sanitizeUserReview, get language(){return lang;}};
})();
