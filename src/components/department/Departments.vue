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
  import vtable from '@/elements/Table'
  import mix from '@/mixins/mix'

  export default {
    name: 'departments',
    components: {
      'vue-table': vtable
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
