// import axios from "axios";
// import auth from "@/auth";
// import router from "@/router";

// let baseURL = "/api/go/";

// const client = axios.create({
//   baseURL
// });

// function request(options) {
//   if (auth.isAuth()) {
//     client.defaults.headers.common.Authorization = auth.getAuthHeader();
//   }

//   function onSuccess(response) {
//     return response;
//   }

//   function onError(error) {
//     // console.error('Request Failed:', error.config);
//     if (error.response && error.response.status === 401 && auth.isAuth()) {
//       auth.logout();
//       router.push({ name: "LoginPage" });
//       // console.error('Status:', error.response.status);
//       // console.error('Data:', error.response.data);
//       // console.error('Headers:', error.response.headers);
//     } else if (!error.response) {
//       // auth.logout();
//       router.push({ name: "LoginPage" });
//     }
//     return Promise.reject(error.response || error.message);
//   }

//   return client(options)
//     .then(onSuccess)
//     .catch(onError);
// }

// export default request;

import axios from "axios";

export class ApiHandler {
  constructor(apiUrl) {
    this.axios = axios;
    this.apiUrl = apiUrl || ""; // this line allow passing a custom endpoint for testing
    this.config = {
      headers: { "Cache-Control": "no-cache" }, // can setup to prevent all caching
      baseURL: "/api/go/"
    };
  }

  /**
   * @param {Object} payload
   * @param {String} payload.username
   * @param {String} payload.password
   */
  login({ username, password }) {
    return new Promise((resolve, reject) => {
      this.axios
        .post(
          "login",
          { username: username.toLowerCase(), password },
          this.config
        )
        .then(response => {
          if (response.code === 200 && response.body && response.body.token) {
            resolve(response.body.token);
          } else {
            reject("Bad Login");
          }
        })
        .catch(err => {
          reject(`login internal error ${err}`);
        });
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, data, this.config)
        .then(response => {
          if (response.code === 200 && response.body) {
            resolve(response.body);
          } else {
            reject("Bad Post");
          }
        })
        .catch(err => {
          reject(`post internal error ${err}`);
        });
    });
  }

  get(url) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, this.config)
        .then(response => {
          if (response.code === 200 && response.body) {
            resolve(response.body);
          } else {
            reject("Bad Post");
          }
        })
        .catch(err => {
          reject(`get internal error ${err}`);
        });
    });
  }
}
