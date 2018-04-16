import request from '@/request'

export default {
  data () {
    return {
      fetched: false,
      list: []
    }
  },
  methods: {
    fetchItem (name, values) {
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
          })
      }
    }
  }
}
