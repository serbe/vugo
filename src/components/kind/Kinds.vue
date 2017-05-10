<template>
  <div>
    <vue-table
      name="kind"
      :names="['Тип тренировки', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile']"
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
    name: 'kinds',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'kinds',
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
      createList (kinds) {
        let list = kinds.map(e => {
          let str = [e.name, e.note]
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
