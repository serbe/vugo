import request from "@/request";

export default {
  data() {
    return {
      fetched: false,
      list: []
    };
  },
  methods: {
    fetchData(url, name) {
      if (!name) {
        name = url;
      }
      if (!this.fetched) {
        request({
          url: url,
          method: "GET"
        }).then(r => {
          this.list = this.createList(r.data[name]);
          this.fetched = true;
        });
      }
    }
  }
};
