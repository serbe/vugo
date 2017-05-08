<template>
  <div>
    <vue-table
      name="education"
      :names="['Начало обучения', 'Конец обучения', 'Заметка']"
      :columns="['start_str', 'end_str', 'note']"
      :tableData="educationsList"
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
      educationsList: [],
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/educations').then(r => r.json()).then((data) => {
        this.educationsList = this.createEducationsList(data.educations)
        this.isLoaded = true
      })
    },
    methods: {
      createEducationsList (educations) {
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
