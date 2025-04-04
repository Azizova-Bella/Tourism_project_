"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
type Language = "en" | "ru" | "tj"

// Translation context type
type TranslationContextType = {
  t: (key: string) => string
  language: Language
  setLanguage: (lang: Language) => void
}

// Create context with default values
const TranslationContext = createContext<TranslationContextType>({
  t: (key) => key,
  language: "en",
  setLanguage: () => {},
})

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    home: "Home",
    culture: "Culture",
    catalog: "Catalog",
    gallery: "Gallery",
    contact: "Contact",
    search: "Search",
    learn_more: "Learn More",
    view_details: "View Details",
    book_now: "Book Now",
    send: "Send",
    sending: "Sending...",
    cancel: "Cancel",
    all_rights_reserved: "All rights reserved.",
    
    // Home page
    welcome_to_tajikistan: "Welcome to Tajikistan",
    tajikistan_intro: "Discover the hidden gem of Central Asia with breathtaking mountains, rich cultural heritage, and warm hospitality.",
    discover_more: "Discover More",
    featured_destinations: "Featured Destinations",
    featured_destinations_description: "Explore the most beautiful and popular destinations in Tajikistan.",
    travel_packages: "Travel Packages",
    travel_packages_description: "Choose from our carefully crafted travel packages for an unforgettable experience.",
    what_travelers_say: "What Travelers Say",
    testimonials_description: "Read reviews from travelers who have experienced the beauty of Tajikistan.",
    
    // Slider
    explore_tajikistan: "Explore Tajikistan",
    explore_tajikistan_subtitle: "Discover Festivals & Culture",
    discover_tajikistan: "Discover Tajikistan",
    mountains_culture_tradition: "Mountains, Culture & Tradition",
    taste_national_cuisine: "Taste the National Cuisine",
    delicious_dishes_await: "Delicious Dishes Await You",
    contact_us: "Contact Us",
    packages: "Packages",
    explore_now: "Explore Now",
    view_packages: "View Packages",
    reserve_table: "Reserve Table",
    view_menu: "View Menu",
    
    // Culture page
    tajik_culture: "Tajik Culture & Heritage",
    culture_intro: "Experience the rich traditions and vibrant cultural heritage of Tajikistan",
    cultural_heritage: "Cultural Heritage",
    festivals_celebrations: "Festivals & Celebrations",
    traditions: "Traditions",
    cuisine: "Cuisine",
    music_dance: "Music & Dance",
    crafts: "Traditional Crafts",
    traditions_description: "Tajik traditions reflect centuries of history, with customs passed down through generations.",
    cuisine_description: "Tajik cuisine features delicious dishes like plov, shashlik, and traditional bread.",
    music_dance_description: "Traditional music and dance are integral to Tajik culture, with unique instruments and colorful performances.",
    crafts_description: "Tajik artisans create beautiful handicrafts including embroidery, carpets, and pottery.",
    navruz: "Navruz",
    mehrgon: "Mehrgon",
    independence_day: "Independence Day",
    navruz_description: "The Persian New Year celebration marking the spring equinox with feasts and festivities.",
    mehrgon_description: "An ancient autumn harvest festival with music, dance, and traditional foods.",
    independence_day_description: "Celebrating Tajikistan's independence with parades, concerts, and fireworks.",
    
    // Catalog page
    destinations_catalog: "Destinations Catalog",
    search_destinations: "Search destinations...",
    select_region: "Select Region",
    all_regions: "All Regions",
    gbao: "GBAO",
    sughd: "Sughd",
    central: "Central Region",
    khatlon: "Khatlon",
    no_destinations_found: "No destinations found matching your criteria.",
    pamir_mountains: "Pamir Mountains",
    fann_mountains: "Fann Mountains",
    iskanderkul: "Iskanderkul Lake",
    dushanbe: "Dushanbe",
    khujand: "Khujand",
    wakhan_corridor: "Wakhan Corridor",
    pamir_description: "Known as the 'Roof of the World', the Pamir Mountains offer breathtaking landscapes and unique cultural experiences.",
    fann_description: "The Fann Mountains feature stunning turquoise lakes and dramatic peaks perfect for hiking and photography.",
    iskanderkul_description: "A beautiful alpine lake named after Alexander the Great, surrounded by mountains and waterfalls.",
    dushanbe_description: "Tajikistan's capital city with modern amenities, museums, and beautiful parks.",
    khujand_description: "One of Central Asia's oldest cities with rich history and vibrant bazaars.",
    wakhan_description: "A remote corridor with spectacular views, ancient fortresses, and traditional villages.",
    
    // Travel packages
    cultural_heritage_tour: "Cultural Heritage Tour",
    pamir_highway_adventure: "Pamir Highway Adventure",
    silk_road_expedition: "Silk Road Expedition",
    "7_days": "7 Days",
   " 10_days": "10 Days",
   " 12_days": "12 Days",
    max_8_people: "Max 8 People",
    max_10_people: "Max 10 People",
    max_12_people: "Max 12 People",
    monthly_departures: "Monthly Departures",
    june_to_september: "June to September",
    april_to_october: "April to October",
    cultural_tour_description: "Explore Tajikistan's rich cultural heritage with visits to historical sites, traditional villages, and cultural performances.",
    pamir_highway_description: "Adventure along the legendary Pamir Highway with breathtaking mountain views, remote villages, and unique cultural experiences.",
    silk_road_description: "Follow the ancient Silk Road through Tajikistan, visiting historical sites, markets, and experiencing local traditions.",
    
    // Gallery page
    tajikistan_gallery: "Tajikistan Gallery",
    select_category: "Select Category",
    all_categories: "All Categories",
    nature: "Nature",
    cities: "Cities",
    culture: "Culture",
    historical: "Historical",
    no_images_found: "No images found for the selected category.",
    
    // Contact page
    send_us_message: "Send Us a Message",
    contact_form_description: "We'd love to hear from you. Fill out the form below and we'll get back to you soon.",
    contact_information: "Contact Information",
    contact_info_description: "You can reach us through the following contact details.",
    name: "Name",
    surname: "Surname",
    email: "Email",
    message: "Message",
    your_name: "Your name",
    your_surname: "Your surname",
    your_email: "Your email address",
    your_message: "Your message",
    send_message: "Send Message",
    message_sent: "Message Sent",
    message_sent_description: "Thank you for contacting us. We'll respond shortly.",
    error: "Error",
    message_send_error: "Failed to send message. Please try again.",
    address: "Address",
    phone: "Phone",
    telegram_bot: "Telegram Bot",
    open_telegram_bot: "Open Telegram Bot",
    
    // Search page
    address_search: "Address Search",
    enter_address: "Please enter an address to search",
    enter_address_placeholder: "Enter address, city, or landmark...",
    address_not_found: "Address not found",
    search_history: "Search History",
    favorites: "Favorites",
    no_history: "No search history yet",
    no_favorites: "No favorites saved yet",
    added_to_favorites: "Added to favorites",
    removed_from_favorites: "Removed from favorites",
    search_error: "Error searching for location",
    
    // Footer
    footer_description: "Your ultimate guide to exploring the beautiful country of Tajikistan. Discover mountains, culture, and hospitality.",
    subscribe_newsletter: "Subscribe to Our Newsletter",
    company: "Company",
    destinations: "Destinations",
    support: "Support",
    about_us: "About Us",
    team: "Our Team",
    careers: "Careers",
    blog: "Blog",
    faq: "FAQ",
    privacy_policy: "Privacy Policy",
    terms: "Terms & Conditions",
    
    // Regions
    gbao_region: "GBAO Region",
    sughd_region: "Sughd Region",
    hisor_district: "Hisor District",
    
    // Destinations
    pamir_mountains_description: "The Pamir Mountains, known as the 'Roof of the World', offer breathtaking landscapes with snow-capped peaks, alpine lakes, and unique cultural experiences.",
    iskanderkul_lake: "Iskanderkul Lake",
    iskanderkul_description: "A stunning turquoise alpine lake named after Alexander the Great, surrounded by majestic mountains and beautiful waterfalls.",
    hisor_fortress: "Hisor Fortress",
    hisor_description: "An ancient fortress with a history spanning over 2,500 years, featuring impressive gates, a mosque, and a museum of antiquities.",
    wakhan_corridor: "Wakhan Corridor",
    wakhan_description: "A remote and spectacular valley with breathtaking mountain views, ancient fortresses, and traditional Pamiri villages.",
    
    // Testimonials
    testimonial_1: "My trip to Tajikistan was absolutely incredible. The Pamir Highway adventure exceeded all my expectations with stunning landscapes and warm hospitality from locals.",
    testimonial_2: "The Cultural Heritage Tour gave me a deep appreciation for Tajik traditions. The guides were knowledgeable and the experiences were authentic.",
    testimonial_3: "Hiking in the Fann Mountains was the highlight of my journey. The turquoise lakes are even more beautiful in person than in photos.",
    testimonial_4: "Dushanbe surprised me with its charm and the food was amazing everywhere we went. I'll definitely return to explore more of Tajikistan."
  },
  ru: {
    // General
    home: "Главная",
    culture: "Культура",
    catalog: "Каталог",
    gallery: "Галерея",
    contact: "Контакты",
    search: "Поиск",
    learn_more: "Узнать больше",
    view_details: "Подробнее",
    book_now: "Забронировать",
    send: "Отправить",
    sending: "Отправка...",
    cancel: "Отмена",
    all_rights_reserved: "Все права защищены.",
    
    // Home page
    welcome_to_tajikistan: "Добро пожаловать в Таджикистан",
    tajikistan_intro: "Откройте для себя скрытую жемчужину Центральной Азии с захватывающими горами, богатым культурным наследием и теплым гостеприимством.",
    discover_more: "Узнать больше",
    featured_destinations: "Популярные направления",
    featured_destinations_description: "Исследуйте самые красивые и популярные места в Таджикистане.",
    travel_packages: "Туристические пакеты",
    travel_packages_description: "Выберите один из наших тщательно разработанных туристических пакетов для незабываемых впечатлений.",
    what_travelers_say: "Отзывы путешественников",
    testimonials_description: "Прочитайте отзывы путешественников, которые испытали красоту Таджикистана.",
    
    // Slider
    explore_tajikistan: "Исследуйте Таджикистан",
    explore_tajikistan_subtitle: "Откройте для себя фестивали и культуру",
    discover_tajikistan: "Откройте Таджикистан",
    mountains_culture_tradition: "Горы, культура и традиции",
    taste_national_cuisine: "Попробуйте национальную кухню",
    delicious_dishes_await: "Вас ждут вкусные блюда",
    contact_us: "Свяжитесь с нами",
    packages: "Пакеты",
    explore_now: "Исследовать сейчас",
    view_packages: "Посмотреть пакеты",
    reserve_table: "Забронировать стол",
    view_menu: "Посмотреть меню",
    
    // Culture page
    tajik_culture: "Таджикская культура и наследие",
    culture_intro: "Познакомьтесь с богатыми традициями и ярким культурным наследием Таджикистана",
    cultural_heritage: "Культурное наследие",
    festivals_celebrations: "Фестивали и праздники",
    traditions: "Традиции",
    cuisine: "Кухня",
    music_dance: "Музыка и танцы",
    crafts: "Традиционные ремесла",
    traditions_description: "Таджикские традиции отражают многовековую историю, с обычаями, передаваемыми из поколения в поколение.",
    cuisine_description: "Таджикская кухня включает вкусные блюда, такие как плов, шашлык и традиционный хлеб.",
    music_dance_description: "Традиционная музыка и танцы являются неотъемлемой частью таджикской культуры, с уникальными инструментами и красочными выступлениями.",
    crafts_description: "Таджикские мастера создают красивые изделия ручной работы, включая вышивку, ковры и керамику.",
    navruz: "Навруз",
    mehrgon: "Мехргон",
    independence_day: "День Независимости",
    navruz_description: "Персидский Новый год, отмечающий весеннее равноденствие с пирами и праздниками.",
    mehrgon_description: "Древний осенний праздник урожая с музыкой, танцами и традиционными блюдами.",
    independence_day_description: "Празднование независимости Таджикистана с парадами, концертами и фейерверками.",
    
    // Catalog page
    destinations_catalog: "Каталог направлений",
    search_destinations: "Поиск направлений...",
    select_region: "Выберите регион",
    all_regions: "Все регионы",
    gbao: "ГБАО",
    sughd: "Согд",
    central: "Центральный регион",
    khatlon: "Хатлон",
    no_destinations_found: "Не найдено направлений, соответствующих вашим критериям.",
    pamir_mountains: "Памирские горы",
    fann_mountains: "Фанские горы",
    iskanderkul: "Озеро Искандеркуль",
    dushanbe: "Душанбе",
    khujand: "Худжанд",
    wakhan_corridor: "Ваханский коридор",
    pamir_description: "Известные как 'Крыша мира', Памирские горы предлагают захватывающие пейзажи и уникальный культурный опыт.",
    fann_description: "Фанские горы отличаются потрясающими бирюзовыми озерами и драматическими пиками, идеально подходящими для пеших прогулок и фотографии.",
    iskanderkul_description: "Красивое альпийское озеро, названное в честь Александра Великого, окруженное горами и водопадами.",
    dushanbe_description: "Столица Таджикистана с современными удобствами, музеями и красивыми парками.",
    khujand_description: "Один из старейших городов Центральной Азии с богатой историей и оживленными базарами.",
    wakhan_description: "Удаленный коридор с впечатляющими видами, древними крепостями и традиционными деревнями.",
    
    // Travel packages
    cultural_heritage_tour: "Тур по культурному наследию",
    pamir_highway_adventure: "Приключение на Памирском шоссе",
    silk_road_expedition: "Экспедиция по Шелковому пути",
    "7_days": "7 дней",
  "  10_days": "10 дней",
    "12_days": "12 дней",
    max_8_people: "Макс. 8 человек",
    max_10_people: "Макс. 10 человек",
    max_12_people: "Макс. 12 человек",
    monthly_departures: "Ежемесячные отправления",
    june_to_september: "С июня по сентябрь",
    april_to_october: "С апреля по октябрь",
    cultural_tour_description: "Исследуйте богатое культурное наследие Таджикистана с посещением исторических мест, традиционных деревень и культурных представлений.",
    pamir_highway_description: "Приключение по легендарному Памирскому шоссе с захватывающими горными видами, отдаленными деревнями и уникальным культурным опытом.",
    silk_road_description: "Следуйте по древнему Шелковому пути через Таджикистан, посещая исторические места, рынки и знакомясь с местными традициями.",
    
    // Gallery page
    tajikistan_gallery: "Галерея Таджикистана",
    select_category: "Выберите категорию",
    all_categories: "Все категории",
    nature: "Природа",
    cities: "Города",
    culture: "Культура",
    historical: "Исторические",
    no_images_found: "Не найдено изображений для выбранной категории.",
    
    // Contact page
    send_us_message: "Отправьте нам сообщение",
    contact_form_description: "Мы будем рады услышать от вас. Заполните форму ниже, и мы свяжемся с вами в ближайшее время.",
    contact_information: "Контактная информация",
    contact_info_description: "Вы можете связаться с нами по следующим контактным данным.",
    name: "Имя",
    surname: "Фамилия",
    email: "Эл. почта",
    message: "Сообщение",
    your_name: "Ваше имя",
    your_surname: "Ваша фамилия",
    your_email: "Ваш адрес эл. почты",
    your_message: "Ваше сообщение",
    send_message: "Отправить сообщение",
    message_sent: "Сообщение отправлено",
    message_sent_description: "Спасибо за обращение. Мы ответим в ближайшее время.",
    error: "Ошибка",
    message_send_error: "Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.",
    address: "Адрес",
    phone: "Телефон",
    telegram_bot: "Телеграм бот",
    open_telegram_bot: "Открыть Телеграм бот",
    
    // Search page
    address_search: "Поиск адреса",
    enter_address: "Пожалуйста, введите адрес для поиска",
    enter_address_placeholder: "Введите адрес, город или достопримечательность...",
    address_not_found: "Адрес не найден",
    search_history: "История поиска",
    favorites: "Избранное",
    no_history: "История поиска пуста",
    no_favorites: "Нет сохраненных избранных",
    added_to_favorites: "Добавлено в избранное",
    removed_from_favorites: "Удалено из избранного",
    search_error: "Ошибка при поиске местоположения",
    
    // Footer
    footer_description: "Ваш лучший путеводитель по прекрасной стране Таджикистан. Откройте для себя горы, культуру и гостеприимство.",
    subscribe_newsletter: "Подпишитесь на нашу рассылку",
    company: "Компания",
    destinations: "Направления",
    support: "Поддержка",
    about_us: "О нас",
    team: "Наша команда",
    careers: "Карьера",
    blog: "Блог",
    faq: "ЧЗВ",
    privacy_policy: "Политика конфиденциальности",
    terms: "Условия использования",
    
    // Regions
    gbao_region: "Регион ГБАО",
    sughd_region: "Согдийская область",
    hisor_district: "Гиссарский район",
    
    // Destinations
    pamir_mountains_description: "Памирские горы, известные как 'Крыша мира', предлагают захватывающие пейзажи с заснеженными вершинами, альпийскими озерами и уникальным культурным опытом.",
    iskanderkul_lake: "Озеро Искандеркуль",
    iskanderkul_description: "Потрясающее бирюзовое альпийское озеро, названное в честь Александра Великого, окруженное величественными горами и красивыми водопадами.",
    hisor_fortress: "Гиссарская крепость",
    hisor_description: "Древняя крепость с историей более 2500 лет, с впечатляющими воротами, мечетью и музеем древностей.",
    wakhan_corridor: "Ваханский коридор",
    wakhan_description: "Удаленная и впечатляющая долина с захватывающими горными видами, древними крепостями и традиционными памирскими деревнями.",
    
    // Testimonials
    testimonial_1: "Моя поездка в Таджикистан была абсолютно невероятной. Приключение на Памирском шоссе превзошло все мои ожидания с потрясающими пейзажами и теплым гостеприимством местных жителей.",
    testimonial_2: "Тур по культурному наследию дал мне глубокое понимание таджикских традиций. Гиды были знающими, а впечатления были аутентичными.",
    testimonial_3: "Поход в Фанские горы был изюминкой моего путешествия. Бирюзовые озера еще красивее вживую, чем на фотографиях.",
    testimonial_4: "Душанбе удивил меня своим очарованием, а еда была потрясающей везде, где мы были. Я обязательно вернусь, чтобы исследовать больше Таджикистана."
  },
  tj: {
    // General
    home: "Асосӣ",
    culture: "Фарҳанг",
    catalog: "Феҳрист",
    gallery: "Галерея",
    contact: "Тамос",
    search: "Ҷустуҷӯ",
    learn_more: "Бештар донед",
    view_details: "Дидани тафсилот",
    book_now: "Ҳозир банд кунед",
    send: "Фиристодан",
    sending: "Фиристода истодааст...",
    cancel: "Бекор кардан",
    all_rights_reserved: "Ҳамаи ҳуқуқҳо ҳифз шудаанд.",
    
    // Home page
    welcome_to_tajikistan: "Хуш омадед ба Тоҷикистон",
    tajikistan_intro: "Гавҳари пинҳони Осиёи Марказиро бо кӯҳҳои нафасгир, мероси бойи фарҳангӣ ва меҳмоннавозии гарм кашф кунед.",
    discover_more: "Бештар кашф кунед",
    featured_destinations: "Самтҳои машҳур",
    featured_destinations_description: "Зеботарин ва машҳуртарин ҷойҳои Тоҷикистонро кашф кунед.",
    travel_packages: "Бастаҳои сайёҳӣ",
    travel_packages_description: "Барои таҷрибаи фаромӯшнашаванда аз бастаҳои сайёҳии бодиққат таҳияшудаи мо интихоб кунед.",
    what_travelers_say: "Сайёҳон чӣ мегӯянд",
    testimonials_description: "Тақризҳои сайёҳонеро хонед, ки зебоии Тоҷикистонро таҷриба кардаанд.",
    
    // Slider
    explore_tajikistan: "Тоҷикистонро кашф кунед",
    explore_tajikistan_subtitle: "Фестивалҳо ва фарҳангро кашф кунед",
    discover_tajikistan: "Тоҷикистонро кашф кунед",
    mountains_culture_tradition: "Кӯҳҳо, фарҳанг ва анъана",
    taste_national_cuisine: "Таоми миллиро чашед",
    delicious_dishes_await: "Таомҳои болаззат шуморо интизоранд",
    contact_us: "Бо мо тамос гиред",
    packages: "Бастаҳо",
    explore_now: "Ҳозир кашф кунед",
    view_packages: "Дидани бастаҳо",
    reserve_table: "Ҷадвал захира кунед",
    view_menu: "Дидани меню",
    
    // Culture page
    tajik_culture: "Фарҳанг ва мероси тоҷик",
    culture_intro: "Анъанаҳои бой ва мероси фарҳангии рангини Тоҷикистонро таҷриба кунед",
    cultural_heritage: "Мероси фарҳангӣ",
    festivals_celebrations: "Фестивалҳо ва ҷашнҳо",
    traditions: "Анъанаҳо",
    cuisine: "Таом",
    music_dance: "Мусиқӣ ва рақс",
    crafts: "Ҳунарҳои анъанавӣ",
    traditions_description: "Анъанаҳои тоҷикӣ садсолаҳои таърихро инъикос мекунанд, бо урфу одатҳое, ки аз насл ба насл мегузаранд.",
    cuisine_description: "Таоми тоҷикӣ таомҳои болаззат ба монанди палав, шашлик ва нони анъанавиро дар бар мегирад.",
    music_dance_description: "Мусиқӣ ва рақси анъанавӣ ҷузъи ҷудонашавандаи фарҳанги тоҷик мебошанд, бо асбобҳои беназир ва намоишҳои рангин.",
    crafts_description: "Ҳунармандони тоҷик ҳунарҳои дастии зебо, аз ҷумла гулдӯзӣ, қолин ва кулолгариро месозанд.",
    navruz: "Наврӯз",
    mehrgon: "Меҳргон",
    independence_day: "Рӯзи Истиқлолият",
    navruz_description: "Ҷашни Соли нави форсӣ, ки эътидоли баҳориро бо зиёфатҳо ва ҷашнҳо қайд мекунад.",
    mehrgon_description: "Ҷашни қадимаи тирамоҳи ҳосил бо мусиқӣ, рақс ва таомҳои анъанавӣ.",
    independence_day_description: "Ҷашни истиқлолияти Тоҷикистон бо гузаштҳо, консертҳо ва оташбозӣ.",
    
    // Catalog page
    destinations_catalog: "Феҳристи самтҳо",
    search_destinations: "Ҷустуҷӯи самтҳо...",
    select_region: "Интихоби минтақа",
    all_regions: "Ҳамаи минтақаҳо",
    gbao: "ВМКБ",
    sughd: "Суғд",
    central: "Минтақаи марказӣ",
    khatlon: "Хатлон",
    no_destinations_found: "Самтҳое, ки ба меъёрҳои шумо мувофиқат мекунанд, ёфт нашуданд.",
    pamir_mountains: "Кӯҳҳои Помир",
    fann_mountains: "Кӯҳҳои Фон",
    iskanderkul: "Кӯли Искандаркӯл",
    dushanbe: "Душанбе",
    khujand: "Хуҷанд",
    wakhan_corridor: "Долони Вахон",
    pamir_description: "Кӯҳҳои Помир, ки ҳамчун 'Боми ҷаҳон' маъруфанд, манзараҳои нафасгир ва таҷрибаҳои фарҳангии беназирро пешниҳод мекунанд.",
    fann_description: "Кӯҳҳои Фон дорои кӯлҳои фирӯзаи зебо ва қуллаҳои драматикӣ мебошанд, ки барои пиёдагардӣ ва аксбардорӣ мувофиқанд.",
    iskanderkul_description: "Кӯли зебои алпӣ, ки ба номи Искандари Бузург гузошта шудааст, бо кӯҳҳо ва шаршараҳо иҳота шудааст.",
    dushanbe_description: "Пойтахти Тоҷикистон бо шароити муосир, осорхонаҳо ва боғҳои зебо.",
    khujand_description: "Яке аз қадимтарин шаҳрҳои Осиёи Марказӣ бо таърихи бой ва бозорҳои серодам.",
    wakhan_description: "Долони дурдаст бо манзараҳои аҷоиб, қалъаҳои қадима ва деҳаҳои анъанавӣ.",
    
    // Travel packages
    cultural_heritage_tour: "Сайри мероси фарҳангӣ",
    pamir_highway_adventure: "Саргузашти шоҳроҳи Помир",
    silk_road_expedition: "Экспедитсияи Роҳи Абрешим",
    "7_days": "7 рӯз",
    "10_days": "10 рӯз",
    "12_days": "12 рӯз",
    max_8_people: "Ҳадди аксар 8 нафар",
    max_10_people: "Ҳадди аксар 10 нафар",
    max_12_people: "Ҳадди аксар 12 нафар",
    monthly_departures: "Сафарҳои ҳармоҳа",
    june_to_september: "Аз июн то сентябр",
    april_to_october: "Аз апрел то октябр",
    cultural_tour_description: "Мероси бойи фарҳангии Тоҷикистонро бо боздид аз ҷойҳои таърихӣ, деҳаҳои анъанавӣ ва намоишҳои фарҳангӣ кашф кунед.",
    pamir_highway_description: "Саргузашт дар тӯли шоҳроҳи афсонавии Помир бо манзараҳои нафасгири кӯҳӣ, деҳаҳои дурдаст ва таҷрибаҳои фарҳангии беназир.",
    silk_road_description: "Роҳи қадимаи Абрешимро тавассути Тоҷикистон пайравӣ кунед, аз ҷойҳои таърихӣ, бозорҳо боздид кунед ва бо анъанаҳои маҳаллӣ шинос шавед.",
    
    // Gallery page
    tajikistan_gallery: "Галереяи Тоҷикистон",
    select_category: "Интихоби категория",
    all_categories: "Ҳамаи категорияҳо",
    nature: "Табиат",
    cities: "Шаҳрҳо",
    culture: "Фарҳанг",
    historical: "Таърихӣ",
    no_images_found: "Барои категорияи интихобшуда тасвирҳо ёфт нашуданд.",
    
    // Contact page
    send_us_message: "Ба мо паём фиристед",
    contact_form_description: "Мо хурсандем, ки аз шумо шунавем. Шакли зеринро пур кунед ва мо ба зудӣ бо шумо тамос мегирем.",
    contact_information: "Маълумот барои тамос",
    contact_info_description: "Шумо метавонед тавассути маълумоти тамоси зерин бо мо тамос гиред.",
    name: "Ном",
    surname: "Насаб",
    email: "Почтаи электронӣ",
    message: "Паём",
    your_name: "Номи шумо",
    your_surname: "Насаби шумо",
    your_email: "Суроғаи почтаи электронии шумо",
    your_message: "Паёми шумо",
    send_message: "Фиристодани паём",
    message_sent: "Паём фиристода шуд",
    message_sent_description: "Ташаккур барои тамос. Мо ба зудӣ ҷавоб медиҳем.",
    error: "Хато",
    message_send_error: "Фиристодани паём ба нокомӣ дучор шуд. Лутфан бори дигар кӯшиш кунед.",
    address: "Суроға",
    phone: "Телефон",
    telegram_bot: "Боти Телеграм",
    open_telegram_bot: "Кушодани боти Телеграм",
    
    // Search page
    address_search: "Ҷустуҷӯи суроға",
    enter_address: "Лутфан барои ҷустуҷӯ суроғаро ворид кунед",
    enter_address_placeholder: "Суроға, шаҳр ё ҷои диданӣ ворид кунед...",
    address_not_found: "Суроға ёфт нашуд",
    search_history: "Таърихи ҷустуҷӯ",
    favorites: "Дӯстдоштаҳо",
    no_history: "Ҳанӯз таърихи ҷустуҷӯ нест",
    no_favorites: "Ҳанӯз дӯстдоштаҳои захирашуда нестанд",
    added_to_favorites: "Ба дӯстдоштаҳо илова карда шуд",
    removed_from_favorites: "Аз дӯстдоштаҳо хориҷ карда шуд",
    search_error: "Хатои ҷустуҷӯи макон",
    
    // Footer
    footer_description: "Роҳнамои беҳтарини шумо барои кашфи кишвари зебои Тоҷикистон. Кӯҳҳо, фарҳанг ва меҳмоннавозиро кашф кунед.",
    subscribe_newsletter: "Ба хабарномаи мо обуна шавед",
    company: "Ширкат",
    destinations: "Самтҳо",
    support: "Дастгирӣ",
    about_us: "Дар бораи мо",
    team: "Дастаи мо",
    careers: "Корьера",
    blog: "Блог",
    faq: "Саволҳои зиёд додашаванда",
    privacy_policy: "Сиёсати махфият",
    terms: "Шартҳо ва қоидаҳо",
    
    // Regions
    gbao_region: "Вилояти ВМКБ",
    sughd_region: "Вилояти Суғд",
    hisor_district: "Ноҳияи Ҳисор",
    
    // Destinations
    pamir_mountains_description: "Кӯҳҳои Помир, ки ҳамчун 'Боми ҷаҳон' маъруфанд, манзараҳои нафасгир бо қуллаҳои барфпӯш, кӯлҳои алпӣ ва таҷрибаҳои фарҳангии беназирро пешниҳод мекунанд.",
    iskanderkul_lake: "Кӯли Искандаркӯл",
    iskanderkul_description: "Кӯли фирӯзаи зебои алпӣ, ки ба номи Искандари Бузург гузошта шудааст, бо кӯҳҳои бошукӯҳ ва шаршараҳои зебо иҳота шудааст.",
    hisor_fortress: "Қалъаи Ҳисор",
    hisor_description: "Қалъаи қадимӣ бо таърихи беш аз 2500 сола, бо дарвозаҳои таъсирбахш, масҷид ва осорхонаи атиқа.",
    wakhan_corridor: "Долони Вахон",
    wakhan_description: "Водии дурдаст ва аҷоиб бо манзараҳои нафасгири кӯҳӣ, қалъаҳои қадима ва деҳаҳои анъанавии помирӣ.",
    
    // Testimonials
    testimonial_1: "Сафари ман ба Тоҷикистон комилан боварнакарданӣ буд. Саргузашти шоҳроҳи Помир аз ҳама умедҳои ман зиёдтар буд бо манзараҳои зебо ва меҳмоннавозии гарми аҳолии маҳаллӣ.",
    testimonial_2: "Сайри мероси фарҳангӣ ба ман қадрдонии амиқи анъанаҳои тоҷикро дод. Роҳнамоён донишманд буданд ва таҷрибаҳо воқеӣ буданд.",
    testimonial_3: "Пиёдагардӣ дар кӯҳҳои Фон нуқтаи баландтарини сафари ман буд. Кӯлҳои фирӯза дар ҳақиқат аз аксҳо зеботаранд.",
    testimonial_4: "Душанбе маро бо ҷозибааш ҳайрон кард ва хӯрок дар ҳама ҷое, ки мо рафтем, аҷоиб буд. Ман ҳатман бармегардам, то бештар Тоҷикистонро кашф кунам."
  }
};

// Language Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "ru", "tj"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <TranslationContext.Provider value={{ t, language, setLanguage }}>{children}</TranslationContext.Provider>
}

// Custom hook to use translations
export function useTranslation() {
  return useContext(TranslationContext)
}

