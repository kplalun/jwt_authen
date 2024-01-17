import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const dispatch = useDispatch();
  const hasToken = Boolean(window.localStorage.getItem("token"));
  if (hasToken) {
    const token = window.localStorage.getItem("token");
    const userDataFromToken = jwtDecode(token);
    if (userDataFromToken.role === "ADMIN") {
      dispatch(login(userDataFromToken));
      return <Outlet />;
    }else{
      return <h1>5555</h1>
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
