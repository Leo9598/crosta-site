window.CROSTA_COPY = {
  ro: {
    skip:'Sari la meniu',heroEyebrow:'ARTIZANAL, ÎN FIECARE ZI. CHIȘINĂU.',heroLine1:'Pâine bună.',heroLine2:'Zile frumoase.',guestLove:'de la oaspeții noștri',photoLabel:'BUCURIA LUCRURILOR SIMPLE',sealTop:'MAIA NATURALĂ',sealBottom:'RĂBDAREA ARE GUST',menuEyebrow:'DIN BUCĂTĂRIA NOASTRĂ',menuHeading:'Poftă de ceva <em>bun?</em>',menuBrowse:'DESCOPERĂ MENIUL',menuNote:'De la prima cafea până la ultima îmbucătură.',priceNote:'Prețuri în MDL',craftEyebrow:'FĂINĂ. APĂ. MAIA. TIMP.',craftLine:'Lucrurile bune<br>nu se grăbesc.',aPlace:'UN LOC ÎN CARE REVII.',aboutHeading:'Cu timp.<br>Cu grijă.<br><em>Cu drag.</em>',reservationEyebrow:'NE VEDEM LA CROSTA',reservationHeading:'Un loc la<br><em>masa noastră.</em>',bookingNote:'Pentru cerințe speciale, sunați-ne. Vă ajutăm cu drag.',tableCaption:'CAFÉ • BUCĂTĂRIE • BRUTĂRIE',reviewsHeading:'Vorbe <em>bune.</em>',contactEyebrow:'UȘA E DESCHISĂ',contactHeading:'Hai pe la <em>noi.</em>',directions:'Deschide harta',visitHours:'TE AȘTEPTĂM',backTop:'Înapoi sus'
  },
  en: {
    skip:'Skip to menu',heroEyebrow:'MADE WITH CARE. EVERY DAY. CHIȘINĂU.',heroLine1:'Good bread.',heroLine2:'Beautiful days.',guestLove:'from our guests',photoLabel:'THE JOY OF SIMPLE THINGS',sealTop:'NATURAL SOURDOUGH',sealBottom:'GOOD THINGS TAKE TIME',menuEyebrow:'FROM OUR KITCHEN',menuHeading:'In the mood for <em>good food?</em>',menuBrowse:'EXPLORE THE MENU',menuNote:'From the first coffee to the very last bite.',priceNote:'Prices in MDL',craftEyebrow:'FLOUR. WATER. SOURDOUGH. TIME.',craftLine:'Good things<br>take their time.',aPlace:'A PLACE TO COME BACK TO.',aboutHeading:'With time.<br>With care.<br><em>With love.</em>',reservationEyebrow:'SEE YOU AT CROSTA',reservationHeading:'A place at<br><em>our table.</em>',bookingNote:'For special requests, give us a call. We’re happy to help.',tableCaption:'CAFÉ • KITCHEN • BAKERY',reviewsHeading:'Kind <em>words.</em>',contactEyebrow:'OUR DOOR IS OPEN',contactHeading:'Come on <em>over.</em>',directions:'Get directions',visitHours:'COME VISIT',backTop:'Back to top'
  },
  ru: {
    skip:'Перейти к меню',heroEyebrow:'С ЗАБОТОЙ. КАЖДЫЙ ДЕНЬ. КИШИНЁВ.',heroLine1:'Вкусный хлеб.',heroLine2:'Прекрасный день.',guestLove:'от наших гостей',photoLabel:'РАДОСТЬ ПРОСТЫХ ВЕЩЕЙ',sealTop:'ЖИВАЯ ЗАКВАСКА',sealBottom:'У ТЕРПЕНИЯ ЕСТЬ ВКУС',menuEyebrow:'ИЗ НАШЕЙ КУХНИ',menuHeading:'Хочется чего-то <em>вкусного?</em>',menuBrowse:'ОТКРОЙТЕ НАШЕ МЕНЮ',menuNote:'От первого кофе до последнего кусочка.',priceNote:'Цены в MDL',craftEyebrow:'МУКА. ВОДА. ЗАКВАСКА. ВРЕМЯ.',craftLine:'Хорошее<br>не терпит спешки.',aPlace:'МЕСТО, КУДА ХОЧЕТСЯ ВЕРНУТЬСЯ.',aboutHeading:'Со временем.<br>С заботой.<br><em>С любовью.</em>',reservationEyebrow:'ДО ВСТРЕЧИ В CROSTA',reservationHeading:'Место за<br><em>нашим столом.</em>',bookingNote:'Для особых пожеланий позвоните нам. Мы с радостью поможем.',tableCaption:'КОФЕ • КУХНЯ • ПЕКАРНЯ',reviewsHeading:'Добрые <em>слова.</em>',contactEyebrow:'НАША ДВЕРЬ ОТКРЫТА',contactHeading:'Заходите <em>в гости.</em>',directions:'Открыть карту',visitHours:'ЖДЁМ ВАС',backTop:'Наверх'
  }
};
(() => {
  document.querySelectorAll('[data-copy]').forEach(el => {
    const value = window.CROSTA_COPY.ro[el.dataset.copy];
    if (value && /<(em|br)[ >]/.test(value)) el.setAttribute('data-copy-html','');
  });
})();
