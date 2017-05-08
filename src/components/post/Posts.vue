<template>
  <div>
    <vue-table
      name="post"
      :names="['Наименование должности', 'ГО', 'Заметка']"
      :columns="['name', 'go', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', '', 'is-hidden-mobile']"
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
    name: 'posts',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'posts',
      list: []
    }),
    mounted () {
      axios.get('http://localhost:9090/' + this.name)
      .then(r => {
        this.list = this.createList(r.data[this.name])
      })
    },
    methods: {
      createList (posts) {
        let list = posts.map(e => {
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
