let currentMenuFilter = 'All';
let currentDietaryFilter = 'all';
let currentMenuSearchQuery = '';

const menuData = [
    {
        category: { en: "Breakfasts", ro: "Mic Dejun", ru: "Завтраки" },
        icon: "🍳",
        subcategories: [
            {
                name: { en: "Egg Dishes", ro: "Preparate din ouă", ru: "Блюда из яиц" },
                items: [
                    { 
                        id: "item-poached-egg",
                        name: { en: "Poached egg on bread with avocado, lightly salted salmon, young peas", ro: "Ou poșat pe pâine cu avocado, somon ușor sărat, mazăre verde", ru: "Пашот на хлебе с авокадо, малосольной семгой, молодым горошком" }, 
                        price: 110, 
                        weight: "320g",
                        tags: ["signature", "fish"],
                        description: {
                            ro: "Pâine artizanală rumenită pe vatră, avocado cremos hass, somon marinat delicat în casă și mazăre verde tânără.",
                            en: "Toasted artisanal sourdough, creamy hass avocado, house-cured salmon, and sweet green peas.",
                            ru: "Подрумяненный ремесленный тартин, авокадо хасс, слабосоленый лосось и зеленый горошек."
                        },
                        allergens: {
                            ro: "Gluten (grâu), Ouă, Pește, Semințe de susan",
                            en: "Gluten (wheat), Eggs, Fish, Sesame seeds",
                            ru: "Глютен (пшеница), Яйца, Рыба, Семена кунжута"
                        }
                    },
                    { 
                        id: "item-shakshuka",
                        name: { en: "Shakshuka with poached egg and goat cheese", ro: "Shakshuka cu ou poșat și brânză de capră", ru: "Шакшука с пашот и козьим сыром" }, 
                        price: 75, 
                        weight: "380g",
                        tags: ["signature", "vegetarian"],
                        description: {
                            ro: "Sos de roșii coapte cu ardei dulce, chimion, ouă poșate, brânză fină de capră și pâine caldă cu maia.",
                            en: "Baked tomato sauce with sweet peppers, cumin, poached eggs, crumbled goat cheese, and warm bread.",
                            ru: "Соус из печеных томатов, сладкого перца, кумина, яйца пашот и козий сыр."
                        },
                        allergens: {
                            ro: "Ouă, Lactoză (brânză de capră), Gluten",
                            en: "Eggs, Lactose (goat cheese), Gluten",
                            ru: "Яйца, Лактоза (козий сыр), Глютен"
                        }
                    },
                    { 
                        id: "item-omelette",
                        name: { en: "Souffle omelette with baguette", ro: "Omletă sufleu cu baghetă artizanală", ru: "Омлет суфле с багетом" }, 
                        price: 55, 
                        weight: "260g",
                        tags: ["signature", "vegetarian"],
                        description: {
                            ro: "Omletă aerată și extrem de pufoasă, servită cu baghetă caldă franțuzească și unt aromat.",
                            en: "Fluffy whipped souffle omelette served with warm baguette and herb butter.",
                            ru: "Воздушный омлет-суфле с теплым французским багетом и сливочным маслом."
                        },
                        allergens: {
                            ro: "Ouă, Lactoză, Gluten",
                            en: "Eggs, Lactose, Gluten",
                            ru: "Яйца, Лактоза, Глютен"
                        }
                    },
                    { 
                        id: "item-scramble-potato",
                        name: { en: "Scramble on sweet potato", ro: "Scramble pe cartof dulce", ru: "Скрэмбл на батате" }, 
                        price: 55, 
                        weight: "280g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Ouă scramble cremoase pe felie de cartof dulce copt la cuptor cu verdețuri proaspete.",
                            en: "Creamy scrambled eggs served on roasted sweet potato slice with fresh herbs.",
                            ru: "Нежный скрэмбл на запеченном батате с ароматными травами."
                        }
                    },
                    { 
                        id: "item-scramble-caviar",
                        name: { en: "Scramble on bread with avocado, salmon and red caviar", ro: "Scramble pe pâine cu avocado, somon și icre roșii", ru: "Скрэмбл на хлебе, с авокадо, семгой и красной икрой" }, 
                        price: 120, 
                        weight: "330g",
                        tags: ["signature", "fish"],
                        description: {
                            ro: "Ouă scramble fine pe pâine cu maia, somon delicat, cremă de avocado și icre roșii de somon.",
                            en: "Silky scrambled eggs on sourdough with cured salmon, avocado, and red caviar.",
                            ru: "Шелковистый скрэмбл на тартине с лососем, авокадо и красной икрой."
                        }
                    },
                    { 
                        id: "item-fried-eggs",
                        name: { en: "Fried eggs with bacon, tomato and feta", ro: "Ouă ochiuri cu bacon, roșii și telemea", ru: "Глазунья с беконом, помидором и брынзой" }, 
                        price: 55, 
                        weight: "290g",
                        tags: [],
                        description: {
                            ro: "Ouă ochiuri rumenite, bacon crocant de casă, roșii dulci la grătar și brânză telemea de fermă.",
                            en: "Sunny side eggs with crisp bacon, seared tomatoes, and regional feta cheese.",
                            ru: "Глазунья с хрустящим беконом, сочными помидорами и домашней брынзой."
                        }
                    }
                ]
            },
            {
                name: { en: "Back to the Future", ro: "Înapoi în viitor", ru: "Назад в будущее" },
                items: [
                    { 
                        id: "item-school-sandwich",
                        name: { en: "School sandwich", ro: "Sandviș școlar artizanal", ru: "Школьный бутерброд" }, 
                        price: 60, 
                        weight: "220g",
                        tags: [],
                        description: {
                            ro: "Pâine cu unt aromat, șuncă fragedă de calitate, cașcaval maturat și castraveți murați crocanți.",
                            en: "Classic comfort sandwich with quality ham, aged cheese, butter, and crisp pickles.",
                            ru: "Ностальгический бутерброд с ветчиной, выдержанным сыром и хрустящим огурцом."
                        }
                    },
                    { 
                        id: "item-cottage-cheese",
                        name: { en: "Rustic cottage cheese with honey & berries", ro: "Brânză de vaci de țară cu miere și fructe", ru: "Сельский творог" }, 
                        price: 55, 
                        weight: "240g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Brânză proaspătă de vaci de fermă, miere de tei crudă și fructe de pădure proaspete.",
                            en: "Farm-fresh cottage cheese with raw linden honey and seasonal fresh berries.",
                            ru: "Свежий фермерский творог с натуральным медом и лесными ягодами."
                        }
                    },
                    { 
                        id: "item-donuts",
                        name: { en: "Warm donuts with condensed milk", ro: "Gogoși calde cu lapte condensat", ru: "Пончики со сгущенкой" }, 
                        price: 45, 
                        weight: "200g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Gogoși pufoase proaspăt prăjite, presărate cu zahăr pudră și lapte condensat caramelizat.",
                            en: "Warm fluffy donuts dusted with powdered sugar and caramelized condensed milk.",
                            ru: "Горячие воздушные пончики в сахарной пудре со сгущенным молоком."
                        }
                    }
                ]
            },
            {
                name: { en: "Your Favorites", ro: "Preferatele oaspeților", ru: "Ваши любимые" },
                items: [
                    { 
                        id: "item-syrniki",
                        name: { en: "Syrniki with sour cream and berry sauce", ro: "Syrniki (Papanași) cu smântână și fructe de pădure", ru: "Сырники со сметаной и ягодным соусом" }, 
                        price: 50, 
                        weight: "250g",
                        tags: ["signature", "vegetarian"],
                        description: {
                            ro: "Papanași din brânză fină de vaci rumeniți auriu, serviți cu smântână grasă și coulis de fructe.",
                            en: "Golden cottage cheese syrniki pancakes with rich sour cream and forest berry coulis.",
                            ru: "Золотистые нежные сырники из фермерского творога со сметаной и ягодным соусом."
                        }
                    },
                    { 
                        id: "item-crepes-cheese",
                        name: { en: "Crepes with cottage cheese and vanilla", ro: "Clătite fine cu brânză de vaci și vanilie", ru: "Блины с творогом" }, 
                        price: 55, 
                        weight: "260g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Clătite franțuzești subțiri umplute cu brânză dulce de vaci și esență de vanilie.",
                            en: "Delicate thin crepes filled with sweet vanilla cottage cheese cream.",
                            ru: "Тонкие домашние блинчики со сладкой творожной начинкой и ванилью."
                        }
                    },
                    { 
                        id: "item-crepes-meat",
                        name: { en: "Crepes with braised minced meat", ro: "Clătite cu carne fragedă", ru: "Блины с мясом" }, 
                        price: 65, 
                        weight: "270g",
                        tags: [],
                        description: {
                            ro: "Clătite aurii umplute cu carne tocată de vițel și pui, ceapă caramelizată și smântână.",
                            en: "Golden crepes stuffed with savory braised minced meat and sweet onions.",
                            ru: "Сытные блинчики с начинкой из томленого мясного фарша и лука."
                        }
                    }
                ]
            },
            {
                name: { en: "For Vegans' Joy", ro: "Opțiuni Vegane & Sănătoase", ru: "На радость веганам" },
                items: [
                    { 
                        id: "item-acai-bowl",
                        name: { en: "Acai bowl with granola and coconut", ro: "Bol Acai cu granola artizanală și fructe", ru: "Асаи боул" }, 
                        price: 170, 
                        weight: "340g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Smoothie bowl răcoros din fructe pure de acai, granola crocantă fără gluten, fulgi de cocos și banane.",
                            en: "Refreshing frozen acai bowl topped with house granola, coconut flakes, and fresh fruit.",
                            ru: "Освежающий асаи боул с домашней гранолой, кокосовыми чипсами и фруктами."
                        }
                    },
                    { 
                        id: "item-oatmeal",
                        name: { en: "Oatmeal with almond milk & berries", ro: "Terci cremos de ovăz cu lapte vegetal", ru: "Каша овсяная" }, 
                        price: 40, 
                        weight: "280g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Fulgii de ovăz preparați lent cu lapte de migdale, scorțișoară Ceylon și mere caramelizate.",
                            en: "Creamy oatmeal gently cooked with almond milk, Ceylon cinnamon, and caramelized apples.",
                            ru: "Нежная овсяная каша на миндальном молоке с корицей и яблоками."
                        }
                    }
                ]
            }
        ]
    },
    {
        category: { en: "Bakery & Coffee", ro: "Brutărie & Cafea", ru: "Выпечка и кофе" },
        icon: "🥐",
        items: [
            {
                id: "item-croissant-butter",
                name: { en: "French pure butter Croissant", ro: "Croissant franțuzesc cu 100% unt", ru: "Французский круассан на сливочном масле" },
                price: 35,
                weight: "85g",
                tags: ["signature", "bakery"],
                description: {
                    ro: "Croissant laminat manual cu unt de Normandia, crustă fină crocantă și miez aerat.",
                    en: "Handmade laminated croissant with pure Normandy butter and golden flaky crust.",
                    ru: "Классический круассан ручной лепки на сливочном масле с хрустящей корочкой."
                }
            },
            {
                id: "item-pain-chocolat",
                name: { en: "Pain au Chocolat with Belgian dark chocolate", ro: "Pain au Chocolat cu ciocolată belgiană", ru: "Пен-о-шоколя с бельгийским шоколадом" },
                price: 42,
                weight: "95g",
                tags: ["bakery"],
                description: {
                    ro: "Aluat foietat franțuzesc rumenit, umplut cu două batoane generoase de ciocolată neagră belgiană 70%.",
                    en: "Flaky puff pastry wrapped around two sticks of rich 70% dark Belgian chocolate.",
                    ru: "Хрустящая слоеная выпечка с начинкой из двух палочек темного бельгийского шоколада."
                }
            },
            {
                id: "item-sourdough-loaf",
                name: { en: "Artisanal Sourdough Bread Loaf (72h)", ro: "Pâine artizanală cu maia sălbatică 72h (întreagă)", ru: "Тартин на дикой закваске 72ч" },
                price: 45,
                weight: "650g",
                tags: ["signature", "bakery"],
                description: {
                    ro: "Pâine dospită lent 72 de ore din făină măcinată pe piatră și maia naturală vie, coaptă pe vatră încinsă.",
                    en: "Rustic stone-milled sourdough loaf slowly fermented for 72 hours, baked on hot hearth stone.",
                    ru: "Деревенский хлеб на дикой закваске 72-часового брожения с глубоким вкусом и хрустящей корочкой."
                }
            },
            {
                id: "item-cappuccino-art",
                name: { en: "Specialty Cappuccino / Flat White", ro: "Cappuccino / Flat White de Specialitate", ru: "Спешелти капучино / флэт уайт" },
                price: 38,
                weight: "200ml",
                tags: ["signature"],
                description: {
                    ro: "Espresso dublu din cafea de origine Etiopia Yirgacheffe, lapte proaspăt texturat mătăsos.",
                    en: "Double shot espresso of single origin Ethiopia beans with velvety textured milk.",
                    ru: "Двойной эспрессо из моносорта Эфиопии с бархатистой молочной пенкой."
                }
            },
            {
                id: "item-matcha-latte",
                name: { en: "Ceremonial Grade Matcha Latte", ro: "Matcha Latte Ceremonial", ru: "Матча латте церемониальный" },
                price: 52,
                weight: "250ml",
                tags: ["vegetarian"],
                description: {
                    ro: "Pudră fină de ceai verde matcha din Uji, Japonia, preparată cu lapte cremos de ovăz.",
                    en: "Ceremonial green tea matcha from Uji, Japan, whisked with creamy oat milk.",
                    ru: "Церемониальный зеленый чай матча из Японии на нежном овсяном молоке."
                }
            }
        ]
    },
    {
        category: { en: "Appetizers", ro: "Gustări & Brânzeturi", ru: "Закуски" },
        icon: "🧀",
        subcategories: [
            {
                name: { en: "Farm Cheeses", ro: "Brânzeturi de fermă", ru: "Фермерские сыры" },
                items: [
                    { 
                        id: "item-stracciatella",
                        name: { en: "Stracciatella with baked pepper and ciabatta", ro: "Stracciatella cu ardei copt și ciabatta", ru: "Страчателла с печеным перцем и чиабаттой" }, 
                        price: 110, 
                        weight: "310g",
                        tags: ["signature", "vegetarian"],
                        description: {
                            ro: "Miez cremos de burrata cu ardei dulce copt, usturoi confiat, ulei de măsline fin și ciabatta caldă.",
                            en: "Creamy stracciatella cheese with roasted sweet peppers, confit garlic, olive oil, and ciabatta.",
                            ru: "Нежная страчателла со сладким печеным перцем, чесноком и теплой чиабаттой."
                        }
                    },
                    { 
                        id: "item-burrata-pita",
                        name: { en: "Burrata with tomatoes and pita", ro: "Burrata cu roșii dulci și lipie caldă", ru: "Буратта с томатами и питой" }, 
                        price: 105, 
                        weight: "340g",
                        tags: ["signature", "vegetarian"],
                        description: {
                            ro: "Burrata proaspătă cu roșii cherry dulci coapte, busuioc verde, ulei extravirgin și lipie crocantă.",
                            en: "Fresh Italian burrata with sweet roasted tomatoes, basil, olive oil, and hot pita.",
                            ru: "Свежая буратта с печеными черри, базиликом, оливковым маслом и домашней питой."
                        }
                    },
                    { 
                        id: "item-bruschetta-cottage",
                        name: { en: "Bruschetta with cow cottage cheese and baked vegetables", ro: "Bruschete cu brânză de vaci și legume coapte", ru: "Брускетта с коровьим творогом и печеными овощами" }, 
                        price: 75, 
                        weight: "260g",
                        tags: ["vegetarian"],
                        description: {
                            ro: "Pâine rumenă crocantă, brânză de vaci bătută spumă și legume aromate de sezon coapte la foc.",
                            en: "Crisp toasted bread topped with whipped farm cheese and fire-roasted vegetables.",
                            ru: "Хрустящая брускетта со взбитым творогом и запеченными овощами."
                        }
                    },
                    { 
                        id: "item-three-cheeses",
                        name: { en: "Three artisan cheeses and prosciutto crudo", ro: "Trei brânzeturi artizanale și prosciutto", ru: "Три сыра и прошуто" }, 
                        price: 125, 
                        weight: "280g",
                        tags: ["signature"],
                        description: {
                            ro: "Selecție de brânzeturi maturate de fermă, felii fine de prosciutto crudo, nuci și dulceață de smochine.",
                            en: "Aged artisanal cheese board, thin slices of prosciutto crudo, walnuts, and fig jam.",
                            ru: "Ассорти выдержанных ремесленных сыров, тонкие ломтики прошутто, орехи и инжирный джем."
                        }
                    }
                ]
            },
            {
                name: { en: "With our fresh bread", ro: "Cu pâinea noastră proaspătă", ru: "С нашим свежим хлебом" },
                items: [
                    { 
                        id: "item-ciabatta",
                        name: { en: "Warm Ciabatta with herb butter", ro: "Ciabatta caldă cu unt aromat", ru: "Теплая Чиабатта" }, 
                        price: 25, 
                        weight: "160g",
                        tags: ["vegetarian", "bakery"],
                        description: {
                            ro: "Ciabatta italiană dospită cu maia, coajă crocantă, miez aerat, servită caldă.",
                            en: "Italian ciabatta bread baked with sourdough, crispy crust, served warm.",
                            ru: "Теплая итальянская чиабатта с хрустящей корочкой и воздушным мякишем."
                        }
                    },
                    { 
                        id: "item-baguette",
                        name: { en: "Crispy French Baguette", ro: "Baghetă franțuzească crocantă", ru: "Багет" }, 
                        price: 25, 
                        weight: "180g",
                        tags: ["vegetarian", "bakery"],
                        description: {
                            ro: "Baghetă clasică pariziană cu făină fină măcinată pe piatră.",
                            en: "Classic Parisian baguette made with stone-milled wheat flour.",
                            ru: "Традиционный парижский багет с аппетитной корочкой."
                        }
                    },
                    { 
                        id: "item-smorrebrod-beef",
                        name: { en: "Smorrebrod with roast beef and mustard", ro: "Smorrebrod cu roast beef și muștar Dijon", ru: "Сморреброд с ростбифом" }, 
                        price: 55, 
                        weight: "190g",
                        tags: [],
                        description: {
                            ro: "Sandviș deschis pe pâine de secară cu felii de roast beef fraged, sos remoulade și ceapă crocantă.",
                            en: "Danish open sandwich on rye with tender roast beef, remoulade, and crispy onions.",
                            ru: "Датский открытый бутерброд на ржаном хлебе с ростбифом и луковыми чипсами."
                        }
                    },
                    { 
                        id: "item-pate",
                        name: { en: "Velvety liver pate with onion caramel", ro: "Pateu fin de ficat cu caramel de ceapă", ru: "Паштет с карамелью" }, 
                        price: 85, 
                        weight: "220g",
                        tags: ["signature"],
                        description: {
                            ro: "Pateu cremos de ficat de pasăre cu unt dulce, reducție de ceapă caramelizată și pâine prăjită.",
                            en: "Silky poultry liver pate with sweet butter, caramelized onion marmalade, and toasted bread.",
                            ru: "Нежнейший сливочный паштет из печени с карамелизированным луковым джемом."
                        }
                    }
                ]
            }
        ]
    },
    {
        category: { en: "Salads", ro: "Salate Proaspete", ru: "Салаты" },
        icon: "🥗",
        items: [
            { 
                id: "item-salad-turkey",
                name: { en: "Roasted turkey salad with grain mustard dressing", ro: "Salată cu curcan copt și dressing de muștar", ru: "Салат с индейкой" }, 
                price: 85, 
                weight: "320g",
                tags: [],
                description: {
                    ro: "Piept de curcan rumenit la cuptor, mix de salate crocante, semințe prăjite și dressing lejer de muștar boabe.",
                    en: "Roasted turkey breast, mixed crisp greens, toasted seeds, and whole-grain mustard vinaigrette.",
                    ru: "Запеченная индейка, хрустящий микс салатов и заправка из зернистой горчицы."
                }
            },
            { 
                id: "item-salad-octopus",
                name: { en: "Mediterranean Octopus salad with baby potatoes", ro: "Salată mediteraneană cu caracatiță", ru: "Салат с осьминогом" }, 
                price: 190, 
                weight: "300g",
                tags: ["signature", "fish"],
                description: {
                    ro: "Tentacule fragede de caracatiță fripte la plită, cartofi noi rumeniți, roșii uscate și sos verde de ierburi.",
                    en: "Tender grilled octopus tentacles, roasted baby potatoes, sun-dried tomatoes, and herb salsa verde.",
                    ru: "Нежнейший осьминог на гриле, молодой картофель, вяленые томаты и соус из свежих трав."
                }
            },
            { 
                id: "item-salad-avocado-goat",
                name: { en: "Salad with avocado, goat cheese and fresh strawberries", ro: "Salată cu avocado, brânză de capră și căpșuni", ru: "Салат с авокадо, козий сыр, клубника" }, 
                price: 80, 
                weight: "280g",
                tags: ["vegetarian"],
                description: {
                    ro: "Frunze proaspete de spanac și rucola, felii de avocado copt, brânză moale de capră și căpșuni aromate.",
                    en: "Fresh spinach and arugula, ripe avocado slices, soft goat cheese, and fragrant strawberries.",
                    ru: "Шпинат и руккола, спелый авокадо, нежный козий сыр и свежая клубника."
                }
            },
            { 
                id: "item-salad-tomato-feta",
                name: { en: "Heirloom tomato and feta salad with basil oil", ro: "Salată cu roșii de grădină și telemea de fermă", ru: "Салат с помидорами и брынзой" }, 
                price: 65, 
                weight: "310g",
                tags: ["vegetarian"],
                description: {
                    ro: "Roșii dulci de grădină în diverse culori, telemea cremoasă de oi, ceapă roșie și ulei extravirgin cu busuioc.",
                    en: "Juicy heirloom tomatoes, sheep's milk feta, red onion, and fresh basil-infused extra virgin oil.",
                    ru: "Сочные фермерские томаты, овечья брынза, ялтинский лук и базиликовое оливковое масло."
                }
            }
        ]
    },
    {
        category: { en: "Soups", ro: "Supe & Borșuri", ru: "Супы" },
        icon: "🍲",
        items: [
            { 
                id: "item-soup-pea",
                name: { en: "Sweet green pea soup with crispy bacon", ro: "Supă cremă de mazăre verde cu bacon crocant", ru: "Суп из зеленого горошка с беконом" }, 
                price: 70, 
                weight: "350ml",
                tags: [],
                description: {
                    ro: "Supă fină catifelată din mazăre tânără și smântână dulce, servită cu fâșii crocante de bacon.",
                    en: "Velvety sweet green pea soup with a touch of cream, garnished with crispy bacon crisps.",
                    ru: "Нежный крем-суп из молодого горошка со сливками и хрустящим беконом."
                }
            },
            { 
                id: "item-soup-borscht",
                name: { en: "Traditional rich Borscht with veal and sourdough bread", ro: "Borș tradițional moldovenesc cu vițel și smântână", ru: "Борщ с телятиной" }, 
                price: 65, 
                weight: "380ml",
                tags: ["signature"],
                description: {
                    ro: "Borș aromat preparat după rețetă de familie cu vițel fraged, sfeclă rumenită, servit cu smântână grasă și ardei iute.",
                    en: "Hearty traditional beet borscht simmered with tender veal, served with sour cream and hot pepper.",
                    ru: "Наваристый домашний борщ с нежной телятиной, поданный со сметаной и чесночным хлебом."
                }
            },
            { 
                id: "item-soup-ukha",
                name: { en: "Clear Ukha fish soup with salmon and vegetables", ro: "Ciorbă de pește (Uha) cu somon și legume", ru: "Уха царская" }, 
                price: 70, 
                weight: "360ml",
                tags: ["fish"],
                description: {
                    ro: "Supă limpede și aromată din pește nobil, bucăți de somon proaspăt, mărar și rădăcinoase coapte.",
                    en: "Clear flavorful fish broth with chunks of salmon, fresh dill, and roasted root vegetables.",
                    ru: "Прозрачная уха из благородной рыбы с кусочками семги и свежей зеленью."
                }
            },
            { 
                id: "item-soup-cheese-mushrooms",
                name: { en: "Creamy cheese soup with forest mushrooms", ro: "Supă de brânză fină cu ciuperci de pădure", ru: "Сырный суп с грибами" }, 
                price: 65, 
                weight: "350ml",
                tags: ["vegetarian"],
                description: {
                    ro: "Supă cremoasă din trei feluri de brânzeturi topite cu ciuperci sotate în unt și crutoane crocante.",
                    en: "Rich melted three-cheese cream soup topped with butter-seared wild mushrooms and croutons.",
                    ru: "Сливочный суп из трех видов сыра с лесными грибами и золотистыми сухариками."
                }
            }
        ]
    },
    {
        category: { en: "Hot Dishes with Side", ro: "Feluri principale cu garnitură", ru: "Горячие блюда с гарниром" },
        icon: "🥩",
        items: [
            { 
                id: "item-beef-cheeks",
                name: { en: "Slow-braised beef cheeks with potato mash", ro: "Fălci de vită la cuptor 8h cu piure mătăsos", ru: "Говяжьи щеки с пюре" }, 
                price: 120, 
                weight: "380g",
                tags: ["signature"],
                description: {
                    ro: "Fălci de vită fragede gătite lent 8 ore în reducție de vin roșu, piure cremos și morcovi caramelizați.",
                    en: "Tender beef cheeks braised for 8 hours in red wine reduction, potato puree, and glazed baby carrots.",
                    ru: "Томленые 8 часов говяжьи щечки в винном соусе с нежным картофельным пюре."
                }
            },
            { 
                id: "item-chicken-kiev",
                name: { en: "Chicken Kiev cutlet with herb butter & puree", ro: "Pârjoală a la Kiev cu unt aromat și piure", ru: "Котлета по-Киевски" }, 
                price: 120, 
                weight: "360g",
                tags: ["signature"],
                description: {
                    ro: "Piept de pui fraged în crustă crocantă aurie, umplut cu unt fin aromat cu verdețuri, servit cu piure.",
                    en: "Crispy breaded chicken cutlet filled with fragrant melting herb butter, served with potato mash.",
                    ru: "Сочная котлета по-киевски с хрустящей корочкой и ароматным сливочным маслом внутри."
                }
            },
            { 
                id: "item-turkey-risotto",
                name: { en: "Tender turkey with creamy saffron risotto", ro: "Curcan fraged cu risotto cremos", ru: "Индейка с ризотто" }, 
                price: 120, 
                weight: "350g",
                tags: [],
                description: {
                    ro: "File de curcan rumenit la perfecțiune pe pat de risotto cremos cu parmezan și șofran.",
                    en: "Pan-roasted turkey tenderloin served over creamy parmesan saffron risotto.",
                    ru: "Филе индейки с нежным сливочным ризотто и выдержанным пармезаном."
                }
            },
            { 
                id: "item-rabbit-vegetables",
                name: { en: "Braised rabbit with seasonal root vegetables", ro: "Iepure înăbușit cu legume de sezon", ru: "Кролик с овощами" }, 
                price: 145, 
                weight: "360g",
                tags: [],
                description: {
                    ro: "Carne fragedă de iepure gătită la foc mic cu cimbrișor, smântână dulce și legume coapte.",
                    en: "Succulent rabbit meat slow-cooked with fresh thyme, light cream, and roasted vegetables.",
                    ru: "Нежное мясо кролика, тушенное со сливками, тимьяном и сезонными овощами."
                }
            },
            { 
                id: "item-gnocchi-truffle",
                name: { en: "Artisan gnocchi with rich black truffle sauce", ro: "Gnocchi artizanali cu sos de trufe negre", ru: "Ньоки с трюфельным соусом" }, 
                price: 80, 
                weight: "290g",
                tags: ["signature", "vegetarian"],
                description: {
                    ro: "Gnocchi pufoși din cartofi făcuți în casă, învăluiți într-un sos catifelat de trufe negre și parmezan.",
                    en: "Fluffy handmade potato gnocchi tossed in a decadent black truffle and parmesan cream sauce.",
                    ru: "Домашние картофельные ньокки в бархатистом трюфельном соусе с пармезаном."
                }
            },
            { 
                id: "item-baked-mackerel",
                name: { en: "Baked mackerel with roasted young potatoes", ro: "Macrou copt la cuptor cu cartofi noi", ru: "Скумбрия запеченная с молодым картофелем" }, 
                price: 110, 
                weight: "350g",
                tags: ["fish"],
                description: {
                    ro: "Macrou marinat cu lămâie și rozmarin, copt până la rumenire, servit cu cartofi noi la cuptor.",
                    en: "Whole baked mackerel seasoned with lemon and rosemary, served with roasted baby potatoes.",
                    ru: "Скумбрия с лимоном и розмарином, запеченная с молодым картофелем."
                }
            }
        ]
    },
    {
        category: { en: "Desserts", ro: "Deserturi Artizanale", ru: "Десерты" },
        icon: "🍰",
        items: [
            { 
                id: "item-napoleon",
                name: { en: "Classic Napoleon with Bourbon vanilla cream", ro: "Napoleon clasic cu cremă de vanilie Bourbon", ru: "Наполеон" }, 
                price: 110, 
                weight: "190g",
                tags: ["signature", "bakery"],
                description: {
                    ro: "Mii de foi fine caramelizate, cremă mătăsoasă de vanilie de Bourbon și zmeură proaspătă.",
                    en: "Crisp caramelized puff layers with rich Bourbon vanilla cream and fresh raspberries.",
                    ru: "Хрустящие карамелизированные коржи с кремом из натуральной ванили и малиной."
                }
            },
            { 
                id: "item-baklava",
                name: { en: "Artisanal Baklava Tashkent with pistachios and honey", ro: "Baclava Tașkent cu fistic și miere pură", ru: "Пахлава Ташкент" }, 
                price: 150, 
                weight: "220g",
                tags: ["signature"],
                description: {
                    ro: "Zeci de foi fine unse cu unt dulce, umplute generos cu fistic persan, nucă și sirop de miere aromată.",
                    en: "Layers of whisper-thin pastry soaked in butter and flower honey, packed with pistachios.",
                    ru: "Тончайшие слои теста с персидскими фисташками, грецким орехом и цветочным медом."
                }
            }
        ]
    }
];

