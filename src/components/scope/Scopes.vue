<template>
  <div>
    <p>
      <a class="button mb1" href="/rank/">Добавить</a>
    </p>
    <p class="control">
      <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
    </p>
    <table class="table is-striped fixed_table">
      <thead>
        <tr>
          <th>Наименование</th>
          <th class="is-hidden-mobile"><a>Заметка</a></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in ranks" @click="onClick(item)" class="link">
          <td class="tvm">{{ item.name }}</td>
          <td class="tvm is-hidden-mobile">{{ item.note }}</td>
        </tr>
      </tbody>
    </table>
    <nav class="pagination is-centered">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li><a class="pagination-link">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">45</a></li>
        <li><a class="pagination-link is-current">46</a></li>
        <li><a class="pagination-link">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">86</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'ranks',
    data: () => ({
      ranks: null,
      ranksList: null,
      isLoaded: false,
      searchText: '',
      paginate: 0,
      query: ''
    }),
    mounted () {
      fetch('http://localhost:9090/ranks').then(r => r.json()).then((data) => {
        this.ranksList = this.createRanksList(data.ranks)
        this.isLoaded = true
        this.filterRanks()
      })
    },
    watch: {
      query: function (val, oldVal) {
        this.query = val
        this.filterRanks()
      }
    },
    methods: {
      onClick (item) {
        this.$router.push('/rank/' + item.id)
      },
      createRanksList (ranks) {
        let list = ranks.map(e => {
          let str = [e.name, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
        return list
      },
      filterRanks () {
        let queryArr = this.query.toLowerCase().split(' ')
        let ranks = this.ranksList.filter((f) => {
          return queryArr.every(e => f.str.includes(e))
        })
        this.ranks = ranks.filter((f, i) => {
          return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
        })
      }
    }
  }
</script>

<style scoped>
  .link {
    cursor: pointer !important;
  }

  a {
    color: #1f2d3d;
    text-decoration: none;
    /*word-break: break-word !important;*/
  }

  th {
    vertical-align: middle;
  }

  /*.fixed_table {
      table-layout: fixed !important;
  }*/

  .t10 {
    width: 10% !important;
  }

  .t20 {
    width: 20% !important;
  }

  .t30 {
    width: 30% !important;
  }

  .mb1 {
    margin-bottom: 1em;
  }
</style>
