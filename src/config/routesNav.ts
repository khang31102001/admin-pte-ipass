
export const ROUTES = {
    HOME: "/",

    PROFILE: "/profile",

    COURSES: {
        LIST: "/courses",
        CREATE: "/courses/create",
  
    },

    NEWS: {
        LIST: "/news",
        CREATE: "/news/create",
        UPDATE: (slug: string) => `/news/update/${slug}`,
        DETAIL: (slug: string) => `/courses/detail/${slug}`,
    },

    PAGES: {
        BLANK: "/blank",
        ERROR_404: "/error-404",
    },

    AUTH: {
        SIGN_IN: "/signin",
        SIGN_UP: "/signup",
    },

    CHARTS: {
        LINE: "/line-chart",
        BAR: "/bar-chart",
    },

    UI: {
        ALERTS: "/alerts",
        AVATAR: "/avatars",
        BADGE: "/badge",
        BUTTONS: "/buttons",
        IMAGES: "/images",
        VIDEOS: "/videos",
    },
} as const;
