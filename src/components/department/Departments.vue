<template>
  <div>
    <vue-table
      name="department"
      :names="['Наименование отдела', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile']"
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
    name: 'departments',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'departments',
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
          url: this.name,
          method: 'GET'
        })
        .then(r => {
          this.list = this.createList(r.data[this.name])
        })
      },
      createList (departments) {
        let list = []
        if (departments) {
          list = departments.map(e => {
            let str = [e.name, e.note]
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
