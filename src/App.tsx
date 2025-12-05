import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { AppRoutes } from "./router/AppRoutes";
import "react-toastify/dist/ReactToastify.css";



export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
