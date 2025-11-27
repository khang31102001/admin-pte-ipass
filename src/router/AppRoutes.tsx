import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

export function AppRoutes() {
  // Gộp tất cả route object lại
  const element = useRoutes([...protectedRoutes, ...publicRoutes]);

  return element;
}
