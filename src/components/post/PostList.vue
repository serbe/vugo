<template>
  <div class="container">
    <bulma-table
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
    ></bulma-table>
  </div>
</template>

<script>
import BulmaTable from '@/elements/BulmaTable'
import mix from '@/mixins/mix'

export default {
  name: 'PostList',
  components: {
    'bulma-table': BulmaTable
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
