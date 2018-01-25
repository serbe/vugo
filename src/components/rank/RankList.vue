<template>
  <div class="container">
    <vue-table
      name="rank"
      :names="['Наименование чина', 'Заметка']"
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
  name: 'RankList',
  components: {
    'vue-table': VueTable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('ranks')
  },
  methods: {
    createList (ranks) {
      let list = []
      if (ranks) {
        list = ranks.map((e) => {
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
