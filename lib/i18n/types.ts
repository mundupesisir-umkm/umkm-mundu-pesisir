export type Language = "id" | "en";

export interface HeroStatItem {
  value: string;
  label: string;
  isTeal: boolean;
}

export interface HeroCardInfo {
  badge: string;
  title: string;
  subtitle: string;
}

export interface CategoryHighlightItem {
  id: string;
  icon: "siwang" | "fish" | "seafood";
  title: string;
  description: string;
  linkText: string;
  href: string;
}

export interface WhyUsHighlightItem {
  id: string;
  icon: "fisherman" | "shield" | "community";
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContactFaqItem {
  question: string;
  answer: string;
}

export interface RouteGuideItem {
  from: string;
  duration: string;
  description: string;
}

export interface ContactChannelItem {
  id: string;
  icon: "WhatsApp" | "Mail" | "MapPin" | "Clock";
  title: string;
  subtitle: string;
  primaryValue: string;
  actionText: string;
  actionHref: string;
  isPrimary?: boolean;
  statusBadge?: string;
}

export interface VillageStatItem {
  value: string;
  label: string;
  sublabel: string;
  icon: "Map" | "Compass" | "Fish" | "Anchor" | string;
}

export interface VillagePillarItem {
  title: string;
  tag: string;
  description: string;
  icon: string;
}

export interface VillageVision {
  title: string;
  description: string;
  points: string[];
}

export interface TranslationDictionary {
  nav: {
    home: string;
    products: string;
    testimonials: string;
    profile: string;
    contact: string;
    searchPlaceholder: string;
    chooseLanguage: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    exploreBtn: string;
    orderWaBtn: string;
    featuredBadge: string;
    stats: HeroStatItem[];
    card: HeroCardInfo;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    categoriesBadge: string;
    categoriesHeadline: string;
    categoriesSubtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    p4Title: string;
    p4Desc: string;
    categories: CategoryHighlightItem[];
    whyUs: WhyUsHighlightItem[];
  };
  catalog: {
    officialBadge: string;
    sectionHeadline: string;
    sectionSubtitle: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    searchPlaceholder: string;
    filterLabel: string;
    allCategory: string;
    siwangCategory: string;
    seafoodCategory: string;
    berasCategory: string;
    crackersCategory: string;
    sortDefault: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortNameAsc: string;
    showingCount: string;
    resetFilter: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyFilterTitle: string;
    emptyFilterDesc: string;
    viewAllBtn: string;
    contactWaBtn: string;
    faqBadge: string;
    faqTitle: string;
    faqSubtitle: string;
    trust1: string;
    trust1Sub: string;
    trust2: string;
    trust2Sub: string;
    trust3: string;
    trust3Sub: string;
    trust4: string;
    trust4Sub: string;
    orderBtn: string;
    detailBtn: string;
    faqs: FaqItem[];
  };
  productDetail: {
    breadcrumbHome: string;
    breadcrumbCatalog: string;
    shareBtn: string;
    copiedBtn: string;
    allProductsBtn: string;
    artisanStamp: string;
    badgePreservative: string;
    badgePreservativeSub: string;
    badgePackaging: string;
    badgePackagingSub: string;
    badgeShelfLife: string;
    badgeShipping: string;
    badgeShippingSub: string;
    producerOrigin: string;
    producerTitle: string;
    producerDesc: string;
    producerWa: string;
    officialPrice: string;
    directArtisan: string;
    noMarkup: string;
    compositionLabel: string;
    shelfLifeLabel: string;
    packagingLabel: string;
    quantityTitle: string;
    quantitySubtitle: string;
    totalEstimate: string;
    orderWaBtn: string;
    orderNote: string;
    relatedTitle: string;
    relatedSubtitle: string;
    helpTitle: string;
    helpSubtitle: string;
    chatWaBtn: string;
    contactVillageBtn: string;
    notFoundTitle: string;
    notFoundDesc: string;
    backToCatalogBtn: string;
  };
  profile: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ribbonPesisir: string;
    ribbonPesisirSub: string;
    ribbonSiwang: string;
    ribbonSiwangSub: string;
    ribbonMangrove: string;
    ribbonMangroveSub: string;
    ribbonNadran: string;
    ribbonNadranSub: string;
    pillarsBadge: string;
    pillarsTitle: string;
    pillarsSubtitle: string;
    visionBadge: string;
    visionTitle: string;
    visionSubtitle: string;
    pillarBadgeFeature: string;
    ctaTitle: string;
    ctaSubtitle: string;
    viewCatalogBtn: string;
    contactVillageBtn: string;
    stats: VillageStatItem[];
    pillars: VillagePillarItem[];
    vision: VillageVision;
  };
  testimonials: {
    badge: string;
    sectionBadge: string;
    sectionHeadline: string;
    sectionLinkText: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ratingText: string;
    ratingSub: string;
    naturalText: string;
    naturalSub: string;
    shippingText: string;
    shippingSub: string;
    authenticText: string;
    authenticSub: string;
    searchPlaceholder: string;
    allReviews: string;
    showingReviews: string;
    verifiedBuyer: string;
    showMore: string;
    showLess: string;
    emptyTitle: string;
    emptyDesc: string;
    sendReviewWa: string;
    bottomTitle: string;
    bottomSubtitle: string;
  };
  contact: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ribbonWa: string;
    ribbonWaSub: string;
    ribbonRoute: string;
    ribbonRouteSub: string;
    ribbonStore: string;
    ribbonStoreSub: string;
    ribbonWholesale: string;
    ribbonWholesaleSub: string;
    formBadge: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formTopic: string;
    formTopicOrder: string;
    formTopicReseller: string;
    formTopicVisit: string;
    formTopicOther: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmitBtn: string;
    formSuccessMsg: string;
    mapTitle: string;
    mapSubtitle: string;
    openMapsBtn: string;
    routeGuideTitle: string;
    faqBadge: string;
    faqTitle: string;
    faqSubtitle: string;
    channels: ContactChannelItem[];
    routes: RouteGuideItem[];
    faqs: ContactFaqItem[];
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    whatsappBtn: string;
    catalogBtn: string;
  };
  footer: {
    brandDesc: string;
    quickLinks: string;
    businessHours: string;
    hoursDesc: string;
    addressTitle: string;
    addressDesc: string;
    infoCenter: string;
    copyright: string;
    allRightsReserved: string;
  };
}
