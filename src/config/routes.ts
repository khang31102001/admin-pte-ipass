
export const ROUTES = {
  ADMIN: "/admin",

  // Dashboard
  HOME: "/admin",

  PROFILE: "/admin/profile",
  BLANK: "/admin/blank",
  FORM_ELEMENTS: "/admin/form-elements",
  USERS: "/admin/users",

  // ─────────────── COURSES ───────────────
  COURSES: {
    ROOT: "/admin/courses",
    LIST: "/admin/courses",
    CREATE: "/admin/courses/create-infor",
    UPDATE_BY_SEARCH: "/admin/courses/update-infor",
    UPDATE_BY_SLUG: (slug: string) => `/admin/courses/update-infor/${slug}`,
    DETAIL: (slug: string) => `/admin/courses/detail-infor/${slug}`,
  },

  // ─────────────── NEWS ───────────────
  NEWS: {
    ROOT: "/admin/news",
    LIST: "/admin/news",
    CREATE: "/admin/news/create",
    UPDATE: (slug: string) => `/admin/news/update/${slug}`,
    DETAIL: (slug: string) => `/admin/news/detail/${slug}`,
  },

  KNOWLEDGES: "/admin/knowledges",
  ALERTS: "/admin/alerts",
  AVATARS: "/admin/avatars",
  BADGE: "/admin/badge",
  BUTTONS: "/admin/buttons",
  IMAGES: "/admin/images",
  VIDEOS: "/admin/videos",
  LINE_CHART: "/admin/line-chart",
  BAR_CHART: "/admin/bar-chart",
} as const;

