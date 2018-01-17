<template>
  <div class="container">
    <vue-table
      name="kind"
      :names="['Тип тренировки', 'Сокращенное наименование', 'Заметка']"
      :columns="['name', 'short_name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', '', 'is-hidden-mobile']"
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
    name: 'kinds',
    components: {
      'vue-table': vtable
    },
    mixins: [mix],
    mounted () {
      this.fetchData('kinds')
    },
    methods: {
      createList (kinds) {
        let list = []
        if (kinds) {
          list = kinds.map((e) => {
            const str = [e.name, e.short_name, e.note]
            const ne = e
            ne.str = str.join(' ').toLowerCase()
            return ne
          })
        }
        return list
      }
    }
  }
</script>
