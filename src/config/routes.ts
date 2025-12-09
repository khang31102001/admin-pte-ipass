
export const ROUTES = {
  ADMIN: "/",

  // Dashboard
  HOME: "/",

  PROFILE: "/profile",
  BLANK: "/blank",
  FORM_ELEMENTS: "/form-elements",
  USERS: "/users",
  // ─────────────── CATEGORIES ───────────────
    CATEGORIES: {
    ROOT: "/categories",
    LIST: "/categories",
    CREATE: "/create",
    EDIT: (slug: string) => `/categories/update/${slug}`,
 
  },

  // ─────────────── COURSES ───────────────
  COURSES: {
    ROOT: "/courses",
    LIST: "/courses",
    CREATE: "/courses/create",
    UPDATE_BY_SEARCH: "/courses/update",
    UPDATE_BY_SLUG: (slug: string) => `/courses/update/${slug}`,
    DETAIL: (slug: string) => `/courses/detail/${slug}`,
  },

  // ─────────────── NEWS ───────────────
  NEWS: {
    ROOT: "/news",
    LIST: "/news",
    CREATE: "/news/create",
    UPDATE: (slug: string) => `/news/update/${slug}`,
    DETAIL: (slug: string) => `/news/detail/${slug}`,
  },

    ABOUT: {
    ROOT: "/abouts",
    LIST: "/abouts",
    CREATE: "/abouts/create",
  },

  KNOWLEDGES: "/knowledges",
  ALERTS: "/alerts",
  AVATARS: "/avatars",
  BADGE: "/badge",
  BUTTONS: "/buttons",
  IMAGES: "/images",
  VIDEOS: "/videos",
  LINE_CHART: "/line-chart",
  BAR_CHART: "/bar-chart",
} as const;

