<template>
  <div class="container">
    <bulma-table
      name="scope"
      :names="['Сфера деятельности', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-mobile']"
      :cellTypes="['text', 'text']"
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
  name: 'ScopeList',
  components: {
    'bulma-table': BulmaTable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('scopes')
  },
  methods: {
    createList (scopes) {
      let list = []
      if (scopes) {
        list = scopes.map((e) => {
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
