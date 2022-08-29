import { useAuth } from "../contexts/AuthContext";
import { Route, Navigate } from "react-router-dom";
import Quiz from "./pages/Quiz";

export default function PrivateRoute({ element: Element, ...rest }) {
  const { currentUser } = useAuth();

  return currentUser ? <Quiz /> : <Navigate to="/login" />;
}
