let currentMenuFilter = 'All';

const menuData = [
    {
        category: { en: "Breakfasts", ro: "Mic Dejun", ru: "Завтраки" },
        subcategories: [
            {
                name: { en: "Egg Dishes", ro: "Preparate din ouă", ru: "Блюда из яиц" },
                items: [
                    { name: { en: "Poached egg on bread with avocado, lightly salted salmon, young peas", ro: "Ou poșat pe pâine cu avocado, somon ușor sărat, mazăre verde", ru: "Пашот на хлебе с авокадо, малосольной семгой, молодым горошком" }, price: 110, image: 'poached-egg.jpg' },
                    { name: { en: "Shakshuka with poached egg and goat cheese", ro: "Shakshuka cu ou poșat și brânză de capră", ru: "Шакшука с пашот и козьим сыром" }, price: 75, image: 'shakshuka.jpg' },
                    { name: { en: "Souffle omelette with baguette", ro: "Omletă sufleu cu baghetă", ru: "Омлет суфле с багетом" }, price: 55, image: 'omelette.jpg' },
                    { name: { en: "Scramble on sweet potato", ro: "Scramble pe cartof dulce", ru: "Скрэмбл на батате" }, price: 55 },
                    { name: { en: "Scramble on bread with avocado, salmon and red caviar", ro: "Scramble pe pâine cu avocado, somon și icre roșii", ru: "Скрэмбл на хлебе, с авокадо, семгой и красной икрой" }, price: 120 },
                    { name: { en: "Fried eggs with bacon, tomato and feta", ro: "Ouă ochiuri cu bacon, roșii și telemea", ru: "Глазунья с беконом, помидором и брынзой" }, price: 55 }
                ]
            },
            {
                name: { en: "Back to the Future", ro: "Înapoi în viitor", ru: "Назад в будущее" },
                items: [
                    { name: { en: "School sandwich", ro: "Sandviș școlar", ru: "Школьный бутерброд" }, price: 60 },
                    { name: { en: "Rustic cottage cheese", ro: "Brânză de vaci de țară", ru: "Сельский творог" }, price: 55 },
                    { name: { en: "Donuts with condensed milk", ro: "Gogoși cu lapte condensat", ru: "Пончики со сгущенкой" }, price: 45 }
                ]
            },
            {
                name: { en: "Your Favorites", ro: "Preferatele tale", ru: "Ваши любимые" },
                items: [
                    { name: { en: "Syrniki with sour cream and berry sauce", ro: "Papanași cu smântână și sos de fructe de pădure", ru: "Сырники со сметаной и ягодным соусом" }, price: 50 },
                    { name: { en: "Crepes with cottage cheese", ro: "Clătite cu brânză de vaci", ru: "Блины с творогом" }, price: 55 },
                    { name: { en: "Crepes with meat", ro: "Clătite cu carne", ru: "Блины с мясом" }, price: 65 }
                ]
            },
            {
                name: { en: "For Vegans' Joy", ro: "Bucuria veganilor", ru: "На радость веганам" },
                items: [
                    { name: { en: "Acai bowl", ro: "Bol Acai", ru: "Асаи боул" }, price: 170 },
                    { name: { en: "Oatmeal", ro: "Terci de ovăz", ru: "Каша овсяная" }, price: 40 }
                ]
            }
        ]
    },
    {
        category: { en: "Appetizers", ro: "Gustări", ru: "Закуски" },
        subcategories: [
            {
                name: { en: "Farm Cheeses", ro: "Brânzeturi de fermă", ru: "Фермерские сыры" },
                items: [
                    { name: { en: "Stracciatella with baked pepper and ciabatta", ro: "Stracciatella cu ardei copt și ciabatta", ru: "Страчателла с печеным перцем и чиабаттой" }, price: 110 },
                    { name: { en: "Bruschetta with cow cottage cheese and baked vegetables", ro: "Bruschete cu brânză de vaci și legume coapte", ru: "Брускетта с коровьим творогом и печеными овощами" }, price: 75 },
                    { name: { en: "Burrata with tomatoes and pita", ro: "Burrata cu roșii și lipie", ru: "Буратта с томатами и питой" }, price: 105 },
                    { name: { en: "Three cheeses and prosciutto", ro: "Trei brânzeturi și prosciutto", ru: "Три сыра и прошуто" }, price: 125 }
                ]
            },
            {
                name: { en: "Brought from Home", ro: "Aduse de acasă", ru: "Принесли из дома" },
                items: [
                    { name: { en: "Fried zucchini with garlic", ro: "Dovlecei prăjiți cu usturoi", ru: "Кабачки жареные с чесноком" }, price: 45 },
                    { name: { en: "Zucchini fritters with bacon", ro: "Clătite de dovlecei cu bacon", ru: "Деруны из кабачка с беконом" }, price: 60 },
                    { name: { en: "Potato pancakes with mushrooms", ro: "Clătite de cartofi cu ciuperci", ru: "Картофельные драники с грибами" }, price: 60 },
                    { name: { en: "Herring assortment", ro: "Asortiment de hering", ru: "Ассорти сельди" }, price: 75 }
                ]
            },
            {
                name: { en: "With our fresh bread", ro: "Cu pâinea noastră proaspătă", ru: "С нашим свежим хлебом" },
                items: [
                    { name: { en: "Warm Ciabatta", ro: "Ciabatta caldă", ru: "Теплая Чиабатта" }, price: 25 },
                    { name: { en: "Baguette", ro: "Baghetă", ru: "Багет" }, price: 25 },
                    { name: { en: "Smorrebrod with roast beef", ro: "Smorrebrod cu roast beef", ru: "Сморреброд с ростбифом" }, price: 55 },
                    { name: { en: "Smorrebrod with sprats", ro: "Smorrebrod cu șprot", ru: "Сморреброд с шпротами" }, price: 45 },
                    { name: { en: "Smorrebrod with herring", ro: "Smorrebrod cu hering", ru: "Сморреброд с сельдью" }, price: 45 },
                    { name: { en: "Pate with caramel", ro: "Pateu cu caramel", ru: "Паштет с карамелью" }, price: 85 }
                ]
            }
        ]
    },
    {
        category: { en: "Salads", ro: "Salate", ru: "Салаты" },
        items: [
            { name: { en: "Turkey salad", ro: "Salată cu curcan", ru: "Салат с индейкой" }, price: 85 },
            { name: { en: "Lebanese salad with lamb", ro: "Salată libaneză cu miel", ru: "Салат ливанский с бараниной" }, price: 90 },
            { name: { en: "Cheesecake Shuba (dressed herring)", ro: "Cheesecake Șuba (Hering sub șubă)", ru: "Чизкейк шуба" }, price: 45 },
            { name: { en: "Octopus salad", ro: "Salată cu caracatiță", ru: "Салат с осьминогом" }, price: 190 },
            { name: { en: "Cabbage and pea salad", ro: "Salată de varză și mazăre", ru: "Салат с капустой и горошком" }, price: 50 },
            { name: { en: "Salad with avocado, goat cheese, strawberry", ro: "Salată cu avocado, brânză de capră, căpșuni", ru: "Салат с авокадо, козий сыр, клубника" }, price: 80 },
            { name: { en: "Green beans, young potatoes, cucumber", ro: "Fasole verde, cartofi noi, castraveți", ru: "Стручковая фасоль, молодой картофель, огурец" }, price: 65 },
            { name: { en: "Tomato and feta salad", ro: "Salată cu roșii și telemea", ru: "Салат с помидорами и брынзой" }, price: 65 }
        ]
    },
    {
        category: { en: "Soups", ro: "Supe", ru: "Супы" },
        subcategories: [
            {
                name: { en: "Summer and cool", ro: "De vară și răcoroase", ru: "Летние и прохладные" },
                items: [
                    { name: { en: "Okroshka with kvass", ro: "Okroshka cu cvas", ru: "Окрошка на квасе" }, price: 60 },
                    { name: { en: "Okroshka with smoked meats", ro: "Okroshka cu afumături", ru: "Окрошка с копченостями" }, price: 60 },
                    { name: { en: "Soup with strawberries and ice cream", ro: "Supă cu căpșuni și înghețată", ru: "Суп с клубникой и мороженым" }, price: 65 }
                ]
            },
            {
                name: { en: "Always hit the spot", ro: "Mereu la fix", ru: "Всегда в тему" },
                items: [
                    { name: { en: "Green pea soup with bacon", ro: "Supă de mazăre verde cu bacon", ru: "Суп из зеленого горошка с беконом" }, price: 70 },
                    { name: { en: "Borscht", ro: "Borș", ru: "Борщ" }, price: 65 },
                    { name: { en: "Ukha (fish soup)", ro: "Ciorbă de pește (Uha)", ru: "Уха" }, price: 70 },
                    { name: { en: "Cheese soup with mushrooms", ro: "Supă de brânză cu ciuperci", ru: "Сырный суп с грибами" }, price: 65 }
                ]
            }
        ]
    },
    {
        category: { en: "Hot Dishes with Side", ro: "Feluri principale cu garnitură", ru: "Горячие блюда с гарниром" },
        items: [
            { name: { en: "Chicken Kiev", ro: "Pârjoală a la Kiev", ru: "Котлета по-Киевски" }, price: 120 },
            { name: { en: "Turkey with risotto", ro: "Curcan cu risotto", ru: "Индейка с ризотто" }, price: 120 },
            { name: { en: "Rabbit with vegetables", ro: "Iepure cu legume", ru: "Кролик с овощами" }, price: 145 },
            { name: { en: "Cutlets with mashed potatoes", ro: "Pârjoale cu piure", ru: "Котлетки с пюре" }, price: 85 },
            { name: { en: "Navy-style macaroni", ro: "Macaroane a la Flotă (cu carne tocată)", ru: "Макароны по-флотски" }, price: 70 },
            { name: { en: "Gnocchi with ricotta and spinach", ro: "Gnocchi cu ricotta și spanac", ru: "Ньоки с рикоттой и шпинатом" }, price: 80 },
            { name: { en: "Gnocchi with truffle sauce", ro: "Gnocchi cu sos de trufe", ru: "Ньоки с трюфельным соусом" }, price: 80 },
            { name: { en: "Beef cheeks", ro: "Fălci de vită", ru: "Говяжьи щеки" }, price: 120 },
            { name: { en: "Chicken curry", ro: "Pui curry", ru: "Курица карри" }, price: 120 },
            { name: { en: "Baked mackerel with young potatoes", ro: "Macrou copt cu cartofi noi", ru: "Скумбрия запеченная с молодым картофелем" }, price: 110 },
            { name: { en: "Fish with polenta", ro: "Pește cu mămăligă (polenta)", ru: "Рыба с палентой" }, price: 120 }
        ]
    },
    {
        category: { en: "Desserts", ro: "Deserturi", ru: "Десерты" },
        items: [
            { name: { en: "Napoleon", ro: "Napoleon", ru: "Наполеон" }, price: 110 },
            { name: { en: "Baklava Tashkent", ro: "Baclava Tașkent", ru: "Пахлава Ташкент" }, price: 150 }
        ]
    }
];

