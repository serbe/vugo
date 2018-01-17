<template>
  <div class="container">
    <vue-table
      name="sirenType"
      :names="['Тип сирены', 'Радиус', 'Заметка']"
      :columns="['name', 'radius', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', '', 'is-hidden-mobile']"
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
    name: 'sirenTypes',
    components: {
      'vue-table': vtable
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
