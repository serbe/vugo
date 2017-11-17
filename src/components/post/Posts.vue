<template>
  <div class="container">
    <vue-table
      name="post"
      :names="['Наименование должности', 'ГО', 'Заметка']"
      :columns="['name', 'go', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'w9', 'is-hidden-mobile']"
      :cellTypes="['text', 'checkbox', 'text']"
      pagination
      hyper
      search
      adding
    ></vue-table>
  </div>
</template>

<script>
import vtable from '@/elements/Table'
import request from '@/request'

export default {
  name: 'posts',
  components: {
    'vue-table': vtable
  },
  data () {
    return {
      fetched: false,
      list: []
    }
  },
  created () {
    this.fetchData()
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.fetchData()
  //   }
  // },
  methods: {
    fetchData () {
      if (!this.fetched) {
        request({
          url: 'posts',
          method: 'GET'
        })
          .then((r) => {
            this.list = this.createList(r.data.posts)
            this.fetched = true
          })
      }
    },
    createList (posts) {
      let list = []
      if (posts) {
        list = posts.map((e) => {
          const str = [e.name, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
      }
      return list
    }
  }
}
</script>
