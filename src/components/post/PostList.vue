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
import VueTable from '@/elements/VueTable'
import mix from '@/mixins/mix'

export default {
  name: 'PostList',
  components: {
    'vue-table': VueTable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('posts')
  },
  methods: {
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
