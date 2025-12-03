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
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      // Trang /
      {
        index: true,
        element: <Home />,
      },

      // //profile
      {
        path: "profile",
        element: <UserProfiles />,
      },

      // //blank
      {
        path: "blank",
        element: <Blank />,
      },

      // //form-elements
      {
        path: "form-elements",
        element: <FormElements />,
      },

      // //users
      {
        path: "users",
        element: <UsersTable />,
      },

    
      {
        path: "courses",
        children: [
          {
            index: true,
            element: <ListCoursesPage />,
          },
          {
            path: "create",
            element: <CreateCoursePage />,
          },
           {
            path: "update",
            element: <UpdateCoursePage />,
          },
          {
            path: "update/:slug",
            element: <UpdateCoursePage />,
          },
          {
            path: "detail/:slug",
            element: <CourseDetailPage />,
          },
        ],
      },

      // ───────── NEWS ─────────
      // //news/...
      {
        path: "news",
        children: [
          {
            index: true, // //news
            element: <ListNewsPage />,
          },
          {
            path: "create", // //news/create
            element: <CreateNewsPage />,
          },
          {
            path: "update", // //news/update
            element: <EditNewsPage />,
          },
          {
            path: "detail/:slug", // //news/detail/:slug
            element: <NewsDetailPage />,
          },
        ],
      },

      // //knowledges
      {
        path: "knowledges",
        element: <KnowledgesTable />,
      },

      // //alerts
      {
        path: "alerts",
        element: <Alerts />,
      },

      // //avatars
      {
        path: "avatars",
        element: <Avatars />,
      },

      // //badge
      {
        path: "badge",
        element: <Badges />,
      },

      // //buttons
      {
        path: "buttons",
        element: <Buttons />,
      },

      // //images
      {
        path: "images",
        element: <Images />,
      },

      // //videos
      {
        path: "videos",
        element: <Videos />,
      },

      // //line-chart
      {
        path: "line-chart",
        element: <LineChart />,
      },

      // //bar-chart
      {
        path: "bar-chart",
        element: <BarChart />,
      },
    ],
  },
];
