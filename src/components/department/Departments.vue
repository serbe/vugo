<template>
  <div>
    <vue-table
      name="department"
      :names="['Наименование', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="departmentsList"
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

  export default {
    name: 'departments',
    components: {
      'vue-table': table
    },
    data: () => ({
      departmentsList: [],
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/departments').then(r => r.json()).then((data) => {
        this.departmentsList = this.createDepartmentsList(data.departments)
        this.isLoaded = true
      })
    },
    methods: {
      createDepartmentsList (departments) {
        let list = departments.map(e => {
          let str = [e.name, e.note]
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
