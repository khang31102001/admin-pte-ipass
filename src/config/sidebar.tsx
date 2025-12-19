// src/config/sidebar.tsx
import { BookOpen, InfoIcon, Layers, Newspaper, UserCog, Settings} from "lucide-react";
import {  PageIcon, PieChartIcon, BoxCubeIcon, PlugInIcon } from "../icons";
import { ROUTES } from "./routes";




export type NavSubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: NavSubItem[];
};

export const mainNavItems: NavItem[] = [

  {
    name: "Quản lý danh mục",
    icon: <Layers />,
    path: ROUTES.CATEGORIES.LIST,
  },

  {
    name: "Quản lý khóa học",
    icon: <BookOpen />,
    path: ROUTES.COURSES.LIST,
  },
  {
    name: "Quản lý tin tức",
    icon: <Newspaper />,
    path: ROUTES.NEWS.LIST,
  },

  {
    icon: <UserCog />,
    name: "Quản lý giáo viên",
    path: ROUTES.TEACHER.LIST,
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

export const othersNavItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

export const systemNavItems: NavItem[] = [
  {
    icon: <Settings size={18} />,
    name: "System Settings",
    subItems: [
      {
        name: "General",
        path: "/settings/general",
        pro: false,
      },
      {
        name: "Domain & SEO",
        path: "/settings/seo",
        pro: false,
      },
      {
        name: "Learning Settings",
        path: "/settings/learning",
        pro: false,
      },
    ],
  },
    {
    icon: <InfoIcon />,
    name: "Về chúng tôi",
    path: ROUTES.ABOUT.ROOT,
  },


  // {
  //   icon: <CreditCard size={18} />,
  //   name: "Payment & Billing",
  //   subItems: [
  //     {
  //       name: "Payment Gateway",
  //       path: "/settings/payment",
  //       pro: false,
  //     },
  //     {
  //       name: "Coupons & Discounts",
  //       path: "/settings/coupons",
  //       pro: false,
  //     },
  //   ],
  // },

  // {
  //   icon: <Mail size={18} />,
  //   name: "Email & Notification",
  //   subItems: [
  //     {
  //       name: "SMTP Settings",
  //       path: "/settings/email",
  //       pro: false,
  //     },
  //     {
  //       name: "Email Templates",
  //       path: "/settings/email-templates",
  //       pro: false,
  //     },
  //   ],
  // },

  // {
  //   icon: <Shield size={18} />,
  //   name: "Security",
  //   subItems: [
  //     {
  //       name: "Authentication",
  //       path: "/settings/security/auth",
  //       pro: false,
  //     },
  //     {
  //       name: "Access Control",
  //       path: "/settings/security/roles",
  //       pro: false,
  //     },
  //     {
  //       name: "Audit Logs",
  //       path: "/settings/security/audit-logs",
  //       pro: false,
  //     },
  //   ],
  // },

  // {
  //   icon: <Plug size={18} />,
  //   name: "Integrations",
  //   subItems: [
  //     {
  //       name: "Analytics",
  //       path: "/settings/integrations/analytics",
  //       pro: false,
  //     },
  //     {
  //       name: "CRM / Webhooks",
  //       path: "/settings/integrations/crm",
  //       pro: false,
  //     },
  //   ],
  // },

  // {
  //   icon: <User size={18} />,
  //   name: "Account",
  //   subItems: [
  //     {
  //       name: "Profile",
  //       path: "/account/profile",
  //       pro: false,
  //     },
  //     {
  //       name: "Change Password",
  //       path: "/account/password",
  //       pro: false,
  //     },
  //   ],
  // },

  // {
  //   icon: <LogOut size={18} />,
  //   name: "Logout",
  //   path: "/logout",
  // },
];
