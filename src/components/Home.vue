<template>
  <div class="content has-text-centered">
    <div class="columns">
      <div class="column is-one-third">
      </div>
      <div class="column">
        <table class="table is-striped">
          <thead>
            <tr>
              <th><a>Дата тренировки</a></th>
              <th><a>Тип тренировки</a></th>
              <th><a>Организация</a></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in practicesList" v-bind:key="index">
              <td><a :href="'/practice/' + item.id">{{ item.date_str }}</a></td>
              <td><a :href="'/practice/' + item.id">{{ item.kind_name }}</a></td>
              <td><a :href="'/company/' + item.company_id">{{ item.company_name }}</a></td>
            </tr>
          </tbody>
        </table>
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
    }
  }
}
</script>

<style scoped>

</style>