const translations = {
    ro: {
        navMenu: "Meniu",
        navReservations: "Rezervări",
        navAbout: "Despre Noi",
        navContact: "Contact",
        navReviews: "Recenzii",
        headerBookBtn: "Rezervă o Masă",
        
        // Hero
        heroPillTop: "Brutărie & Bucătărie Artizanală • Chișinău",
        heroTitle: "O Experiență Culinară Premium",
        heroSubtitle: "Panificație cu maia dospită lent 72 de ore, mic dejun servit toată ziua și preparate gastronomice rafinate într-o atmosferă luminoasă și călduroasă.",
        heroCta: "Explorează Meniul",
        heroResCta: "Rezervă o Masă",
        heroPill1: "Aluat cu Maia 72h",
        heroPill2: "Mic Dejun 9:00 - 21:00",
        heroPill3: "Cafea de Specialitate",
        heroPillRating: "Rating Excelent",

        // Menu Section
        menuBadge: "✦ Gastronomie & Panificație Artizanală",
        menuTitle: "Meniul Nostru Semnătură",
        menuSubtitle: "Rețete create cu ingrediente curate de la ferme partenere, aluat dospit lent cu maia și pasiune pentru arome pure.",
        searchPlaceholder: "Caută un preparat sau ingredient (ex: somon, shakshuka, burrata)...",
        filterAllDietary: "Toate Preparatele",
        tagSignature: "Specialități",
        tagVegetarian: "Vegetarian",
        tagFish: "Pește & Fructe de mare",
        tagSpicy: "Picant",
        allFilter: "Toate",
        currency: "MDL",
        reserveThisDish: "Rezervă o Masă pentru Acest Preparat",
        dishModalAllergens: "Ingrediente & Note:",

        // Footnotes
        footnotesTitle: "Note & Legendă Meniu",
        note1: "🍳 Ne bucurăm să vă servim micul dejun de la 9:00 la 21:00",
        note2: "🍽️ Meniul principal este servit de la 12:00 la 23:00",
        note3: "🌶️ — preparat picant sau condimentat",
        note4: "🐟 — atenție: poate conține oase de pește",
        note5: "🧄 — conține usturoi proaspăt",
        note6: "⏱️ — prepararea durează mai mult de 25 minute",
        note7: "🌱 Dacă aveți alergii sau preferințe alimentare, vă rugăm să ne anunțați",

        // Reservations
        resBadge: "✦ Ospitalitate Dedicată",
        resTitle: "Faceți o Rezervare",
        resSubtitle: "Rezervați o masă pentru a vă bucura de o experiență culinară de neuitat într-o ambianță caldă și luminoasă.",
        resName: "Nume și Prenume *",
        resDate: "Data Rezervării *",
        resTime: "Ora Sosirii *",
        resGuests: "Număr de persoane *",
        resSubmit: "Confirmă Rezervarea",
        resSuccessTitle: "Rezervare Confirmată!",
        resSuccessMsg: "Vă mulțumim că ați ales Crosta Kitchen Bakery. Vă așteptăm cu drag pe Strada Miron Costin 13/7.",
        resSuccessClose: "Închide",

        // Reviews (4.8 Rating)
        reviewsBadge: "✦ Experiențe Autentice",
        reviewsTitle: "Ce Spun Oaspeții Noștri",
        reviewsSubtitle: "Păreri sincere despre preparatele noastre, atmosfera caldă, deserturile artizanale și serviciul dedicat.",
        scoreBasedOn: "Bazat pe",
        scoreReviewsWord: "recenzii",
        scoreSentiment: "Excelent",
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
        newReviewPill: "NOU",

        // About
        aboutBadge: "✦ Pasiune & Tradiție",
        aboutTitle: "Povestea Noastră",
        aboutDesc: "La Crosta Kitchen Bakery, credem în crearea unor experiențe culinare memorabile. Folosim ingrediente pure pentru a vă oferi preparate rafinate, create cu pasiune și expertiză culinară.",
        pillar1Title: "Panificație cu Maia 72h",
        pillar1Desc: "Pâine și baghete artizanale dospite lent până la 72 de ore cu maia sălbatică vie, pentru o coajă crocantă, miez aerat și digestibilitate ușoară.",
        pillar2Title: "Ingrediente Curate & Locale",
        pillar2Desc: "Colaborăm direct cu mici fermieri locali pentru brânzeturi de fermă, somon de calitate, legume proaspăt recoltate și unt autentic.",
        pillar3Title: "Cafea de Origine & Ambianță",
        pillar3Desc: "Un spațiu primitor cu design scandinav pe Strada Miron Costin, arome calde de patiserie proaspătă și cafea de specialitate proaspăt prăjită.",

        // Footer
        footerTagline: "Brutărie artizanală, bucătărie rafinată și cafea de specialitate.",
        footerOpenStatus: "Deschis Zilnic: 8:00 - 22:00",
        footerTitle: "Locație & Adresă",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerAddressNote: "Parcare comodă în fața restaurantului",
        footerHoursTitle: "Program de Funcționare",
        footerBreakfastHours: "🍳 Mic Dejun: 9:00 - 21:00",
        footerMainHours: "🍽️ Meniu Principal: 12:00 - 23:00",
        footerBakeryHours: "🥖 Patiserie & Cafea: de la 8:00",
        footerRights: "Toate drepturile rezervate."
    },
    en: {
        navMenu: "Menu",
        navReservations: "Reservations",
        navAbout: "About Us",
        navContact: "Contact",
        navReviews: "Reviews",
        headerBookBtn: "Book a Table",
        
        // Hero
        heroPillTop: "Artisanal Bakery & Kitchen • Chișinău",
        heroTitle: "A Premium Dining Experience",
        heroSubtitle: "72-hour naturally fermented sourdough bakery, all-day breakfast, and refined dining in an inviting, light-filled atmosphere.",
        heroCta: "Explore Menu",
        heroResCta: "Book a Table",
        heroPill1: "72h Sourdough Bread",
        heroPill2: "Breakfast 9:00 - 21:00",
        heroPill3: "Specialty Coffee",
        heroPillRating: "Excellent Rating",

        // Menu Section
        menuBadge: "✦ Artisanal Cuisine & Bakery",
        menuTitle: "Our Signature Menu",
        menuSubtitle: "Crafted with pure ingredients from trusted farms, slow fermented sourdough, and a passion for clean, vibrant flavors.",
        searchPlaceholder: "Search for a dish or ingredient (e.g. salmon, shakshuka, burrata)...",
        filterAllDietary: "All Dishes",
        tagSignature: "Specialties",
        tagVegetarian: "Vegetarian",
        tagFish: "Fish & Seafood",
        tagSpicy: "Spicy",
        allFilter: "All",
        currency: "MDL",
        reserveThisDish: "Book a Table for this Dish",
        dishModalAllergens: "Ingredients & Notes:",

        // Footnotes
        footnotesTitle: "Menu Notes & Legend",
        note1: "🍳 We are delighted to serve breakfast from 9:00 to 21:00",
        note2: "🍽️ Main menu is served from 12:00 to 23:00",
        note3: "🌶️ — spicy or piquant dish",
        note4: "🐟 — caution: may contain fish bones",
        note5: "🧄 — contains fresh garlic",
        note6: "⏱️ — preparation takes longer than 25 minutes",
        note7: "🌱 Please inform us of any allergies or dietary restrictions",

        // Reservations
        resBadge: "✦ Dedicated Hospitality",
        resTitle: "Make a Reservation",
        resSubtitle: "Reserve your table to experience memorable dining in a welcoming and elegant setting.",
        resName: "Full Name *",
        resDate: "Reservation Date *",
        resTime: "Arrival Time *",
        resGuests: "Number of Guests *",
        resSubmit: "Confirm Reservation",
        resSuccessTitle: "Reservation Confirmed!",
        resSuccessMsg: "Thank you for choosing Crosta Kitchen Bakery. We look forward to welcoming you at Strada Miron Costin 13/7.",
        resSuccessClose: "Close",

        // Reviews (4.8 Rating)
        reviewsBadge: "✦ Authentic Impressions",
        reviewsTitle: "What Our Guests Say",
        reviewsSubtitle: "Honest feedback about our artisanal dishes, warm atmosphere, handcrafted bakery, and attentive hospitality.",
        scoreBasedOn: "Based on",
        scoreReviewsWord: "reviews",
        scoreSentiment: "Excellent",
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
        newReviewPill: "NEW",

        // About
        aboutBadge: "✦ Passion & Craft",
        aboutTitle: "Our Story",
        aboutDesc: "At Crosta Kitchen Bakery, we believe in creating memorable dining experiences. We source the finest ingredients to bring you exquisite dishes crafted with passion and culinary expertise.",
        pillar1Title: "72h Slow Sourdough",
        pillar1Desc: "Handcrafted bread and baguettes naturally fermented up to 72 hours with living wild sourdough for a crackling crust and light digestibility.",
        pillar2Title: "Clean & Local Ingredients",
        pillar2Desc: "We partner directly with regional family farms for fresh cheeses, premium salmon, daily harvested produce, and real butter.",
        pillar3Title: "Origin Coffee & Ambience",
        pillar3Desc: "A warm Scandinavian aesthetic on Strada Miron Costin, filled with the aroma of freshly baked French pastry and precision-brewed specialty coffee.",

        // Footer
        footerTagline: "Artisanal bakery, refined kitchen, and specialty coffee.",
        footerOpenStatus: "Open Daily: 8:00 - 22:00",
        footerTitle: "Location & Address",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerAddressNote: "Convenient parking right outside the entrance",
        footerHoursTitle: "Opening Hours",
        footerBreakfastHours: "🍳 Breakfast: 9:00 - 21:00",
        footerMainHours: "🍽️ Main Menu: 12:00 - 23:00",
        footerBakeryHours: "🥖 Bakery & Coffee: from 8:00",
        footerRights: "All rights reserved."
    },
    ru: {
        navMenu: "Меню",
        navReservations: "Резервация",
        navAbout: "О Нас",
        navContact: "Контакты",
        navReviews: "Отзывы",
        headerBookBtn: "Забронировать",
        
        // Hero
        heroPillTop: "Ремесленная пекарня и кухня • Кишинев",
        heroTitle: "Премиальный Гастрономический Опыт",
        heroSubtitle: "Хлеб на 72-часовой дикой закваске, завтраки весь день и авторские блюда в светлой скандинавской атмосфере.",
        heroCta: "Смотреть Меню",
        heroResCta: "Забронировать",
        heroPill1: "Хлеб на закваске 72ч",
        heroPill2: "Завтраки 9:00 - 21:00",
        heroPill3: "Спешелти кофе",
        heroPillRating: "Отличный рейтинг",

        // Menu Section
        menuBadge: "✦ Гастрономия и ремесленная выпечка",
        menuTitle: "Наше Фирменное Меню",
        menuSubtitle: "Блюда из чистых фермерских продуктов, медленная ферментация теста и любовь к чистым насыщенным вкусам.",
        searchPlaceholder: "Поиск блюда или ингредиента (напр. лосось, шакшука, буратта)...",
        filterAllDietary: "Все Блюда",
        tagSignature: "Специалитеты",
        tagVegetarian: "Вегетарианское",
        tagFish: "Рыба и морепродукты",
        tagSpicy: "Острое",
        allFilter: "Все",
        currency: "MDL",
        reserveThisDish: "Забронировать столик для этого блюда",
        dishModalAllergens: "Ингредиенты и примечания:",

        // Footnotes
        footnotesTitle: "Сноски и условные обозначения",
        note1: "🍳 Мы рады кормить Вас завтраками с 9.00 до 21.00",
        note2: "🍽️ Основное меню подается с 12.00 до 23.00",
        note3: "🌶️ — острое либо пикантное блюдо",
        note4: "🐟 — осторожно: возможны рыбьи косточки",
        note5: "🧄 — в состав входит свежий чеснок",
        note6: "⏱️ — время приготовления более 25 минут",
        note7: "🌱 Если у вас есть аллергия или предпочтения, пожалуйста, сообщите нам",

        // Reservations
        resBadge: "✦ Искреннее Гостеприимство",
        resTitle: "Забронировать Столик",
        resSubtitle: "Забронируйте столик, чтобы насладиться незабываемым ужином в теплой и уютной атмосфере.",
        resName: "Ваше Имя и Фамилия *",
        resDate: "Дата *",
        resTime: "Время *",
        resGuests: "Количество гостей *",
        resSubmit: "Подтвердить Бронь",
        resSuccessTitle: "Бронирование Подтверждено!",
        resSuccessMsg: "Спасибо, что выбрали Crosta Kitchen Bakery. С нетерпением ждем вас на ул. Мирон Костин 13/7.",
        resSuccessClose: "Закрыть",

        // Reviews (4.8 Rating)
        reviewsBadge: "✦ Впечатления Гостей",
        reviewsTitle: "Что Говорят Наши Гости",
        reviewsSubtitle: "Искренние отзывы о нашей авторской кухне, уютном интерьере, свежей выпечке и гостеприимном сервисе.",
        scoreBasedOn: "На основе",
        scoreReviewsWord: "отзывов",
        scoreSentiment: "Отлично",
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
        reviewFormText: "Ваш Отзыв / Впечатление *",
        reviewFormHighlight: "Какое блюдо или деталь рекомендуете? (необязательно)",
        reviewFormSubmit: "Опубликовать Отзыв",
        reviewSubmitting: "Публикация...",
        reviewSuccessTitle: "Отзыв Принят!",
        reviewSuccessMsg: "Искренне благодарим вас за отзыв и за то, что помогаете нам становиться лучше каждый день.",
        verifiedGuest: "Проверенный Гость",
        helpfulText: "Полезно",
        recommendsLabel: "Рекомендует",
        newReviewPill: "НОВЫЙ",

        // About
        aboutBadge: "✦ Ремесло и Любовь к Еде",
        aboutTitle: "Наша История",
        aboutDesc: "В Crosta Kitchen Bakery мы верим в создание незабываемых впечатлений. Мы используем лучшие натуральные ингредиенты, чтобы радовать вас изысканными блюдами, созданными с душой.",
        pillar1Title: "Хлеб на закваске 72 часа",
        pillar1Desc: "Ремесленный хлеб и багеты длительной 72-часовой ферментации на живой дикой закваске с хрустящей корочкой и легким усвоением.",
        pillar2Title: "Чистые Фермерские Продукты",
        pillar2Desc: "Прямое сотрудничество с региональными фермерами: свежие сыры, отборная рыба, сезонные овощи и натуральное сливочное масло.",
        pillar3Title: "Спешелти Кофе и Уют",
        pillar3Desc: "Светлое скандинавское пространство на Мирон Костин, наполненное ароматами свежей французской выпечки и свежесваренного кофе.",

        // Footer
        footerTagline: "Ремесленная пекарня, авторская кухня и спешелти кофе.",
        footerOpenStatus: "Открыто Ежедневно: 8:00 - 22:00",
        footerTitle: "Локация и Адрес",
        footerAddress: "Chișinău MD, Strada Miron Costin 13/7, MD-2000",
        footerAddressNote: "Удобная парковка прямо перед входом",
        footerHoursTitle: "Часы Работы",
        footerBreakfastHours: "🍳 Завтраки: 9:00 - 21:00",
        footerMainHours: "🍽️ Основное меню: 12:00 - 23:00",
        footerBakeryHours: "🥖 Пекарня и кофе: с 8:00",
        footerRights: "Все права защищены."
    }
};

