import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "fr", "ru"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      ar: "/عن-شركة-سيمال",
      fr: "/a-propos",
      ru: "/о-компании",
    },
    "/about/leadership": {
      en: "/about/leadership",
      ar: "/عن-شركة-سيمال/القيادة",
      fr: "/a-propos/leadership",
      ru: "/о-компании/руководство",
    },
    "/about/mission-vision": {
      en: "/about/mission-vision",
      ar: "/عن-شركة-سيمال/الرسالة-والرؤية",
      fr: "/a-propos/mission-vision",
      ru: "/о-компании/миссия-видение",
    },
    "/about/awards": {
      en: "/about/awards",
      ar: "/عن-شركة-سيمال/الجوائز",
      fr: "/a-propos/prix",
      ru: "/о-компании/награды",
    },
    "/about/csr": {
      en: "/about/csr",
      ar: "/عن-شركة-سيمال/المسؤولية-الاجتماعية",
      fr: "/a-propos/rse",
      ru: "/о-компании/ксо",
    },
    "/hardware/product-catalog": {
      en: "/hardware/product-catalog",
      ar: "/توزيع-تكنولوجيا-المعلومات/كتالوج-المنتجات",
      fr: "/distribution-it/catalogue",
      ru: "/ит-дистрибуция/каталог",
    },
    "/hardware/product-comparison": {
      en: "/hardware/product-comparison",
      ar: "/توزيع-تكنولوجيا-المعلومات/مقارنة-المنتجات",
      fr: "/distribution-it/comparaison",
      ru: "/ит-дистрибуция/сравнение",
    },
    "/hardware/computer-accessories": {
      en: "/hardware/computer-accessories",
      ar: "/توزيع-تكنولوجيا-المعلومات/ملحقات-الكمبيوتر",
      fr: "/distribution-it/accessoires",
      ru: "/ит-дистрибуция/аксессуары",
    },
    "/hardware/computer-components": {
      en: "/hardware/computer-components",
      ar: "/توزيع-تكنولوجيا-المعلومات/مكونات-الكمبيوتر",
      fr: "/distribution-it/composants",
      ru: "/ит-дистрибуция/компоненты",
    },
    "/hardware/laptops": {
      en: "/hardware/laptops",
      ar: "/توزيع-تكنولوجيا-المعلومات/أجهزة-الكمبيوتر-المحمولة",
      fr: "/distribution-it/ordinateurs",
      ru: "/ит-дистрибуция/ноутбуки",
    },
    "/hardware/monitors": {
      en: "/hardware/monitors",
      ar: "/توزيع-تكنولوجيا-المعلومات/شاشات",
      fr: "/distribution-it/ecrans",
      ru: "/ит-дистрибуция/мониторы",
    },
    "/hardware/gaming": {
      en: "/hardware/gaming",
      ar: "/توزيع-تكنولوجيا-المعلومات/الألعاب",
      fr: "/distribution-it/gaming",
      ru: "/ит-дистрибуция/гейминг",
    },
    "/contact": {
      en: "/contact",
      ar: "/اتصل-بنا",
      fr: "/contact",
      ru: "/контакты",
    },
    "/careers": {
      en: "/careers",
      ar: "/الوظائف",
      fr: "/carrieres",
      ru: "/карьера",
    },
"/search": {
      en: "/search",
      ar: "/بحث",
      fr: "/recherche",
      ru: "/поиск",
    },
  },
});
