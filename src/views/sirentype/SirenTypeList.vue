<template>
  <div class="container">
    <bulma-table
      name="sirenType"
      :names="['Тип сирены', 'Радиус', 'Заметка']"
      :columns="['name', 'radius', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', '', 'is-hidden-mobile']"
      :cellTypes="['text', 'text', 'text']"
      pagination
      hyper
      search
      adding
    ></bulma-table>
  </div>
</template>

<script>
import BulmaTable from '@/components/BulmaTable'
import mix from '@/mixins/mix'

export default {
  name: 'SirenTypeList',
  components: {
    'bulma-table': BulmaTable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('sirentypes', 'siren_types')
  },
  methods: {
    createList (sirenTypes) {
      let list = []
      if (sirenTypes) {
        list = sirenTypes.map((e) => {
          const str = [e.name, e.radius, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
      }
      return list
    }
  }
}
</script>
