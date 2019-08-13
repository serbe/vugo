import axios from "axios";

export default {
  data() {
    return {
      fetched: false,
      config: {
        headers: { "Cache-Control": "no-cache" }, // can setup to prevent all caching
        baseURL: "/api/go/"
      }
    };
  },
  methods: {
    fetchItem(name, response, arrays, values, childrens) {
      if (!this.fetched) {
        axios
          .get(`${name}/item/${this.$route.params.id}`, this.config)
          .then(r => {
            this[name] = this.removeNull(r.data.data[response]);
            arrays.forEach(e => {
              this[name][e] = this.checkArray(this[name][e]);
            });
            values.forEach(e => {
              this.fetchSelect(name, `${e}s`, e, `${e}_id`);
            });
            childrens.forEach(e => {
              this.fetchChildren(name, e[0], e[1]);
            });
          });
      }
    },
    fetchSelect(root, list, item, value) {
      axios.get(`${item}/select`, this.config).then(r => {
        this[list] = r.data.data.SelectItem;
        this.setSelect(root, list, item, value);
      });
    },
    fetchChildren(root, children, name) {
      axios
        .get(`${root}/list/${children}/${this[root].id}`, this.config)
        .then(r => {
          this[`${children}s`] = r.data.data[name];
        });
    },
    setSelect(root, list, item, value) {
      this[root][item] = this[list].find(v => v.id === this[root][value]);
    },
    removeNull(values) {
      Object.keys(values).forEach(key => {
        if (!values[key]) {
          values[key] = "";
        }
      });
      return values;
    },
    postItem(url, data) {
      console.log(data);
      axios
        .post(url, data, this.config)
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // onSelect (item, name, itemName) {
    //   this[name][itemName] = item
    //   this[name][`${itemName}_id`] = item.id
    // }
  }
};
