export default {
  methods: {
    checkArray(values, key) {
      let firstElem = -1;
      let emptyElem = 0;
      let fillElem = 0;
      values.all((e, i) => {
        if (e[key] === '') {
          if (firstElem === -1) {
            firstElem = i;
          }
          emptyElem += 1;
        } else {
          fillElem += 1;
        }
      });
      if (emptyElem > 1) {
        values.splice(firstElem, 1);
      }
      return fillElem === values.length;
    },
    filterArray(values, key) {
      values.filter(e => e[key] && e[key] !== '');
      return values;
    },
    telephone(value) {
      let v = value;
      if (v !== undefined && v.length > 0) {
        v = v.replace(/[^0-9]/g, '');
        if (v.length === 10) {
          v = v.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
        }
        if (v.length === 11) {
          if (v[0] === '8') {
            v = `7${v.slice(1)}`;
          }
          v = v.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
        }
        if (v.length === 7) {
          v = v.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
        }
      }
      return v;
    },
  },
};