/* ==========================================================================
   DEFAULT REVIEWS (Mathematically exactly 4.8 average: [5,5,5,5,4,5,4,5]/8 = 4.75 -> 4.8)
   ========================================================================== */
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
            ru: "Сервис в Crosta задает высочайший standard в городе. Официанты очень вежливы, знают каждую деталь меню и окружили нас искренней заботой."
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
        rating: 4,
        aspectRatings: { food: 5, interior: 5, service: 4 },
        highlight: {
            ro: "Ou poșat cu avocado și somon",
            en: "Poached egg with avocado and salmon",
            ru: "Пашот с авокадо и семгой"
        },
        comment: {
            ro: "Ouăle poșate și somonul sunt absolut delicioase, iar pâinea rumenită este superbă. În orele de vârf la prânz am așteptat câteva minute în plus comanda, însă gustul și ospitalitatea au compensat pe deplin. Recomand cu drag!",
            en: "The poached eggs and salmon are absolutely delicious, and the toasted sourdough is superb. During lunchtime rush the order took a few extra minutes, but the flavor and warm hospitality made up for it completely. Highly recommended!",
            ru: "Яйца пашот и семга великолепны, а хрустящий хлеб на высоте. В обеденный час пик пришлось немного подождать подачу, но вкус блюд и вежливость команды полностью сгладили ожидание. С удовольствием рекомендую!"
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
        rating: 4,
        aspectRatings: { food: 5, interior: 4, service: 5 },
        highlight: {
            ro: "Stracciatella cu ardei copt și ciabatta",
            en: "Stracciatella with baked pepper and ciabatta",
            ru: "Страчателла с печеным перцем"
        },
        comment: {
            ro: "Stracciatella proaspătă cu ardei copt este un deliciu, iar porțiile sunt echilibrate. Interiorul este plăcut, deși în zona de lângă intrare a fost o ușoară agitație. În rest, mâncarea și cafeaua sunt ireproșabile.",
            en: "The fresh stracciatella with roasted pepper is a treat, and portions are well-balanced. Pleasant atmosphere, though near the doorway it was slightly busy. Overall, food and coffee are top notch.",
            ru: "Свежая страчателла с печеным перцем — восторг, баланс вкусов на высоте. Интерьер приятный, хотя возле входа было чуть суетливо. В остальном кухня и кофе безупречны."
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

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */
function getCurrentLang() {
    return localStorage.getItem('preferredLang') || 'ro';
}

function getUserReviews() {
    try {
        const saved = localStorage.getItem('crosta_user_reviews');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveUserReviews(reviews) {
    try {
        localStorage.setItem('crosta_user_reviews', JSON.stringify(reviews));
    } catch (e) {}
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
    } catch (e) {}
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

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   RENDER MENU & SEARCH & FILTERS (Pure Typography, No Meal Photos)
   ========================================================================== */
function setMenuFilter(catKey) {
    currentMenuFilter = catKey;
    renderMenu(getCurrentLang());
}

function setDietaryFilter(dietaryTag) {
    currentDietaryFilter = dietaryTag;
    document.querySelectorAll('.dietary-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-dietary') === dietaryTag);
    });
    renderMenu(getCurrentLang());
}

function handleMenuSearch(query) {
    currentMenuSearchQuery = (query || '').trim().toLowerCase();
    const clearBtn = document.getElementById('search-clear-btn');
    if (clearBtn) {
        clearBtn.style.display = currentMenuSearchQuery.length > 0 ? 'block' : 'none';
    }
    renderMenu(getCurrentLang());
}

function clearMenuSearch() {
    const input = document.getElementById('menu-search-input');
    if (input) input.value = '';
    handleMenuSearch('');
}

function matchesSearchAndDietary(item, lang) {
    // Dietary filter
    if (currentDietaryFilter !== 'all') {
        if (!item.tags || !item.tags.includes(currentDietaryFilter)) return false;
    }

    // Search query
    if (currentMenuSearchQuery) {
        const nameRo = (item.name.ro || '').toLowerCase();
        const nameEn = (item.name.en || '').toLowerCase();
        const nameRu = (item.name.ru || '').toLowerCase();
        const descRo = (item.description?.ro || '').toLowerCase();
        const descEn = (item.description?.en || '').toLowerCase();
        const descRu = (item.description?.ru || '').toLowerCase();
        
        const q = currentMenuSearchQuery;
        if (!nameRo.includes(q) && !nameEn.includes(q) && !nameRu.includes(q) &&
            !descRo.includes(q) && !descEn.includes(q) && !descRu.includes(q)) {
            return false;
        }
    }

    return true;
}

function renderMenu(lang) {
    const filtersContainer = document.getElementById('menu-filters');
    const menuContainer = document.getElementById('dynamic-menu');
    if (!menuContainer) return;

    // Render Category tabs
    if (filtersContainer) {
        let filtersHtml = `
            <button class="filter-btn ${currentMenuFilter === 'All' ? 'active' : ''}" onclick="setMenuFilter('All')">
                ${translations[lang].allFilter}
            </button>
        `;
        menuData.forEach(cat => {
            const catKey = cat.category.en;
            const catName = cat.category[lang];
            const isActive = currentMenuFilter === catKey ? 'active' : '';
            const icon = cat.icon || '';
            filtersHtml += `<button class="filter-btn ${isActive}" onclick="setMenuFilter('${catKey.replace(/'/g, "\\'")}')">${icon} ${catName}</button>`;
        });
        filtersContainer.innerHTML = filtersHtml;
    }

    let html = '';
    let totalRenderedItems = 0;

    menuData.forEach(cat => {
        const catKey = cat.category.en;
        if (currentMenuFilter !== 'All' && currentMenuFilter !== catKey) return;

        let categoryHasItems = false;
        let catHtml = `<div class="menu-category-block">`;
        catHtml += `<h3 class="category-title">${cat.icon || ''} ${cat.category[lang]}</h3>`;

        if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
                const filteredItems = sub.items.filter(item => matchesSearchAndDietary(item, lang));
                if (filteredItems.length > 0) {
                    categoryHasItems = true;
                    totalRenderedItems += filteredItems.length;
                    catHtml += `
                        <div class="subcategory-wrapper">
                            <h4 class="subcategory-title">
                                <span>${sub.name[lang]}</span>
                                <span class="sub-count" style="font-size: 0.8rem; font-weight: 500; color: var(--color-text-muted); font-family: var(--font-body);">${filteredItems.length} preparate</span>
                            </h4>
                            <div class="menu-list-grid">
                    `;
                    filteredItems.forEach(item => {
                        catHtml += renderMenuItemRow(item, lang, cat.category[lang]);
                    });
                    catHtml += `</div></div>`;
                }
            });
        } else if (cat.items) {
            const filteredItems = cat.items.filter(item => matchesSearchAndDietary(item, lang));
            if (filteredItems.length > 0) {
                categoryHasItems = true;
                totalRenderedItems += filteredItems.length;
                catHtml += `<div class="menu-list-grid">`;
                filteredItems.forEach(item => {
                    catHtml += renderMenuItemRow(item, lang, cat.category[lang]);
                });
                catHtml += `</div>`;
            }
        }

        catHtml += `</div>`;
        if (categoryHasItems) {
            html += catHtml;
        }
    });

    if (totalRenderedItems === 0) {
        html = `
            <div class="no-menu-results">
                <div class="no-results-icon">🔍</div>
                <h3 style="font-family: var(--font-heading); color: var(--color-primary); margin-bottom: 0.5rem;">Nu am găsit preparate conform criteriilor</h3>
                <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Încercați un alt termen de căutare sau resetați filtrele.</p>
                <button type="button" class="cta-button" onclick="clearMenuSearch(); setDietaryFilter('all'); setMenuFilter('All');">Resetează Filtrele</button>
            </div>
        `;
    }

    menuContainer.innerHTML = html;
}

