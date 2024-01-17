import axios from "axios";
function jwtInterceptors() {
  // ทุกๆ req จะแนบ token ไปที่ header
  axios.interceptors.request.use(
    function (config) {
      const hasToken = Boolean(window.localStorage.getItem("token"));
      if (hasToken) {
        config.headers = {
          ...config.headers,
          authtoken: window.localStorage.getItem("token"),
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  //  เมื่อ Token หมดอายุ ถ้า Request ไปหา Server ก็จะได้ Response กลับมา”
  axios.interceptors.response.use(
    (req) => {
      console.log(req);
      return req;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        window.localStorage.removeItem("token");
        window.location.replace("/");
      }
    }
  );
}

export default jwtInterceptors;
