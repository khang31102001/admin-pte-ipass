import type { RouteObject } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Home from "@/pages/Dashboard/Home";
import UserProfiles from "@/pages/UserProfiles";
import Blank from "@/pages/Blank";
import FormElements from "@/pages/Forms/FormElements";
import UsersTable from "@/pages/Tables/UsersTable";
import KnowledgesTable from "@/pages/Tables/KnowledgesTable";
import Alerts from "@/pages/UiElements/Alerts";
import Avatars from "@/pages/UiElements/Avatars";
import Badges from "@/pages/UiElements/Badges";
import Buttons from "@/pages/UiElements/Buttons";
import Images from "@/pages/UiElements/Images";
import Videos from "@/pages/UiElements/Videos";
import LineChart from "@/pages/Charts/LineChart";
import BarChart from "@/pages/Charts/BarChart";
import CreateCoursePage from "@/pages/Courses/CreateCoursePage";
import { RequireAuth } from "./RequireAuth";
import ListCoursesPage from "@/pages/Courses/ListCoursesPage";

import CreateNewsPage from "@/pages/News/CreateNewsPage";
import EditNewsPage from "@/pages/News/EditNewsPage";
import ListNewsPage from "@/pages/News/ListNewsPage";
import NewsDetailPage from "@/pages/News/NewsDetailPage";
import UpdateCoursePage from "@/pages/Courses/UpdateCoursesPage";
import CourseDetailPage from "@/pages/Courses/CourseDetailPage";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      // Trang /admin
      {
        index: true,
        element: <Home />,
      },

      // /admin/profile
      {
        path: "profile",
        element: <UserProfiles />,
      },

      // /admin/blank
      {
        path: "blank",
        element: <Blank />,
      },

      // /admin/form-elements
      {
        path: "form-elements",
        element: <FormElements />,
      },

      // /admin/users
      {
        path: "users",
        element: <UsersTable />,
      },

    
      {
        path: "courses",
        children: [
          {
            index: true, // /admin/courses
            element: <ListCoursesPage />,
          },
          {
            path: "create-infor", // /admin/courses/create-infor
            element: <CreateCoursePage />,
          },
           {
            path: "update-infor", // /admin/courses/update-infor/:slug
            element: <UpdateCoursePage />,
          },
          {
            path: "update-infor/:slug", // /admin/courses/update-infor/:slug
            element: <UpdateCoursePage />,
          },
          {
            path: "detail-infor/:slug", // /admin/courses/detail-infor/:slug
            element: <CourseDetailPage />,
          },
        ],
      },

      // ───────── NEWS ─────────
      // /admin/news/...
      {
        path: "news",
        children: [
          {
            index: true, // /admin/news
            element: <ListNewsPage />,
          },
          {
            path: "create", // /admin/news/create
            element: <CreateNewsPage />,
          },
          {
            path: "update", // /admin/news/update
            element: <EditNewsPage />,
          },
          {
            path: "detail/:slug", // /admin/news/detail/:slug
            element: <NewsDetailPage />,
          },
        ],
      },

      // /admin/knowledges
      {
        path: "knowledges",
        element: <KnowledgesTable />,
      },

      // /admin/alerts
      {
        path: "alerts",
        element: <Alerts />,
      },

      // /admin/avatars
      {
        path: "avatars",
        element: <Avatars />,
      },

      // /admin/badge
      {
        path: "badge",
        element: <Badges />,
      },

      // /admin/buttons
      {
        path: "buttons",
        element: <Buttons />,
      },

      // /admin/images
      {
        path: "images",
        element: <Images />,
      },

      // /admin/videos
      {
        path: "videos",
        element: <Videos />,
      },

      // /admin/line-chart
      {
        path: "line-chart",
        element: <LineChart />,
      },

      // /admin/bar-chart
      {
        path: "bar-chart",
        element: <BarChart />,
      },
    ],
  },
];
