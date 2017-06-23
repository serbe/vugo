<template>
  <div class="container">
    <vue-table
      name="education"
      :names="['Начало обучения', 'Конец обучения', 'Заметка']"
      :columns="['start_str', 'end_str', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', '', 'is-hidden-mobile']"
      pagination
      hyper
      search
    ></vue-table>
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import request from '@/request'

  export default {
    name: 'educations',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'educations',
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
      createList (educations) {
        let list = []
        if (educations) {
          list = educations.map(e => {
            let str = [e.start_str, e.end_str, e.note]
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
