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

  export default {
    name: 'educations',
    components: {
      'vue-table': table
    },
    data: () => ({
      list: []
    }),
    mounted () {
      fetch('http://localhost:9090/' + this.name).then(r => r.json()).then((data) => {
        this.list = this.createList(data[this.name])
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
