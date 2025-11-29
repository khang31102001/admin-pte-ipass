
export const ROUTESIDEBAR = {
    HOME: "/",

    PROFILE: "/profile",

    COURSES: {
        LIST: "/courses",
        CREATE: "/courses/create-infor",
        UPDATE: "/courses/update-infor",
    },

    NEWS: {
        LIST: "/news",
        CREATE: "/news/create",
        UPDATE: "/news/update-infor/:slug",       
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
