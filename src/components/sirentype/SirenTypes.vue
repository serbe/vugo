<template>
  <div class="container">
    <vue-table
      name="sirenType"
      :names="['Тип сирены', 'Радиус', 'Заметка']"
      :columns="['name', 'radius', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', '', 'is-hidden-mobile']"
      pagination
      hyper
      search
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import request from '@/request'

  export default {
    name: 'sirenTypes',
    components: {
      'vue-table': table
    },
    data: () => ({
      list: []
    }),
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        request({
          url: 'sirentypes',
          method: 'GET'
        })
        .then(r => {
          this.list = this.createList(r.data.siren_types)
        })
      },
      createList (sirenTypes) {
        let list = []
        if (sirenTypes) {
          list = sirenTypes.map(e => {
            let str = [e.name, e.radius, e.note]
            e.str = str.join(' ').toLowerCase()
            return e
          })
        }
        return list
      }
    }
  }
</script>

<style scoped>

</style>
