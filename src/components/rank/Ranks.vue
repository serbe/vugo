<template>
  <div>
    <vue-table
      name="rank"
      :names="['Наименование', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="ranksList"
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
      ranksList: null,
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/ranks').then(r => r.json()).then((data) => {
        this.ranksList = this.createRanksList(data.ranks)
        this.isLoaded = true
      })
    },
    methods: {
      createRanksList (ranks) {
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