const translations = {
    en: {
        navMenu: "Menu",
        navReservations: "Reservations",
        navAbout: "About Us",
        navContact: "Contact",
        heroTitle: "A Premium Dining Experience",
        heroSubtitle: "Experience the finest culinary creations in an elegant atmosphere.",
        heroCta: "Explore Menu",
        menuTitle: "Our Signature Menu",
        resTitle: "Make a Reservation",
        resSubtitle: "Book your table to enjoy an unforgettable dining experience.",
        resName: "Name",
        resDate: "Date",
        resTime: "Time",
        resGuests: "Guests",
        resSubmit: "Book Table",
        aboutTitle: "Our Story",
        aboutDesc: "At Crosta Kitchen Bakery, we believe in creating memorable dining experiences. We source the finest ingredients to bring you exquisite dishes crafted with passion and culinary expertise.",
        footerTitle: "Visit Us",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerHours: "Open Daily: 8:00 - 22:00",
        footerRights: "All rights reserved.",
        allFilter: "All",
        
        // Footnotes
        footnotesTitle: "Footnotes / Legend",
        note1: "We are happy to serve breakfast from 9:00 to 21:00",
        note2: "Main menu is served from 12:00 to 23:00",
        note3: "🌶️ — spicy or piquant",
        note4: "🐟 — caution: fish bones",
        note5: "🧄 — contains garlic",
        note6: "⏱️ — preparation takes more than 25 minutes",
        note7: "If you have allergies or dietary preferences, please let us know",
        currency: "MDL",
        
        // Modal
        resSuccessTitle: "Reservation Confirmed!",
        resSuccessMsg: "Thank you for choosing Crosta. We look forward to serving you.",
        resSuccessClose: "Close",

        // Reviews Section
        navReviews: "Reviews",
        reviewsBadge: "✦ Authentic Guest Impressions",
        reviewsTitle: "What Our Guests Say",
        reviewsSubtitle: "Honest impressions of our artisanal cuisine, warm atmosphere, handcrafted bakery, and attentive service.",
        scoreBasedOn: "Based on",
        scoreReviewsWord: "reviews",
        catFood: "Food",
        catInterior: "Interior & Design",
        catService: "Service & Hospitality",
        catBakery: "Pastries & Coffee",
        catAtmosphere: "Atmosphere & Vibe",
        writeReviewBtn: "Leave a Review",
        reviewWelcome: "Your feedback inspires us every single day",
        filterAll: "All",
        loadMoreReviews: "View more reviews",
        showLessReviews: "Show less",
        modalReviewTitle: "Share Your Experience",
        modalReviewSubtitle: "Your feedback helps us preserve the finest culinary and hospitality standards.",
        reviewFormName: "Your Name *",
        reviewFormEmail: "Email (optional)",
        reviewFormCategory: "Which aspect would you primarily like to review? *",
        reviewFormRating: "Overall Rating *",
        aspectRatingsTitle: "Category breakdown (optional)",
        reviewFormText: "Your Review / Message *",
        reviewFormHighlight: "What dish or detail do you recommend? (optional)",
        reviewFormSubmit: "Publish Review",
        reviewSubmitting: "Publishing...",
        reviewSuccessTitle: "Review Registered!",
        reviewSuccessMsg: "Thank you wholeheartedly for your feedback and for helping us grow better every single day.",
        verifiedGuest: "Verified Guest",
        helpfulText: "Helpful",
        recommendsLabel: "Recommends",
        newReviewPill: "NEW"
    },
    ro: {
        navMenu: "Meniu",
        navReservations: "Rezervări",
        navAbout: "Despre Noi",
        navContact: "Contact",
        heroTitle: "O Experiență Culinară Premium",
        heroSubtitle: "Descoperiți cele mai fine creații culinare într-o atmosferă elegantă.",
        heroCta: "Explorează Meniul",
        menuTitle: "Meniul Nostru Semnătură",
        resTitle: "Faceți o Rezervare",
        resSubtitle: "Rezervați o masă pentru a vă bucura de o experiență culinară de neuitat.",
        resName: "Nume",
        resDate: "Data",
        resTime: "Ora",
        resGuests: "Număr de persoane",
        resSubmit: "Rezervă Masa",
        aboutTitle: "Povestea Noastră",
        aboutDesc: "La Crosta Kitchen Bakery, credem în crearea unor experiențe culinare memorabile. Folosim cele mai bune ingrediente pentru a vă oferi preparate rafinate, create cu pasiune și expertiză culinară.",
        footerTitle: "Vizitează-ne",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerHours: "Deschis Zilnic: 8:00 - 22:00",
        footerRights: "Toate drepturile rezervate.",
        allFilter: "Toate",
        
        // Footnotes
        footnotesTitle: "Note / Legendă",
        note1: "Ne bucurăm să vă servim micul dejun de la 9:00 la 21:00",
        note2: "Meniul principal este servit de la 12:00 la 23:00",
        note3: "🌶️ — picant sau condimentat",
        note4: "🐟 — atenție: oase de pește",
        note5: "🧄 — conține usturoi",
        note6: "⏱️ — prepararea durează mai mult de 25 minute",
        note7: "Dacă aveți alergii sau preferințe alimentare, vă rugăm să ne anunțați",
        currency: "MDL",
        
        // Modal
        resSuccessTitle: "Rezervare Confirmată!",
        resSuccessMsg: "Vă mulțumim că ați ales Crosta. Vă așteptăm cu drag.",
        resSuccessClose: "Închide",

        // Reviews Section
        navReviews: "Recenzii",
        reviewsBadge: "✦ Experiențe Autentice",
        reviewsTitle: "Ce Spun Oaspeții Noștri",
        reviewsSubtitle: "Păreri sincere despre preparatele noastre, atmosfera caldă, deserturile artizanale și serviciul dedicat.",
        scoreBasedOn: "Bazat pe",
        scoreReviewsWord: "recenzii",
        catFood: "Mâncare",
        catInterior: "Interior & Design",
        catService: "Serviciu & Ospitalitate",
        catBakery: "Patiserie & Cafea",
        catAtmosphere: "Atmosferă & Vibrație",
        writeReviewBtn: "Lasă o Recenzie",
        reviewWelcome: "Părerea ta ne inspiră în fiecare zi",
        filterAll: "Toate",
        loadMoreReviews: "Vezi mai multe recenzii",
        showLessReviews: "Arată mai puține",
        modalReviewTitle: "Împărtășește Experiența Ta",
        modalReviewSubtitle: "Feedback-ul tău ne ajută să păstrăm cele mai înalte standarde culinare și de ospitalitate.",
        reviewFormName: "Numele Tău *",
        reviewFormEmail: "Email (opțional)",
        reviewFormCategory: "Ce aspect dorești să evaluezi în principal? *",
        reviewFormRating: "Notă Generală *",
        aspectRatingsTitle: "Evaluare pe categorii (opțional)",
        reviewFormText: "Mesajul / Impresia Ta *",
        reviewFormHighlight: "Ce preparat sau detaliu recomanzi altora? (opțional)",
        reviewFormSubmit: "Publică Recenzia",
        reviewSubmitting: "Se publică...",
        reviewSuccessTitle: "Recenzie Înregistrată!",
        reviewSuccessMsg: "Îți mulțumim din suflet pentru feedback și pentru că ne ajuți să devenim mai buni în fiecare zi.",
        verifiedGuest: "Oaspete Verificat",
        helpfulText: "Util",
        recommendsLabel: "Recomandă",
        newReviewPill: "NOU"
    },
    ru: {
        navMenu: "Меню",
        navReservations: "Резервация",
        navAbout: "О Нас",
        navContact: "Контакты",
        heroTitle: "Премиальный Ужин",
        heroSubtitle: "Насладитесь изысканными кулинарными творениями в элегантной атмосфере.",
        heroCta: "Смотреть Меню",
        menuTitle: "Наше Фирменное Меню",
        resTitle: "Забронировать Столик",
        resSubtitle: "Забронируйте столик, чтобы насладиться незабываемым ужином.",
        resName: "Имя",
        resDate: "Дата",
        resTime: "Время",
        resGuests: "Количество гостей",
        resSubmit: "Забронировать",
        aboutTitle: "Наша История",
        aboutDesc: "В Crosta Kitchen мы верим в создание незабываемых впечатлений от еды. Мы используем лучшие ингредиенты, чтобы предложить вам изысканные блюда, созданные с любовью и мастерством.",
        footerTitle: "Посетите Нас",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerHours: "Открыто Ежедневно: 8:00 - 22:00",
        footerRights: "Все права защищены.",
        allFilter: "Все",
        
        // Footnotes
        footnotesTitle: "Сноски / Условные обозначения",
        note1: "Мы рады кормить Вас завтраками с 9.00 до 21.00",
        note2: "Основное меню подается с 12.00 до 23.00",
        note3: "🌶️ — острое либо пикантное",
        note4: "🐟 — осторожно рыбьи косточки",
        note5: "🧄 — чеснок входит в состав",
        note6: "⏱️ — готовится дольше 25 минут",
        note7: "Если у Вас есть аллергии или другие пищевые предпочтения просим сообщить нам об этом",
        currency: "MDL",
        
        // Modal
        resSuccessTitle: "Бронирование подтверждено!",
        resSuccessMsg: "Спасибо, что выбрали Crosta. Ждем вас с нетерпением.",
        resSuccessClose: "Закрыть",

        // Reviews Section
        navReviews: "Отзывы",
        reviewsBadge: "✦ Впечатления Гостей",
        reviewsTitle: "Что Говорят Наши Гости",
        reviewsSubtitle: "Искренние отзывы о нашей авторской кухне, уютном интерьере, свежей выпечке и гостеприимном сервисе.",
        scoreBasedOn: "На основе",
        scoreReviewsWord: "отзывов",
        catFood: "Кухня",
        catInterior: "Интерьер & Дизайн",
        catService: "Сервис & Гостеприимство",
        catBakery: "Выпечка & Кофе",
        catAtmosphere: "Атмосфера",
        writeReviewBtn: "Оставить Отзыв",
        reviewWelcome: "Ваши отзывы вдохновляют нас каждый день",
        filterAll: "Все",
        loadMoreReviews: "Показать больше отзывов",
        showLessReviews: "Свернуть",
        modalReviewTitle: "Поделитесь Вашим Опытом",
        modalReviewSubtitle: "Ваш отзыв помогает нам сохранять высочайшие стандарты кухни и гостеприимства.",
        reviewFormName: "Ваше Имя *",
        reviewFormEmail: "Email (необязательно)",
        reviewFormCategory: "Что вы хотите оценить в первую очередь? *",
        reviewFormRating: "Общая Оценка *",
        aspectRatingsTitle: "Оценка по категориям (необязательно)",
        reviewFormText: "Ваш Отзыв / Впечатления *",
        reviewFormHighlight: "Какое блюдо или деталь вы рекомендуете? (необязательно)",
        reviewFormSubmit: "Опубликовать Отзыв",
        reviewSubmitting: "Публикация...",
        reviewSuccessTitle: "Отзыв Опубликован!",
        reviewSuccessMsg: "Сердечно благодарим вас за отзыв и за то, что помогаете нам становиться лучше каждый день.",
        verifiedGuest: "Проверенный Гость",
        helpfulText: "Полезно",
        recommendsLabel: "Рекомендует",
        newReviewPill: "НОВЫЙ"
    }
};

