import axios from "axios";
import auth from "@/auth";
import router from "@/router";

let baseURL = "/api/go/";

const client = axios.create({
  baseURL
});

function request(options) {
  if (auth.isAuth()) {
    client.defaults.headers.common.Authorization = auth.getAuthHeader();
  }

  function onSuccess(response) {
    return response;
  }

  function onError(error) {
    // console.error('Request Failed:', error.config);
    if (error.response && error.response.status === 401 && auth.isAuth()) {
      auth.logout();
      router.push({ name: "LoginPage" });
      // console.error('Status:', error.response.status);
      // console.error('Data:', error.response.data);
      // console.error('Headers:', error.response.headers);
    } else if (!error.response) {
      // auth.logout();
      router.push({ name: "LoginPage" });
    }
    return Promise.reject(error.response || error.message);
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;
