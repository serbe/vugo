<template>
  <div>
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
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import axios from 'axios'

  export default {
    name: 'educations',
    components: {
      'vue-table': table
    },
    data: () => ({
      name: 'educations',
      list: []
    }),
    mounted () {
      axios.get('http://localhost:9090/' + this.name)
      .then(r => {
        this.list = this.createList(r.data[this.name])
      })
    },
    methods: {
      createList (educations) {
        let list = educations.map(e => {
          let str = [e.start_str, e.end_str, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
        return list
      }
    }
  }
</script>

<style scoped>

</style>
