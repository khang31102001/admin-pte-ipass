// src/config/sidebar.tsx
import { UserCircleIcon, GridIcon, PageIcon, PieChartIcon, BoxCubeIcon, PlugInIcon } from "../icons";
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
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Quản lý Khóa Học",
    icon: <GridIcon />,
    subItems: [
      { name: "Danh sách khoa học", path: ROUTES.COURSES.LIST, pro: false },
      { name: "Tạo mới khóa học ", path: ROUTES.COURSES.CREATE, pro: false },
      { name: "Cập nhật lại khóa học", path: ROUTES.COURSES.UPDATE_BY_SEARCH, pro: false },
    ],
  },
  {
    name: "Quản lý tin tức",
    icon: <GridIcon />,
    subItems: [
      { name: "Danh sách tin tức", path: ROUTES.NEWS.LIST, pro: false },
      { name: "Tạo mới tin tức", path: ROUTES.NEWS.CREATE, pro: false },
      { name: "Cập nhật tin tức", path: ROUTES.NEWS.UPDATE(""), pro: false },
    ],
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
