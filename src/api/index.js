// https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node
import axios from "axios";

const client = axios.create({
  baseURL: "/api/go/",
  json: true
});

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data
      // headers: {
      // Authorization: `Bearer ${accessToken}`
      // }
    }).then(req => {
      return req.data;
    });
  },
  post(url, data) {
    return this.execute("post", url, data);
  },
  get(url) {
    return this.execute("get", url);
  }
};
