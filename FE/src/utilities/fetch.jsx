import axios from "axios";

// export const fetch = async (url = "", params = {}) => {
//   return {
//     post: () => {
//       const result = axios({
//         method: "POST",
//         url: "localhost:5000" + url,
//         params : params
//       });
//       return result
//     },
//   };

// };

// ฟังก์ชั่น fetch
export const fetch = {
  post: async (url = "", params = {}) => {
    // console.log(params);
    return axios
      .post("http://localhost:5000" + url, params)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  get: async (url = "") => {
    return axios
      .get("http://localhost:5000" + url)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
