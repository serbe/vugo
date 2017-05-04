<template>
<div>
    <nav class="nav">
      <div class="nav-left">
        <p class="nav-item">
          <a class="button mb1" href="/company/0">Добавить</a>
        </p>
      </div>
      <div class="nav-rigth">
        <p class="nav-item">
          <span class="select">
            <select v-model="rowsPerPage">
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>100</option>
            </select>
          </span>
        </p>
      </div>
    </nav>
    <p class="control" v-if="search">
      <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
    </p>
    <table class="table">
      <thead>
        <tr>
          <th v-for="name in head">{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rows">
          <td v-for="name in body">{{ item[name] }}</td>
        </tr>
      </tbody>
    </table>
    <vue-pagination v-if="pagination" :page="page" :allElems="all" :perPage="rowsPerPage" @pagination="filter"/>
  </div>
</template>

<script>
  import pagination from '@/elements/Pagination'

  export default {
    name: 'vue-table',
    components: {
      'vue-pagination': pagination
    },
    data: function () {
      return {
        query: '',
        page: 1,
        list: []
      }
    },
    props: {
      columns: {
        type: Array,
        required: false
      },
      names: {
        type: Array,
        required: false
      },
      headClasses: {
        type: Array,
        required: false
      },
      cellClasses: {
        type: Array,
        required: false
      },
      tableClasses: {
        type: Array,
        required: false
      },
      tableData: {
        type: Array,
        required: true
      },
      search: {
        type: Boolean,
        default: false,
        required: false
      },
      pagination: {
        type: Boolean,
        default: false,
        required: false
      },
      rowsPerPage: {
        type: Number,
        default: 50,
        required: false
      }
    },
    computed: {
      head: function () {
        return this.names ? this.names : Object.keys(this.tableData[0])
      },
      body: function () {
        return this.columns ? this.columns : Object.keys(this.tableData[0])
      },
      rows: function () {
        let result = []
        if (this.tableData.length > 0) {
          result = this.tableData.filter((c, i) => {
            return i >= (this.page - 1) * this.rowsPerPage && i < this.page * this.rowsPerPage
          })
        }
        return result
      },
      all () {
        return this.filtered ? this.filtered.length : 0
      },
      filtered () {
        if (this.tableData) {
          let queryArr = this.query.toLowerCase().split(' ')
          let filteredData = this.tableData.filter((c) => {
            return queryArr.every(e => c.str.includes(e))
          })
          return filteredData
        } else {
          return []
        }
      }
    },
    methods: {
      click () {
        this.$emit('click')
      },
      headClass: function (index) {
        return this.headClasses ? this.headClasses[index] : []
      },
      cellClass: function (index) {
        return this.cellClasses ? this.cellClasses[index] : []
      },
      filter: function (num) {
        if (num !== this.page) {
          this.page = num
        }
      }
    }
  }
</script>

