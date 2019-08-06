import request from "@/request";

export default {
  data() {
    return {
      fetched: false,
      list: []
    };
  },
  methods: {
    fetchItem(name, response, arrays, values, childrens) {
      if (!this.fetched) {
        request({
          url: `${name}/item/${this.$route.params.id}`,
          method: "GET"
        }).then(r => {
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
      request({
        url: `${item}/select`,
        method: "GET"
      }).then(r => {
        this[list] = r.data.data.SelectItem;
        this.setSelect(root, list, item, value);
      });
    },
    fetchChildren(root, children, name) {
      request({
        url: `${root}/list/${children}/${this[root].id}`,
        method: "GET"
      }).then(r => {
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
    }
    // onSelect (item, name, itemName) {
    //   this[name][itemName] = item
    //   this[name][`${itemName}_id`] = item.id
    // }
  }
};