function setMenuFilter(filterName) {
    currentMenuFilter = filterName;
    const savedLang = localStorage.getItem('preferredLang') || 'ro';
    renderMenu(savedLang);
}

function renderMenu(lang) {
    const menuContainer = document.getElementById('dynamic-menu');
    const filtersContainer = document.getElementById('menu-filters');
    if (!menuContainer) return;
    
    if (filtersContainer) {
        let filtersHtml = `<button class="filter-btn ${currentMenuFilter === 'All' ? 'active' : ''}" onclick="setMenuFilter('All')">${translations[lang].allFilter || 'All'}</button>`;
        menuData.forEach(cat => {
            const catKey = cat.category.en;
            const catName = cat.category[lang];
            const isActive = currentMenuFilter === catKey ? 'active' : '';
            filtersHtml += `<button class="filter-btn ${isActive}" onclick="setMenuFilter('${catKey.replace(/'/g, "\\'")}')">${catName}</button>`;
        });
        filtersContainer.innerHTML = filtersHtml;
    }
    
    let html = '';
    
    menuData.forEach(cat => {
        const catKey = cat.category.en;
        if (currentMenuFilter !== 'All' && currentMenuFilter !== catKey) return;
        
        html += `<div class="menu-category">`;
        html += `<h3 class="category-title">${cat.category[lang]}</h3>`;
        
        if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
                html += `<h4 class="subcategory-title">${sub.name[lang]}</h4>`;
                html += `<ul class="menu-list">`;
                sub.items.forEach((item, index) => {
                    const imageClass = item.image ? ' has-image' : '';
                    const clickAttr = item.image ? ` onclick="openImageModal('${item.image}', '${item.name[lang].replace(/'/g, "\\'")}')"` : '';
                    const photoBadge = item.image ? `<span class="photo-badge">📷</span>` : '';
                    html += `
                        <li class="menu-item${imageClass}"${clickAttr} style="transition-delay: ${index * 0.04}s">
                            <div class="item-info">
                                <span class="item-name">${item.name[lang]}</span>
                                ${photoBadge}
                            </div>
                            <span class="item-dots"></span>
                            <span class="item-price">${item.price} <span class="currency">${translations[lang].currency}</span></span>
                        </li>
                    `;
                });
                html += `</ul>`;
            });
        } else if (cat.items) {
            html += `<ul class="menu-list">`;
            cat.items.forEach((item, index) => {
                const imageClass = item.image ? ' has-image' : '';
                const clickAttr = item.image ? ` onclick="openImageModal('${item.image}', '${item.name[lang].replace(/'/g, "\\'")}')"` : '';
                const photoBadge = item.image ? `<span class="photo-badge">📷</span>` : '';
                html += `
                    <li class="menu-item${imageClass}"${clickAttr} style="transition-delay: ${index * 0.04}s">
                        <div class="item-info">
                            <span class="item-name">${item.name[lang]}</span>
                            ${photoBadge}
                        </div>
                        <span class="item-dots"></span>
                        <span class="item-price">${item.price} <span class="currency">${translations[lang].currency}</span></span>
                    </li>
                `;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    });
    
    menuContainer.innerHTML = html;
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    renderMenu(lang);
    renderReviews(lang);

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Save preference to localStorage
    localStorage.setItem('preferredLang', lang);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Check for saved language or default to 'ro'
    const savedLang = localStorage.getItem('preferredLang') || 'ro';
    setLanguage(savedLang);

    // Initialize reviews module
    initReviews();

    // Close mobile menu when clicking nav links
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar nav a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar) navbar.classList.remove('nav-open');
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeImageModal();
            closeReviewModal();
            closeReviewSuccessModal();
            if (navbar) navbar.classList.remove('nav-open');
        }
    });

    // Navbar scroll effect and active link spy
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Navbar glass effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax Hero Image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        }
        
        // Active link spy
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.02,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Reservation Form Handling
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = resForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const name = document.getElementById('res-name').value;
            const date = document.getElementById('res-date').value;
            const time = document.getElementById('res-time').value;
            const guests = document.getElementById('res-guests').value;

            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, date, time, guests })
                });

                if (response.ok) {
                    // Show modal
                    document.getElementById('res-success-modal').style.display = 'flex';
                    // Clear the form
                    resForm.reset();
                } else {
                    const errorData = await response.json();
                    console.error('Failed to send reservation:', errorData);
                    alert(`Error from server: ${errorData.error || errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Network error. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

function closeModal() {
    document.getElementById('res-success-modal').style.display = 'none';
}

function openImageModal(imgSrc, title) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image-element');
    const modalTitle = document.getElementById('modal-image-title');
    
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modal.style.display = 'flex';
}

function closeImageModal() {
    document.getElementById('image-modal').style.display = 'none';
}

function toggleMobileMenu() {
    document.querySelector('.navbar').classList.toggle('nav-open');
}

/* ==========================================================================
   REVIEWS MODULE
   ========================================================================== */

let currentReviewFilter = 'all';
let showAllReviews = false;
const reviewsPerPage = 6;
let currentFormRating = 5;
let currentFormCategory = 'food';
let currentAspectRatings = { food: 5, interior: 5, service: 5 };

const defaultReviews = [
    {
        id: "crosta-rev-1",
        author: "Dumitru Cebotari",
        date: "2024-10-18",
        category: "food",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 5 },
        highlight: {
            ro: "Shakshuka cu ou poșat și brânză de capră",
            en: "Shakshuka with poached egg and goat cheese",
            ru: "Шакшука с пашот и козьим сыром"
        },
        comment: {
            ro: "Cea mai bună Shakshuka pe care am gustat-o în Chișinău! Pâinea artizanală caldă este pur și simplu divină, iar combinația cu brânza de capră este de neegalat. Un mic dejun desăvârșit.",
            en: "The best Shakshuka I have tasted in Chișinău! The warm artisanal bread is simply divine, and the combination with goat cheese is unmatched. An absolute perfection of a breakfast.",
            ru: "Лучшая шакшука, которую я пробовал в Кишиневе! Теплый ремесленный хлеб просто божественен, а козий сыр добавляет идеальную нотку. Безупречный завтрак."
        },
        likes: 18
    },
    {
        id: "crosta-rev-2",
        author: "Elena Moraru",
        date: "2024-10-15",
        category: "interior",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 5 },
        highlight: {
            ro: "Design scandinav călduros & lumină naturală",
            en: "Warm Scandinavian design & natural light",
            ru: "Скандинавский уют и естественный свет"
        },
        comment: {
            ro: "Un spațiu cu o estetică impecabilă pe Miron Costin. Texturile calde de lemn, muzica de jazz în surdină și aroma de cafea proaspătă creează o oază de liniște. Locul meu preferat de relaxare.",
            en: "A space with an impeccable aesthetic on Miron Costin. Warm wood textures, soft jazz music, and the smell of fresh coffee create an oasis of tranquility. My favorite place to unwind.",
            ru: "Пространство с безупречной эстетикой на Мирон Костин. Теплое дерево, ненавязчивый джаз и аромат свежего кофе создают оазис уюта. Мое любимое место для отдыха."
        },
        likes: 24
    },
    {
        id: "crosta-rev-3",
        author: "Adrian & Cristina V.",
        date: "2024-10-12",
        category: "service",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 5 },
        highlight: {
            ro: "Ospitalitate atentă și discretă",
            en: "Attentive and discreet hospitality",
            ru: "Внимательный и душевный персонал"
        },
        comment: {
            ro: "Serviciul de la Crosta stabilește un nou standard în oraș. Chelnerii sunt extrem de politicoși, cunosc în detaliu fiecare ingredient din meniu și au avut o grijă deosebită pentru preferințele noastre.",
            en: "The service at Crosta sets a benchmark in the city. The staff is polite, knows every ingredient in the menu, and took wonderful care of our dining preferences.",
            ru: "Сервис в Crosta задает высочайший стандарт в городе. Официанты очень вежливы, знают каждую деталь меню и окружили нас искренней заботой."
        },
        likes: 15
    },
    {
        id: "crosta-rev-4",
        author: "Sophie Laurent",
        date: "2024-10-08",
        category: "bakery",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 5 },
        highlight: {
            ro: "Ciabatta caldă & Cappuccino artizanal",
            en: "Warm Ciabatta & Artisanal Cappuccino",
            ru: "Теплая чиабатта и авторский капучино"
        },
        comment: {
            ro: "Ca iubitoare de panificație franceză, sunt uluită de calitatea aluatului cu maia de la Crosta. Coaja crocantă, miezul aerat și untul folosit în patiserie sunt la nivel de brutărie pariziană de top.",
            en: "As a French bakery enthusiast, I am stunned by the sourdough quality at Crosta. The crispy crust, aerated crumb, and rich butter are on par with a top Parisian bakery.",
            ru: "Как ценитель французской выпечки, я в восторге от качества теста в Crosta. Хрустящая корочка, пористый мякиш и великолепное сливочное масло на уровне парижских пекарен."
        },
        likes: 29
    },
    {
        id: "crosta-rev-5",
        author: "Mihai Roșca",
        date: "2024-10-04",
        category: "food",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 4 },
        highlight: {
            ro: "Ou poșat cu avocado și somon",
            en: "Poached egg with avocado and salmon",
            ru: "Пашот с авокадо и семгой"
        },
        comment: {
            ro: "Ouăle poșate sunt gătite la perfecțiune, somonul este proaspăt și delicat sărat, iar pâinea prăjită este aurie. Porția este generoasă și plină de savoare. Revin mereu cu plăcere!",
            en: "The poached eggs are executed to perfection, salmon is fresh and delicately cured, and the toasted bread is golden. Hearty portion bursting with flavor. I keep coming back!",
            ru: "Яйца пашот приготовлены идеально, семга нежнейшего посола, а поджаренный хлеб с золотистой корочкой. Щедрая и сытная порция. Возвращаюсь снова и снова!"
        },
        likes: 12
    },
    {
        id: "crosta-rev-6",
        author: "Valeria Stratan",
        date: "2024-09-29",
        category: "atmosphere",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 5 },
        highlight: {
            ro: "Muzică plăcută și vibrație calmă",
            en: "Soothing music and calm morning vibe",
            ru: "Умиротворяющая утренняя атмосфера"
        },
        comment: {
            ro: "Atmosfera de dimineață este absolut magică. Este locul ideal pentru o întâlnire de afaceri liniștită sau pentru o lectură matinală însoțită de un ceai aromat. Te simți deconectat de agitația Chișinăului.",
            en: "The morning vibe is purely magical. The ideal spot for a quiet breakfast meeting or a morning read with aromatic tea. It feels completely detached from the city bustle.",
            ru: "Утренняя атмосфера просто волшебная. Идеальное место для спокойной деловой встречи или утреннего чтения за чашкой ароматного чая. Полный релакс вдали от суеты."
        },
        likes: 21
    },
    {
        id: "crosta-rev-7",
        author: "Maximilian Gross",
        date: "2024-09-22",
        category: "food",
        rating: 5,
        aspectRatings: { food: 5, interior: 4, service: 5 },
        highlight: {
            ro: "Stracciatella cu ardei copt și ciabatta",
            en: "Stracciatella with baked pepper and ciabatta",
            ru: "Страчателла с печеным перцем"
        },
        comment: {
            ro: "Stracciatella este cremoasă, iar asocierea cu ardeiul dulce copt și uleiul de măsline fin este o capodoperă. Crosta demonstrează că ingredientele simple de calitate fac diferența.",
            en: "The Stracciatella is wonderfully creamy, paired with sweet roasted pepper and fine olive oil it is a masterpiece. Crosta proves that great ingredients make all the difference.",
            ru: "Нежнейшая кремовая страчателла в сочетании со сладким печеным перцем и оливковым маслом — настоящий шедевр. Crosta доказывает класс в каждой детали."
        },
        likes: 14
    },
    {
        id: "crosta-rev-8",
        author: "Nadejda C.",
        date: "2024-09-15",
        category: "interior",
        rating: 5,
        aspectRatings: { food: 5, interior: 5, service: 5 },
        highlight: {
            ro: "Veselă ceramică artizanală și finisaje de bun gust",
            en: "Artisanal ceramic tableware and tasteful accents",
            ru: "Авторская керамика и стильные детали"
        },
        comment: {
            ro: "Apreciez enorm atenția la detalii: vesela din ceramică lucrată manual, florile proaspete de pe mese și plantele naturale creează o armonie rară. Felicitări echipei de design!",
            en: "I deeply appreciate the attention to detail: handcrafted ceramic tableware, fresh flowers on the tables, and natural greenery create a rare harmony. Kudos to the design team!",
            ru: "Очень ценю внимание к мелочам: глиняная посуда ручной работы, живые цветы на столиках и зелень создают редкую гармонию. Браво создателям интерьера!"
        },
        likes: 17
    }
];

function getCurrentLang() {
    return localStorage.getItem('preferredLang') || 'ro';
}

function getUserReviews() {
    try {
        const saved = localStorage.getItem('crosta_user_reviews');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Error reading user reviews from storage:', e);
        return [];
    }
}

function saveUserReviews(reviews) {
    try {
        localStorage.setItem('crosta_user_reviews', JSON.stringify(reviews));
    } catch (e) {
        console.error('Error saving user reviews to storage:', e);
    }
}

function getAllReviews() {
    return [...getUserReviews(), ...defaultReviews];
}

function getLikedReviews() {
    try {
        const liked = localStorage.getItem('crosta_liked_reviews');
        return liked ? JSON.parse(liked) : [];
    } catch (e) {
        return [];
    }
}

function saveLikedReviews(liked) {
    try {
        localStorage.setItem('crosta_liked_reviews', JSON.stringify(liked));
    } catch (e) {
        console.error('Error saving liked reviews:', e);
    }
}

function getInitials(name) {
    if (!name) return 'CK';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatReviewDate(dateStr, lang) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const roMonths = ["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."];
    const ruMonths = ["янв.", "февр.", "март", "апр.", "май", "июнь", "июль", "авг.", "сент.", "окт.", "нояб.", "дек."];
    const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (lang === 'ro') {
        return `${day} ${roMonths[month]} ${year}`;
    } else if (lang === 'ru') {
        return `${day} ${ruMonths[month]} ${year}`;
    } else {
        return `${enMonths[month]} ${day}, ${year}`;
    }
}

function getCategoryInfo(cat, lang) {
    const cats = {
        food: {
            icon: '🍽️',
            label: { ro: 'Mâncare', en: 'Food', ru: 'Кухня' }
        },
        interior: {
            icon: '🏛️',
            label: { ro: 'Interior & Design', en: 'Interior & Design', ru: 'Интерьер' }
        },
        service: {
            icon: '🛎️',
            label: { ro: 'Serviciu & Ospitalitate', en: 'Service & Hospitality', ru: 'Сервис' }
        },
        bakery: {
            icon: '🥐',
            label: { ro: 'Patiserie & Cafea', en: 'Pastries & Coffee', ru: 'Выпечка и Кофе' }
        },
        atmosphere: {
            icon: '✨',
            label: { ro: 'Atmosferă & Vibrație', en: 'Atmosphere & Vibe', ru: 'Атмосфера' }
        }
    };
    const item = cats[cat] || { icon: '⭐', label: { ro: cat, en: cat, ru: cat } };
    return {
        icon: item.icon,
        name: (item.label && item.label[lang]) ? item.label[lang] : item.label.ro
    };
}

function getRatingLabel(val, lang) {
    const labels = {
        5: { ro: "5 / 5 — Excelent", en: "5 / 5 — Excellent", ru: "5 / 5 — Превосходно" },
        4: { ro: "4 / 5 — Foarte Bun", en: "4 / 5 — Very Good", ru: "4 / 5 — Очень Хорошо" },
        3: { ro: "3 / 5 — Bun", en: "3 / 5 — Good", ru: "3 / 5 — Хорошо" },
        2: { ro: "2 / 5 — Acceptabil", en: "2 / 5 — Fair", ru: "2 / 5 — Нормально" },
        1: { ro: "1 / 5 — Dezamăgitor", en: "1 / 5 — Disappointing", ru: "1 / 5 — Плохо" }
    };
    return (labels[val] && labels[val][lang]) ? labels[val][lang] : `${val} / 5`;
}

function renderStars(rating) {
    const r = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
    return '★'.repeat(r) + '☆'.repeat(5 - r);
}

function renderReviews(lang) {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    const allReviews = getAllReviews();
    const likedList = getLikedReviews();

    // 1. Calculate overall score stats
    const totalCount = allReviews.length;
    const overallScore = totalCount > 0 
        ? (allReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / totalCount) 
        : 4.9;

    const avgScoreEl = document.getElementById('reviews-avg-score');
    const totalCountEl = document.getElementById('reviews-total-count');
    if (avgScoreEl) avgScoreEl.textContent = overallScore.toFixed(1);
    if (totalCountEl) totalCountEl.textContent = totalCount;

    // 2. Calculate category scores & progress bars
    const categories = ['food', 'interior', 'service', 'bakery', 'atmosphere'];
    const baselineDefaults = { food: 4.9, interior: 4.9, service: 4.8, bakery: 5.0, atmosphere: 4.9 };

    categories.forEach(cat => {
        const matchingScores = [];
        allReviews.forEach(r => {
            if (r.category === cat) {
                matchingScores.push(Number(r.rating) || 5);
            }
            if (r.aspectRatings && r.aspectRatings[cat]) {
                matchingScores.push(Number(r.aspectRatings[cat]));
            }
        });

        const score = matchingScores.length > 0 
            ? (matchingScores.reduce((a, b) => a + b, 0) / matchingScores.length) 
            : baselineDefaults[cat];

        const scoreVal = score.toFixed(1);
        const scoreEl = document.getElementById(`score-${cat}`);
        const barEl = document.getElementById(`bar-${cat}`);
        if (scoreEl) scoreEl.textContent = scoreVal;
        if (barEl) {
            const percent = Math.min(100, Math.max(10, Math.round((score / 5) * 100)));
            barEl.style.width = `${percent}%`;
        }

        // Filter counts
        const catCount = allReviews.filter(r => r.category === cat).length;
        const countEl = document.getElementById(`filter-count-${cat}`);
        if (countEl) countEl.textContent = catCount;
    });

    const filterAllCountEl = document.getElementById('filter-count-all');
    if (filterAllCountEl) filterAllCountEl.textContent = totalCount;

    // 3. Update filter button active states
    document.querySelectorAll('.review-filter-btn').forEach(btn => {
        const filterVal = btn.getAttribute('data-filter');
        btn.classList.toggle('active', filterVal === currentReviewFilter);
    });

    // 4. Filter reviews
    const filteredReviews = currentReviewFilter === 'all'
        ? allReviews
        : allReviews.filter(r => r.category === currentReviewFilter);

    // 5. Slice reviews according to pagination
    const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, reviewsPerPage);

    // Update show more button
    const paginationEl = document.getElementById('reviews-pagination');
    const loadMoreText = document.getElementById('load-more-text');
    if (paginationEl) {
        if (filteredReviews.length > reviewsPerPage) {
            paginationEl.style.display = 'block';
            if (loadMoreText) {
                loadMoreText.textContent = showAllReviews 
                    ? (translations[lang]?.showLessReviews || 'Show less') 
                    : (translations[lang]?.loadMoreReviews || 'View more reviews');
            }
        } else {
            paginationEl.style.display = 'none';
        }
    }

    // 6. Build cards HTML
    if (displayedReviews.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--color-text-muted);">
                <p style="font-size: 1.1rem; margin-bottom: 1rem;">Nu există recenzii pentru această categorie momentan.</p>
                <button type="button" class="cta-button" onclick="openReviewModal()" style="margin: 0 auto;">Fii primul care lasă o recenzie!</button>
            </div>
        `;
        return;
    }

    let cardsHtml = '';
    displayedReviews.forEach((rev, index) => {
        const catInfo = getCategoryInfo(rev.category, lang);
        const isLiked = likedList.includes(rev.id);
        const avatar = rev.avatar || getInitials(rev.author);
        const formattedDate = formatReviewDate(rev.date, lang);
        const starsHtml = renderStars(rev.rating);

        // Multilingual comment & highlight
        let commentText = rev.comment;
        if (typeof rev.comment === 'object' && rev.comment !== null) {
            commentText = rev.comment[lang] || rev.comment.ro || rev.comment.en || '';
        }

        let highlightHtml = '';
        if (rev.highlight) {
            let hlText = typeof rev.highlight === 'object' 
                ? (rev.highlight[lang] || rev.highlight.ro || rev.highlight.en || '') 
                : rev.highlight;
            if (hlText) {
                highlightHtml = `
                    <div class="review-highlight-box">
                        <strong>💡 ${translations[lang]?.recommendsLabel || 'Recomandă'}:</strong> ${hlText}
                    </div>
                `;
            }
        }

        // Sub-aspect mini tags
        let aspectTagsHtml = '';
        if (rev.aspectRatings && typeof rev.aspectRatings === 'object') {
            const tags = [];
            if (rev.aspectRatings.food) tags.push(`<span class="aspect-mini-tag">🍽️ ${rev.aspectRatings.food}★</span>`);
            if (rev.aspectRatings.interior) tags.push(`<span class="aspect-mini-tag">🏛️ ${rev.aspectRatings.interior}★</span>`);
            if (rev.aspectRatings.service) tags.push(`<span class="aspect-mini-tag">🛎️ ${rev.aspectRatings.service}★</span>`);
            if (tags.length > 0) {
                aspectTagsHtml = `<div class="aspect-tags">${tags.join('')}</div>`;
            }
        }

        const isNewPill = rev.isUserSubmitted 
            ? `<span class="review-new-pill">${translations[lang]?.newReviewPill || 'NOU'}</span>` 
            : '';

        cardsHtml += `
            <article class="review-card ${rev.isUserSubmitted ? 'is-new' : ''}" style="animation-delay: ${index * 0.05}s">
                <div>
                    <div class="review-card-header">
                        <div class="review-author-info">
                            <div class="review-avatar">${avatar}</div>
                            <div class="review-author-text">
                                <h4>
                                    ${rev.author}
                                    <span class="verified-icon" title="${translations[lang]?.verifiedGuest || 'Verified'}">✓</span>
                                </h4>
                                <span class="review-date">${formattedDate}</span>
                            </div>
                        </div>
                        <span class="review-category-tag">${catInfo.icon} ${catInfo.name}</span>
                    </div>

                    <div class="review-card-rating">
                        <span class="review-stars-display">${starsHtml}</span>
                        ${isNewPill}
                    </div>

                    <p class="review-comment">"${commentText}"</p>
                    ${highlightHtml}
                </div>

                <div class="review-card-footer">
                    ${aspectTagsHtml || '<span></span>'}
                    <button type="button" class="review-helpful-btn ${isLiked ? 'liked' : ''}" onclick="toggleLikeReview('${rev.id}')">
                        <span class="helpful-icon">❤️</span>
                        <span class="helpful-text">${translations[lang]?.helpfulText || 'Util'}</span>
                        <span class="helpful-count">(${rev.likes || 0})</span>
                    </button>
                </div>
            </article>
        `;
    });

    grid.innerHTML = cardsHtml;
}

