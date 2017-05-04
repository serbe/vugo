<template>
  <div>
    <p>
      <a class="button mb1" href="/practice/">Добавить</a>
    </p>
    <p class="control">
      <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
    </p>
    <table class="table is-striped fixed_table">
      <thead>
        <tr>
          <th>Дата тренировки</th>
          <th>Тип тренировки</th>
          <th class="is-hidden-mobile"><a>Заметка</a></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in practices" @click="onClick(item)" class="link">
          <td class="tvm">{{ item.date_str }}</td>
          <td class="tvm">{{ item.kind_name }}</td>
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
    name: 'practices',
    data: () => ({
      practices: null,
      practicesList: null,
      isLoaded: false,
      searchText: '',
      paginate: 0,
      query: ''
    }),
    mounted () {
      fetch('http://localhost:9090/practices').then(r => r.json()).then((data) => {
        this.practicesList = this.createPracticesList(data.practices)
        this.isLoaded = true
        this.filterPractices()
      })
    },
    watch: {
      query: function (val) {
        this.query = val
        this.filterPractices()
      }
    },
    methods: {
      onClick (item) {
        this.$router.push('/practice/' + item.id)
      },
      createPracticesList (practices) {
        let list = practices.map(e => {
          let str = [e.date_str, e.kind_name, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
        return list
      },
      filterPractices () {
        let queryArr = this.query.toLowerCase().split(' ')
        let practices = this.practicesList.filter((f) => {
          return queryArr.every(e => f.str.includes(e))
        })
        this.practices = practices.filter((f, i) => {
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

  .mb1 {
    margin-bottom: 1em;
  }
</style>
