import axios from "axios";

export default {
  data() {
    return {
      fetched: false,
      config: {
        headers: { "Cache-Control": "no-cache" }, // can setup to prevent all caching
        baseURL: "/api/go/"
      },
      list: []
    };
  },
  methods: {
    fetchData(url, name) {
      if (!name) {
        name = url;
      }
      if (!this.fetched) {
        axios.get(url, this.config).then(r => {
          this.list = this.createList(r.data.data[name]);
          this.fetched = true;
        });
      }
    },
    fetchShortData(url, name) {
      if (!name) {
        name = url;
      }
      axios.get(url, this.config).then(r => {
        this[name] = r.data.data[name];
      });
    }
  }
};