function filterReviews(category) {
    currentReviewFilter = category;
    showAllReviews = false;
    renderReviews(getCurrentLang());
}

function toggleShowAllReviews() {
    showAllReviews = !showAllReviews;
    renderReviews(getCurrentLang());
}

function openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (!modal) return;
    
    // Reset form to defaults
    selectReviewCategory('food');
    setStarRating(5);
    setMiniStarRating('food', 5);
    setMiniStarRating('interior', 5);
    setMiniStarRating('service', 5);

    const form = document.getElementById('review-form');
    if (form) form.reset();

    // Re-ensure hidden inputs match
    const catVal = document.getElementById('review-category-value');
    if (catVal) catVal.value = 'food';
    const rateVal = document.getElementById('review-rating-value');
    if (rateVal) rateVal.value = '5';

    modal.style.display = 'flex';
}

function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) modal.style.display = 'none';
}

function openReviewSuccessModal() {
    const modal = document.getElementById('review-success-modal');
    if (modal) modal.style.display = 'flex';
}

function closeReviewSuccessModal() {
    const modal = document.getElementById('review-success-modal');
    if (modal) modal.style.display = 'none';
}

function selectReviewCategory(cat) {
    currentFormCategory = cat;
    const catVal = document.getElementById('review-category-value');
    if (catVal) catVal.value = cat;

    document.querySelectorAll('.category-selector-pills .cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
    });
}

