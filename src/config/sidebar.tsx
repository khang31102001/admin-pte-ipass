// src/config/sidebar.tsx
import { BookOpen, InfoIcon, Newspaper, UserCog } from "lucide-react";
import {  PageIcon, PieChartIcon, BoxCubeIcon, PlugInIcon } from "../icons";
import { ROUTES } from "./routes";
// hoặc import từ chỗ bạn đang dùng hiện tại

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
    icon: <InfoIcon />,
    name: "Về chúng tôi",
    path: ROUTES.ABOUT.ROOT,
  },

  {
    icon: <UserCog />,
    name: "Quản lý giáo viên",
    path: "/teachers",
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
