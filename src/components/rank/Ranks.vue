<template>
  <div>
    <vue-table
      name="rank"
      :names="['Наименование', 'Заметка']"
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

  export default {
    name: 'ranks',
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
      createList (ranks) {
        let list = ranks.map(e => {
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
