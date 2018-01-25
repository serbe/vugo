<template>
  <div class="container">
    <vue-table
      name="department"
      :names="['Наименование отдела', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-mobile']"
      :cellTypes="['text', 'text']"
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
  name: 'DepartmentList',
  components: {
    'vue-table': VueTable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('departments')
  },
  methods: {
    createList (departments) {
      let list = []
      if (departments) {
        list = departments.map((e) => {
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
