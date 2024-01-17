import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import Nopage from "./pages/Nopage";
import Login from "./pages/Login";

import User from "./pages/UserPage/User";
import Admin from './pages/AdminPage/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Nopage />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
