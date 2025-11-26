import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
import UsersTable from "./pages/Tables/UsersTable";
import CoursesTable from "./pages/Tables/CoursesTable";
import KnowledgesTable from "./pages/Tables/KnowledgesTable";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import CreateCoursePage from "./pages/Courses/Create";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { token, loading } = useAuth();

  if (loading) {
    // Có thể đặt 1 global skeleton/spinner
    return <div className="p-6 text-sm text-gray-500">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Protected area */}
          <Route
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/courses" element={<CoursesTable />} />
            <Route path="/courses/create" element={<CreateCoursePage />} />
            
            <Route path="/knowledges" element={<KnowledgesTable />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Public (Auth) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
