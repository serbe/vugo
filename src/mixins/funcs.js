import store from "../store";

export default {
  methods: {
    checkArray(values) {
      let newValues = values ? values.filter(e => e !== "") : [];
      newValues.push("");
      return newValues;
    },
    filterArray(values, key) {
      return values.filter(e => e[key] && e[key] !== "");
    },
    telephone(value) {
      let v = value;
      if (v && v.length > 0) {
        v = v.replace(/[^0-9]/g, "");
        if (v.length === 10) {
          v = v.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($1) $2-$3-$4");
        }
        if (v.length === 11) {
          if (v[0] === "8") {
            v = `7${v.slice(1)}`;
          }
          v = v.replace(
            /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
            "+$1 ($2) $3-$4-$5"
          );
        }
        if (v.length === 7) {
          v = v.replace(/(\d{3})(\d{2})(\d{2})/, "$1-$2-$3");
        }
      }
      return v;
    },
    close() {
      let current_path = this.$router.currentRoute.path;
      let last = store.getters.last;
      store.dispatch("add_from", current_path);
      this.$router.push(last);
    }
  }
};
