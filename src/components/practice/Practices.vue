<template>
  <div>
    <vue-table
      name="practice"
      :names="['Дата тренировки', 'Тип тренировки', 'Организация']"
      :columns="['date_str', 'kind_name', 'company_name']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['w16', '', 'is-hidden-mobile']"
      pagination
      hyper
      search
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import axios from 'axios'

  export default {
    name: 'practices',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'practices',
      list: []
    }),
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        axios.get('http://localhost:9090/' + this.name)
        .then(r => {
          this.list = this.createList(r.data[this.name])
        })
      },
      createList (practices) {
        let list = practices.map(e => {
          let str = [e.date_str, e.kind_name, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
        return list
      }
    }
  }
</script>

<style scoped>

</style>