function renderMenuItemRow(item, lang, categoryName) {
    const itemName = item.name[lang] || item.name.ro;
    const itemDesc = item.description ? (item.description[lang] || item.description.ro) : '';
    const safeName = itemName.replace(/'/g, "\\'");
    const clickAttr = `onclick="openDishDetails('${item.id || ''}')"`;

    let tagBadges = '';
    if (item.tags) {
        if (item.tags.includes('signature')) tagBadges += '<span class="item-tag-pill signature" title="Rețetă Semnătură">⭐ Semnătură</span> ';
        if (item.tags.includes('vegetarian')) tagBadges += '<span class="item-tag-pill veg" title="Vegetarian">🌱 Vegetarian</span> ';
        if (item.tags.includes('fish')) tagBadges += '<span class="item-tag-pill fish" title="Pește">🐟 Pește</span> ';
        if (item.tags.includes('spicy')) tagBadges += '<span class="item-tag-pill spicy" title="Picant">🌶️ Picant</span> ';
    }

    return `
        <div class="menu-item-row is-clickable" ${clickAttr}>
            <div class="item-main-line">
                <div class="item-info">
                    <span class="item-name">${itemName}</span>
                    ${tagBadges}
                </div>
                <span class="item-dots"></span>
                <span class="item-price">${item.price} <span class="currency">${translations[lang].currency}</span></span>
            </div>
            <div class="item-sub-line">
                <p class="item-desc">${itemDesc}</p>
                <div class="item-meta-badges">
                    ${item.weight ? `<span class="item-weight-badge">${item.weight}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

/* ==========================================================================
   DISH DETAILS MODAL (Pure Typography & Culinary Notes, No Photos)
   ========================================================================== */
function findDishById(dishId) {
    for (const cat of menuData) {
        if (cat.items) {
            const found = cat.items.find(i => i.id === dishId);
            if (found) return { ...found, categoryName: cat.category };
        }
        if (cat.subcategories) {
            for (const sub of cat.subcategories) {
                const found = sub.items.find(i => i.id === dishId);
                if (found) return { ...found, categoryName: cat.category, subcategoryName: sub.name };
            }
        }
    }
    return null;
}

function openDishDetails(dishId) {
    const dish = findDishById(dishId);
    if (!dish) return;

    const lang = getCurrentLang();
    const modal = document.getElementById('dish-modal');
    const catEl = document.getElementById('dish-modal-category');
    const titleEl = document.getElementById('dish-modal-title');
    const priceEl = document.getElementById('dish-modal-price');
    const weightEl = document.getElementById('dish-modal-weight');
    const descEl = document.getElementById('dish-modal-description');
    const tagsEl = document.getElementById('dish-modal-tags');
    const allergensEl = document.getElementById('dish-modal-allergens');
    const allergensWrap = document.getElementById('dish-modal-allergens-wrap');

    if (catEl) {
        const cName = dish.categoryName ? (dish.categoryName[lang] || dish.categoryName.ro) : '';
        const subName = dish.subcategoryName ? ` • ${dish.subcategoryName[lang] || dish.subcategoryName.ro}` : '';
        catEl.textContent = `${cName}${subName}`;
    }

    titleEl.textContent = dish.name[lang] || dish.name.ro;
    priceEl.textContent = `${dish.price} ${translations[lang].currency}`;
    weightEl.textContent = dish.weight ? `• ${dish.weight}` : '';
    descEl.textContent = dish.description ? (dish.description[lang] || dish.description.ro) : '';

    if (tagsEl) {
        let tagHtml = '';
        if (dish.tags) {
            dish.tags.forEach(t => {
                const label = t === 'signature' ? '⭐ Specialitate Semnătură' : t === 'vegetarian' ? '🌱 Vegetarian' : t === 'fish' ? '🐟 Pește & Seafood' : t === 'spicy' ? '🌶️ Picant' : t;
                tagHtml += `<span class="sig-tag-mini">${label}</span>`;
            });
        }
        tagsEl.innerHTML = tagHtml;
    }

    if (allergensEl && allergensWrap) {
        if (dish.allergens) {
            allergensEl.textContent = dish.allergens[lang] || dish.allergens.ro;
            allergensWrap.style.display = 'block';
        } else {
            allergensWrap.style.display = 'none';
        }
    }

    if (modal) modal.style.display = 'flex';
}

function closeDishModal() {
    const modal = document.getElementById('dish-modal');
    if (modal) modal.style.display = 'none';
}

function reserveForDish() {
    closeDishModal();
    const resSec = document.getElementById('reservations');
    if (resSec) resSec.scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================================================
   REVIEWS MODULE (4.8 RATING ENGINE)
   ========================================================================== */
let currentReviewFilter = 'all';
let showAllReviews = false;
const reviewsPerPage = 6;
let currentFormRating = 5;
let currentFormCategory = 'food';
let currentAspectRatings = { food: 5, interior: 5, service: 5 };

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

function renderScoreStarsVisual(score) {
    const container = document.getElementById('reviews-stars-visual');
    if (!container) return;
    const s = Number(score) || 4.8;
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (s >= i) {
            html += '<span class="star-gold">★</span>';
        } else if (s > i - 1) {
            const fillPct = Math.round((s - (i - 1)) * 100);
            html += `<span class="star-partial" style="--fill: ${fillPct}%">★</span>`;
        } else {
            html += '<span class="star-empty">★</span>';
        }
    }
    container.innerHTML = html;
}

function renderReviews(lang) {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    const allReviews = getAllReviews();
    const likedList = getLikedReviews();

    // 1. Calculate overall score: mathematically exactly 4.8
    const totalCount = allReviews.length;
    const overallScore = totalCount > 0 
        ? (allReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / totalCount) 
        : 4.8;

    const avgScoreEl = document.getElementById('reviews-avg-score');
    const totalCountEl = document.getElementById('reviews-total-count');
    if (avgScoreEl) avgScoreEl.textContent = overallScore.toFixed(1);
    if (totalCountEl) totalCountEl.textContent = totalCount;

    // Render precise fractional stars (4.8 stars)
    renderScoreStarsVisual(overallScore);

    // 2. Category ratings and progress bars
    const categories = ['food', 'interior', 'service', 'bakery', 'atmosphere'];
    const baselineDefaults = { food: 4.8, interior: 4.8, service: 4.7, bakery: 4.9, atmosphere: 4.8 };

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

    // 3. Filter button active states
    document.querySelectorAll('.review-filter-btn').forEach(btn => {
        const filterVal = btn.getAttribute('data-filter');
        btn.classList.toggle('active', filterVal === currentReviewFilter);
    });

    // 4. Filter reviews by selected category
    const filteredReviews = currentReviewFilter === 'all'
        ? allReviews
        : allReviews.filter(r => r.category === currentReviewFilter);

    // Pagination slice
    const reviewsToDisplay = showAllReviews 
        ? filteredReviews 
        : filteredReviews.slice(0, reviewsPerPage);

    // 5. Generate Review Cards HTML
    const categoryLabels = {
        food: translations[lang].catFood,
        interior: translations[lang].catInterior,
        service: translations[lang].catService,
        bakery: translations[lang].catBakery,
        atmosphere: translations[lang].catAtmosphere
    };

    let cardsHtml = '';
    reviewsToDisplay.forEach(rev => {
        const isLiked = likedList.includes(rev.id);
        const avatarInitial = rev.avatar || getInitials(rev.author);
        const formattedDate = formatReviewDate(rev.date, lang);
        const starsHtml = renderStars(rev.rating);
        const catLabel = categoryLabels[rev.category] || rev.category;

        const commentText = (typeof rev.comment === 'object' && rev.comment !== null)
            ? (rev.comment[lang] || rev.comment.ro || '')
            : (rev.comment || '');

        let highlightHtml = '';
        if (rev.highlight) {
            const highlightText = (typeof rev.highlight === 'object' && rev.highlight !== null)
                ? (rev.highlight[lang] || rev.highlight.ro || '')
                : rev.highlight;

            if (highlightText) {
                highlightHtml = `
                    <div class="review-highlight-box">
                        <span class="highlight-label">✨ ${translations[lang].recommendsLabel}:</span>
                        <span>"${highlightText}"</span>
                    </div>
                `;
            }
        }

        let aspectsHtml = '';
        if (rev.aspectRatings && Object.keys(rev.aspectRatings).length > 0) {
            aspectsHtml += '<div class="review-aspects-chips">';
            for (const [aspKey, aspVal] of Object.entries(rev.aspectRatings)) {
                const aspName = categoryLabels[aspKey] || aspKey;
                aspectsHtml += `<span class="aspect-chip">${aspName}: <strong>${aspVal}★</strong></span>`;
            }
            aspectsHtml += '</div>';
        }

        const isNewClass = rev.isUserSubmitted ? ' is-new' : '';

        cardsHtml += `
            <div class="review-card${isNewClass}" data-id="${rev.id}">
                <div class="review-card-top">
                    <div class="review-card-header">
                        <div class="review-author-info">
                            <div class="review-avatar">${avatarInitial}</div>
                            <div class="review-author-text">
                                <h4>
                                    ${rev.author}
                                    <span class="verified-icon" title="${translations[lang].verifiedGuest}">✓</span>
                                </h4>
                                <span class="review-date">${formattedDate}</span>
                            </div>
                        </div>
                        <div class="review-header-badges">
                            <div class="review-card-rating" aria-label="${rev.rating} din 5 stele">
                                ${starsHtml}
                            </div>
                            <span class="review-category-pill">${catLabel}</span>
                        </div>
                    </div>

                    ${highlightHtml}

                    <p class="review-comment">"${commentText}"</p>
                    ${aspectsHtml}
                </div>

                <div class="review-card-footer">
                    <button type="button" class="review-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLikeReview('${rev.id}')">
                        <span class="heart-icon">${isLiked ? '❤️' : '🤍'}</span>
                        <span class="like-label">${translations[lang].helpfulText}</span>
                        <span class="like-count">(${rev.likes || 0})</span>
                    </button>
                </div>
            </div>
        `;
    });

    grid.innerHTML = cardsHtml;

    // 6. Pagination button visibility
    const paginContainer = document.getElementById('reviews-pagination');
    const loadMoreText = document.getElementById('load-more-text');
    if (paginContainer && loadMoreText) {
        if (filteredReviews.length > reviewsPerPage) {
            paginContainer.style.display = 'block';
            loadMoreText.textContent = showAllReviews 
                ? translations[lang].showLessReviews 
                : `${translations[lang].loadMoreReviews} (${filteredReviews.length - reviewsPerPage})`;
        } else {
            paginContainer.style.display = 'none';
        }
    }
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

/* ==========================================================================
   REVIEW MODAL & SUBMISSION
   ========================================================================== */
function openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.style.display = 'flex';
        setStarRating(5);
        selectReviewCategory('food');
    }
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
        showToast("Mulțumim pentru apreciere!");
    }
    saveLikedReviews(newLiked);

    const userReviews = getUserReviews();
    const userRevIndex = userReviews.findIndex(r => r.id === reviewId);
    if (userRevIndex !== -1) {
        userReviews[userRevIndex].likes = Math.max(0, (userReviews[userRevIndex].likes || 0) + (isLiked ? -1 : 1));
        saveUserReviews(userReviews);
    } else {
        const defRev = defaultReviews.find(r => r.id === reviewId);
        if (defRev) {
            defRev.likes = Math.max(0, (defRev.likes || 0) + (isLiked ? -1 : 1));
        }
    }

    renderReviews(getCurrentLang());
}

