import api from "@/api";

export default {
  data() {
    return {
      fetched: false
    };
  },
  methods: {
    async fetchItem(name, response, arrays, values, childrens) {
      if (!this.fetched) {
        let data = await api.get(`${name}/item/${this.$route.params.id}`);
        this[name] = this.removeNull(data.data[response]);
        arrays.forEach(e => {
          this[name][e] = this.checkArray(this[name][e]);
        });
        values.forEach(e => {
          this.fetchSelect(name, `${e}s`, e, `${e}_id`);
        });
        childrens.forEach(e => {
          this.fetchChildren(name, e[0], e[1]);
        });
      }
    },
    async fetchSelect(root, list, item, value) {
      let apidata = await api.get(`${item}/select`);
      this[list] = apidata.data.SelectItem;
      this.setSelect(root, list, item, value);
    },
    async fetchChildren(root, children, name) {
      let apidata = api.get(`${root}/list/${children}/${this[root].id}`);
      this[`${children}s`] = apidata.data[name];
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
    async postItem(url, data) {
      let apidata = await api.post(url, data);
      console.log(apidata);
    }
    // onSelect (item, name, itemName) {
    //   this[name][itemName] = item
    //   this[name][`${itemName}_id`] = item.id
    // }
  }
};
