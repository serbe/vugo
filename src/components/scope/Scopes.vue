<template>
  <div>
    <vue-table
      name="scope"
      :names="['Сфера деятельности', 'Заметка']"
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
    name: 'scopes',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'scopes',
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
      createList (scopes) {
        let list = scopes.map(e => {
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
