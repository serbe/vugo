<template>
  <div class="container">
    <vue-table
      name="kind"
      :names="['Тип тренировки', 'Сокращенное наименование', 'Заметка']"
      :columns="['name', 'short_name', 'note']"
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
import request from '@/request'

export default {
  name: 'kinds',
  components: {
    'vue-table': vtable
  },
  data () {
    return {
      fetched: false,
      list: []
    }
  },
  created () {
    this.fetchData()
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.fetchData()
  //   }
  // },
  methods: {
    fetchData () {
      if (!this.fetched) {
        request({
          url: 'kinds',
          method: 'GET'
        })
          .then((r) => {
            this.list = this.createList(r.data.kinds)
            this.fetched = true
          })
      }
    },
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
