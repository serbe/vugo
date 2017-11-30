<template>
  <div class="container">
    <vue-table
      name="scope"
      :names="['Сфера деятельности', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-mobile']"
      pagination
      hyper
      search
      adding
    ></vue-table>
   </div>
</template>

<script>
import vtable from '@/elements/Table'
import mix from '@/mixins/mix'

export default {
  name: 'scopes',
  components: {
    'vue-table': vtable
  },
  mixin: [mix],
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