function initReviewForm() {
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

    document.querySelectorAll('.mini-stars').forEach(container => {
        const aspect = container.getAttribute('data-aspect');
        container.querySelectorAll('.mini-star').forEach(star => {
            star.addEventListener('click', () => {
                const val = Number(star.getAttribute('data-val'));
                setMiniStarRating(aspect, val);
            });
        });
    });

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

            const currentUsers = getUserReviews();
            currentUsers.unshift(newReview);
            saveUserReviews(currentUsers);

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
                console.warn('Backend notification notice:', err);
            }

            form.reset();
            closeReviewModal();
            openReviewSuccessModal();
            renderReviews(lang);

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
}

/* ==========================================================================
   LANGUAGE SWITCHER & INITIALIZATION
   ========================================================================== */
function setLanguage(lang) {
    if (!translations[lang]) lang = 'ro';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });
    
    document.documentElement.lang = lang;

    renderMenu(lang);
    renderReviews(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    localStorage.setItem('preferredLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const savedLang = localStorage.getItem('preferredLang') || 'ro';
    setLanguage(savedLang);

    initReviewForm();

    const resDateInput = document.getElementById('res-date');
    if (resDateInput) {
        const today = new Date().toISOString().split('T')[0];
        resDateInput.min = today;
        resDateInput.value = today;
    }

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar nav a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar) navbar.classList.remove('nav-open');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeDishModal();
            closeReviewModal();
            closeReviewSuccessModal();
            if (navbar) navbar.classList.remove('nav-open');
        }
    });

    const backToTopBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', scrollY > 400);
        }

        const heroImage = document.querySelector('.hero-image');
        if (heroImage && scrollY < 800) {
            heroImage.style.transform = `translateY(${scrollY * 0.35}px)`;
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 220)) {
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

    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = resForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Se trimite...';
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
                    document.getElementById('res-success-modal').style.display = 'flex';
                    resForm.reset();
                    showToast("Rezervare recepționată cu succes!");
                } else {
                    const errorData = await response.json();
                    alert(`Eroare: ${errorData.error || errorData.message || 'Eroare necunoscută'}`);
                }
            } catch (error) {
                alert('Eroare de conexiune. Vă rugăm să încercați din nou.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

function closeModal() {
    const modal = document.getElementById('res-success-modal');
    if (modal) modal.style.display = 'none';
}

function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('nav-open');
}
