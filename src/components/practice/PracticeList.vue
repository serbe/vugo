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
import VueTable from '@/elements/VueTable'
import mix from '@/mixins/mix'

export default {
  name: 'PracticeList',
  components: {
    'vue-table': VueTable
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
          const str = [e.date_str, e.kind_name, e.company_name]
          e.str = str.join(' ').toLowerCase()
          return e
        })
      }
      return list
    }
  }
}
</script>
