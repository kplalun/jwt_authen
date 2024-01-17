import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetch } from "../utilities/fetch";
import { alert } from "../utilities/alert";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataUser = {
      user_name: data.username,
      user_pass: data.password,
    };
    const result = await fetch.post("/auth/login", dataUser);
    console.log(result);
    if (result.status == 200) {
      localStorage.setItem("token", result.token);
      //แกะข้อมูลจาก token
      const userDataFromToken = jwtDecode(result.token);
      //เซ็ทข้อมูลเก็บใน redux
      dispatch(login(userDataFromToken));
      navigate("/user");
      // alert.success(result.message)
    } else {
      alert.error(result.message);
    }
  };

  const handleInputChange = (event) => {
    const key = event.target.name;
    setData({
      ...data,
      [key]: event.target.value,
    });
  };

  return (
    <div className="bg-black w-[100vw] h-[100vh]">
      <div className="absolute  w-[520px] h-[400px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
        <div className="w-52 h-52 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl shadow-orange-400 rounded-full absolute -left-[80px] -top-[80px]"></div>
        <div className="w-52 h-52 bg-gradient-to-r from-purple-500 to-blue-500 shadow-xl shadow-green-400 rounded-full absolute -right-[80px] -bottom-[80px] "></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-700/[.13] w-[520px] h-[420px] backdrop-blur-lg absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-3xl p-4 "
      >
        <p className="text-4xl font-bold text-red-400 text-center mt-4 mb-14">
          Login Here
        </p>

        <label className="text-white font-semibold text-xl">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          className="block placeholder-red-300 w-full p-2 rounded-sm mt-6"
        />

        <div className="mt-6">
          <label className="text-white font-semibold text-xl">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            className="block placeholder-red-300 w-full p-2 rounded-sm mt-6"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
