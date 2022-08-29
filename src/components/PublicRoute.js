import { useAuth } from "../contexts/AuthContext";
import { Route, Navigate } from "react-router-dom";
import Quiz from "./pages/Quiz";

export default function PublicRoute({ element: Element, ...rest }) {
  const { currentUser } = useAuth();

  return !currentUser ? <Element /> : <Navigate to="/" />;
}
