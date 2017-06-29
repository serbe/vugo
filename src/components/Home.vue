<template>
  <div class="container">
    <div class="content has-text-centered">
      <div class="columns">
        <div class="column is-half">
        </div>
        <div class="column">
          <table class="table">
            <tbody>
              <tr v-for="(item, index) in practicesList" v-bind:key="index" :class="trClass(item.date_of_practice)">
                <td><a :href="'/practice/' + item.id">{{ tinyDate(item.date_of_practice) }}</a></td>
                <td><a :href="'/practice/' + item.id">{{ item.kind_short_name }}</a></td>
                <td><a :href="'/company/' + item.company_id">{{ item.company_name }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/request'

export default {
  name: 'home',
  data () {
    return {
      fetched: false,
      practicesList: []
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuth
    }
  },
  created () {
    this.fetchPractices()
  },
  methods: {
    fetchPractices () {
      if (this.auth && !this.fetched) {
        request({
          url: 'practices/near',
          method: 'GET'
        })
        .then(r => {
          this.practicesList = this.createList(r.data['practices'])
          this.fetched = true
        })
      }
    },
    createList (practices) {
      let practicesList = []
      if (practices) {
        practicesList = practices.map(e => {
          const str = [e.date_str, e.kind_name, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
      }
      return practicesList
    },
    trClass (date) {
      var m = new Date()
      var d = new Date(date)
      if (d < m) {
        return 'is-success'
      }
      d.setMonth(d.getMonth() + 1)
      if (d < m) {
        return 'is-danger'
      }
      return 'is-warning'
    },
    tinyDate (date) {
      // 2017-10-16
      if (date.length === 10) {
        return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(2, 4)
      }
    }
  }
}
</script>

<style scoped>
tr.is-success {
  background-color: #23d160;
  color: #fff;
}

tr.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

tr.is-danger {
  background-color: #ff3860;
  color: #fff;
}
</style>
