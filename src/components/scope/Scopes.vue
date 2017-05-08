<template>
  <div>
    <vue-table
      name="scope"
      :names="['Наименование', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="scopesList"
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
    name: 'scopes',
    components: {
      'vue-table': table
    },
    data: () => ({
      scopesList: null,
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/scopes').then(r => r.json()).then((data) => {
        this.scopesList = this.createScopesList(data.scopes)
        this.isLoaded = true
      })
    },
    methods: {
      createScopesList (scopes) {
        let list = scopes.map(e => {
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
