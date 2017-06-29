<template>
  <div class="container">
    <vue-table
      name="rank"
      :names="['Наименование чина', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile']"
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
    name: 'ranks',
    components: {
      'vue-table': vtable
    },
    data: () => ({
      name: 'ranks',
      fetched: false,
      list: []
    }),
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
            url: this.name,
            method: 'GET'
          })
          .then(r => {
            this.list = this.createList(r.data[this.name])
            this.fetched = true
          })
        }
      },
      createList (ranks) {
        let list = []
        if (ranks) {
          list = ranks.map(e => {
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

<style scoped>

</style>