function setStarRating(rating) {
    currentFormRating = Number(rating) || 5;
    const rateVal = document.getElementById('review-rating-value');
    if (rateVal) rateVal.value = currentFormRating;

    const stars = document.querySelectorAll('#stars-row .star-btn');
    stars.forEach(btn => {
        const val = Number(btn.getAttribute('data-star'));
        btn.classList.toggle('active', val <= currentFormRating);
    });

    const labelEl = document.getElementById('rating-label-text');
    if (labelEl) {
        labelEl.textContent = getRatingLabel(currentFormRating, getCurrentLang());
    }
}

function setMiniStarRating(aspect, val) {
    currentAspectRatings[aspect] = Number(val) || 5;
    const container = document.querySelector(`.mini-stars[data-aspect="${aspect}"]`);
    if (container) {
        container.querySelectorAll('.mini-star').forEach(star => {
            const v = Number(star.getAttribute('data-val'));
            star.classList.toggle('active', v <= val);
        });
    }
}

function toggleLikeReview(reviewId) {
    const liked = getLikedReviews();
    const isLiked = liked.includes(reviewId);
    let newLiked;

    if (isLiked) {
        newLiked = liked.filter(id => id !== reviewId);
    } else {
        newLiked = [...liked, reviewId];
    }
    saveLikedReviews(newLiked);

    // Update in userReviews if custom review
    const userReviews = getUserReviews();
    const userRevIndex = userReviews.findIndex(r => r.id === reviewId);
    if (userRevIndex !== -1) {
        userReviews[userRevIndex].likes = Math.max(0, (userReviews[userRevIndex].likes || 0) + (isLiked ? -1 : 1));
        saveUserReviews(userReviews);
    } else {
        // Update in defaultReviews in memory
        const defRev = defaultReviews.find(r => r.id === reviewId);
        if (defRev) {
            defRev.likes = Math.max(0, (defRev.likes || 0) + (isLiked ? -1 : 1));
        }
    }

    renderReviews(getCurrentLang());
}

