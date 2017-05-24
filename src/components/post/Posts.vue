<template>
  <div>
    <vue-table
      name="post"
      :names="['Наименование должности', 'ГО', 'Заметка']"
      :columns="['name', 'go', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'w9', 'is-hidden-mobile']"
      :cellTypes="['text', 'checkbox', 'text']"
      pagination
      hyper
      search
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import http from '@/http'

  export default {
    name: 'posts',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'posts',
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
        http({
          url: this.name,
          method: 'GET'
        })
        .then(r => {
          this.list = this.createList(r.data[this.name])
        })
      },
      createList (posts) {
        let list = []
        if (posts) {
          list = posts.map(e => {
            let str = [e.name, e.note]
            e.str = str.join(' ').toLowerCase()
            return e
          })
        }
        return list
      }
    }
  }
</script>

<style scoped>

</style>
