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
import UpdateCoursePage from "@/pages/Courses/UpdateCoursePage";
import CreateNewsPage from "@/pages/News/CreateNewsPage";
import EditNewsPage from "@/pages/News/EditNewsPage";
import ListNewsPage from "@/pages/News/ListNewsPage";
import NewsDetailPage from "@/pages/News/NewsDetailPage";


export const protectedRoutes: RouteObject[] = [
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <UserProfiles />,
      },
      {
        path: "/blank",
        element: <Blank />,
      },
      {
        path: "/form-elements",
        element: <FormElements />,
      },
      {
        path: "/users",
        element: <UsersTable />,
      },
      {
        path: "/courses",
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
            path: "details/:slug", 
            element: <UpdateCoursePage />,
          },
        ],
      },
       {
        path: "/news",
        children: [
          {
            index: true, 
            element: <ListNewsPage />,
          },
          {
            path: "create", 
            element: <CreateNewsPage />,
          },
          {
            path: "update", 
            element: <EditNewsPage/>,
          },
           {
            path: "detail/:slug", 
            element: <NewsDetailPage/>,
          },
        ],
      },


      {
        path: "/knowledges",
        element: <KnowledgesTable />,
      },
      {
        path: "/alerts",
        element: <Alerts />,
      },
      {
        path: "/avatars",
        element: <Avatars />,
      },
      {
        path: "/badge",
        element: <Badges />,
      },
      {
        path: "/buttons",
        element: <Buttons />,
      },
      {
        path: "/images",
        element: <Images />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/line-chart",
        element: <LineChart />,
      },
      {
        path: "/bar-chart",
        element: <BarChart />,
      },
    ],
  },
];
