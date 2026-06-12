const menuData = [
    {
        category: { en: "Breakfasts", ro: "Mic Dejun", ru: "Завтраки" },
        subcategories: [
            {
                name: { en: "Egg Dishes", ro: "Preparate din ouă", ru: "Блюда из яиц" },
                items: [
                    { name: { en: "Poached egg on bread with avocado, lightly salted salmon, young peas", ro: "Ou poșat pe pâine cu avocado, somon ușor sărat, mazăre verde", ru: "Пашот на хлебе с авокадо, малосольной семгой, молодым горошком" }, price: 110 },
                    { name: { en: "Shakshuka with poached egg and goat cheese", ro: "Shakshuka cu ou poșat și brânză de capră", ru: "Шакшука с пашот и козьим сыром" }, price: 75 },
                    { name: { en: "Souffle omelette with baguette", ro: "Omletă sufleu cu baghetă", ru: "Омлет суфле с багетом" }, price: 55 },
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
        aboutDesc: "At Crosta Kitchen, we believe in creating memorable dining experiences. We source the finest ingredients to bring you exquisite dishes crafted with passion and culinary expertise.",
        footerTitle: "Visit Us",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerHours: "Open Daily: 8:00 - 22:00",
        footerRights: "All rights reserved.",
        
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
        resSuccessClose: "Close"
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
        aboutDesc: "La Crosta Kitchen, credem în crearea unor experiențe culinare memorabile. Folosim cele mai bune ingrediente pentru a vă oferi mâncăruri rafinate, create cu pasiune și expertiză.",
        footerTitle: "Vizitează-ne",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerHours: "Deschis Zilnic: 8:00 - 22:00",
        footerRights: "Toate drepturile rezervate.",
        
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
        resSuccessClose: "Închide"
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
        resSuccessClose: "Закрыть"
    }
};

function renderMenu(lang) {
    const menuContainer = document.getElementById('dynamic-menu');
    if (!menuContainer) return;
    
    let html = '';
    
    menuData.forEach(cat => {
        html += `<div class="menu-category">`;
        html += `<h3 class="category-title">${cat.category[lang]}</h3>`;
        
        if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
                html += `<h4 class="subcategory-title">${sub.name[lang]}</h4>`;
                html += `<ul class="menu-list">`;
                sub.items.forEach(item => {
                    html += `
                        <li class="menu-item">
                            <span class="item-name">${item.name[lang]}</span>
                            <span class="item-dots"></span>
                            <span class="item-price">${item.price} <span class="currency">${translations[lang].currency}</span></span>
                        </li>
                    `;
                });
                html += `</ul>`;
            });
        } else if (cat.items) {
            html += `<ul class="menu-list">`;
            cat.items.forEach(item => {
                html += `
                    <li class="menu-item">
                        <span class="item-name">${item.name[lang]}</span>
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
    
    renderMenu(lang);

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${lang}`).classList.add('active');
    
    // Save preference to localStorage
    localStorage.setItem('preferredLang', lang);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Check for saved language or default to 'en'
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve if you only want it to animate once
                // observer.unobserve(entry.target);
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