function initReviewForm() {
    // Star rating interactions
    const starsRow = document.getElementById('stars-row');
    if (starsRow) {
        const stars = starsRow.querySelectorAll('.star-btn');
        stars.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const val = Number(btn.getAttribute('data-star'));
                stars.forEach(s => {
                    const sVal = Number(s.getAttribute('data-star'));
                    s.classList.toggle('hover-active', sVal <= val);
                });
            });

            btn.addEventListener('mouseleave', () => {
                stars.forEach(s => s.classList.remove('hover-active'));
            });

            btn.addEventListener('click', () => {
                const val = Number(btn.getAttribute('data-star'));
                setStarRating(val);
            });
        });
    }

    // Mini aspect stars click handlers
    document.querySelectorAll('.mini-stars').forEach(container => {
        const aspect = container.getAttribute('data-aspect');
        container.querySelectorAll('.mini-star').forEach(star => {
            star.addEventListener('click', () => {
                const val = Number(star.getAttribute('data-val'));
                setMiniStarRating(aspect, val);
            });
        });
    });

    // Review form submit handler
    const form = document.getElementById('review-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('review-submit-btn');
            const originalText = submitBtn.innerHTML;
            const lang = getCurrentLang();
            submitBtn.innerHTML = translations[lang]?.reviewSubmitting || 'Publishing...';
            submitBtn.disabled = true;

            const name = document.getElementById('review-name').value.trim();
            const email = document.getElementById('review-email').value.trim();
            const text = document.getElementById('review-text').value.trim();
            const highlight = document.getElementById('review-highlight').value.trim();
            const category = currentFormCategory || 'food';
            const rating = currentFormRating || 5;

            const newReview = {
                id: 'user-rev-' + Date.now(),
                author: name,
                email: email,
                avatar: getInitials(name),
                date: new Date().toISOString().split('T')[0],
                category: category,
                rating: rating,
                aspectRatings: { ...currentAspectRatings },
                highlight: highlight || '',
                comment: text,
                likes: 0,
                isUserSubmitted: true
            };

            // 1. Save to local storage immediately
            const currentUsers = getUserReviews();
            currentUsers.unshift(newReview);
            saveUserReviews(currentUsers);

            // 2. Notify backend email server asynchronously
            try {
                await fetch('/api/submit-review', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        category,
                        rating,
                        comment: text,
                        highlight,
                        aspectRatings: currentAspectRatings
                    })
                });
            } catch (err) {
                console.warn('Backend email notification notice:', err);
            }

            // 3. Reset form, close modal, show success modal, re-render
            form.reset();
            closeReviewModal();
            openReviewSuccessModal();
            renderReviews(lang);

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
}

function initReviews() {
    initReviewForm();
    renderReviews(getCurrentLang());
}

