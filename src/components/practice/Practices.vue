<template>
  <div class="container">
    <vue-table
      name="practice"
      :names="['Дата тренировки', 'Тип тренировки', 'Организация']"
      :columns="['date_str', 'kind_name', 'company_name']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['nowrap', '', 'is-hidden-mobile']"
      :cellTypes="['text', 'text', 'text']"
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
    name: 'practices',
    components: {
      'vue-table': vtable
    },
    mixins: [mix],
    mounted () {
      this.fetchData('practices')
    },
    methods: {
      createList (practices) {
        let list = []
        if (practices) {
          list = practices.map((e) => {
            const str = [e.date_str, e.kind_name, e.note]
            e.str = str.join(' ').toLowerCase()
            return e
          })
        }
        return list
      }
    }
  }
</script>
