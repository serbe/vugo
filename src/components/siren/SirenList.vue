<template>
  <div class="container">
    <vue-table
      name="siren"
      :names="['Тип сирены', 'Адрес', 'Ответственный', 'Телефоны']"
      :columns="['siren_type_name', 'address', 'contact_name', 'phones']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-mobile', '', 'nowrap']"
      :cellTypes="['text', 'text', 'text', 'array']"
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
  name: 'SirenList',
  components: {
    'vue-table': VueTable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('sirens')
  },
  methods: {
    createList (sirens) {
      let list = []
      if (sirens) {
        list = sirens.map((e) => {
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
