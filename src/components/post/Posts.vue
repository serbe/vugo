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

  export default {
    name: 'posts',
    components: {
      'vue-table': table
    },
    data: () => ({
      list: []
    }),
    mounted () {
      fetch('http://localhost:9090/' + this.name).then(r => r.json()).then((data) => {
        this.list = this.createList(data[this.name])
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
