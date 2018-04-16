import request from '@/request'

export default {
  data () {
    return {
      fetched: false,
      list: []
    }
  },
  methods: {
    fetchItem (name, values, afterFetch) {
      if (!this.fetched) {
        request({
          url: `${name}/${this.$route.params.id}`,
          method: 'GET'
        })
          .then((r) => {
            values.forEach((e) => {
              this[e] = r.data[e]
            })
            this.fetched = true
            if (afterFetch) {
              this.afterFetch()
            }
          })
      }
    },
    setSelect (root, list, item, value) {
      this[root][item] = this[list].find(v => v.id === this[root][value])
    }
    // onSelect (item, name, itemName) {
    //   this[name][itemName] = item
    //   this[name][`${itemName}_id`] = item.id
    // }
  }
}
