import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const dispatch = useDispatch();
  const hasToken = Boolean(window.localStorage.getItem("token"));
  if (hasToken) {
    const token = window.localStorage.getItem("token");
    const userDataFromToken = jwtDecode(token);
    dispatch(login(userDataFromToken));
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserRoute;
