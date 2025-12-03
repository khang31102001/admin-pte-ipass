
export const ROUTES = {
  ADMIN: "/",

  // Dashboard
  HOME: "/",

  PROFILE: "/profile",
  BLANK: "/blank",
  FORM_ELEMENTS: "/form-elements",
  USERS: "/users",

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

