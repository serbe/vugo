<template>
  <div>
    <nav v-if="adding" class="level is-mobile">
      <div class="level-left">
        <p class="level-item">
          <a class="button" :href="'/' + this.name + '/0'">Добавить</a>
        </p>
      </div>
      <div class="level-rigth">
        <p class="level-item">
          <span class="select">
            <select v-model="rowsSelect">
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
    <p class="control mb1" v-if="search">
      <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
    </p>
    <vue-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter"></vue-pagination>
    <table class="table center-table" :class="tableClass">
      <thead>
      <tr>
        <th v-for="(name, index) in head" v-bind:key="index" :class="headClass(index)">{{ name }}</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="hyper">
        <tr v-for="(item, key) in rows" v-bind:key="key" @click="onClickTr(item)" class="link">
          <td v-for="(name, index) in body" v-bind:key="index" :class="cellClass(index)">
            <vue-cell :type="cellType(index)" :value="item[name]"></vue-cell>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(item, key) in rows" v-bind:key="key">
          <td v-for="(name, index) in body" v-bind:key="index" :class="cellClass(index)">
            <vue-cell :type="cellType(index)" :value="item[name]"></vue-cell>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <vue-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter"></vue-pagination>
  </div>
</template>

<script>
  import pagination from '@/elements/Pagination'
  import cell from '@/elements/Cell'

  export default {
    name: 'vue-table',
    components: {
      'vue-pagination': pagination,
      'vue-cell': cell
    },
    data () {
      return {
        query: '',
        page: 1,
        list: [],
        rowsSelect: 50
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      columns: {
        type: Array,
        required: false
      },
      names: {
        type: Array,
        required: false
      },
      tableClasses: {
        type: String,
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
      cellTypes: {
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
      },
      hyper: {
        type: Boolean,
        default: false,
        required: false
      },
      adding: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    computed: {
      head () {
        return this.names ? this.names : Object.keys(this.tableData[0])
      },
      body () {
        return this.columns ? this.columns : Object.keys(this.tableData[0])
      },
      rows () {
        let result = []
        if (this.filtered) {
          const tp = this.page
          const pp = this.perPage
          result = this.filtered.filter((c, i) => i >= (tp - 1) * pp && i < tp * pp)
        }
        return result
      },
      all () {
        return this.filtered ? this.filtered.length : 0
      },
      filtered () {
        if (this.tableData) {
          const queryArr = this.query.toLowerCase().split(' ')
          return this.tableData.filter(f => queryArr.every(q => f.str.includes(q)))
        }
        return []
      },
      tableClass () {
        return this.tableClasses ? this.tableClasses : ''
      },
      perPage () {
        return Number(this.rowsSelect)
      }
    },
    mounted () {
      if (this.pagination && this.rowsPerPage > 0 && this.rowsPerPage !== this.rowsSelect) {
        this.rowsSelect = this.rowsPerPage
      }
    },
    methods: {
      onClickTr (item) {
        if ('id' in item) {
          this.$router.push(`/${this.name}/${item.id}`)
        }
      },
      headClass (index) {
        return this.headClasses ? this.headClasses[index] : ''
      },
      cellClass (index) {
        return this.cellClasses ? this.cellClasses[index] : this.headClass(index)
      },
      cellType (index) {
        return this.cellTypes ? this.cellTypes[index] : ''
      },
      filter (num) {
        if (num !== this.page) {
          this.page = num
        }
      }
    },
    watch: {
      query (val) {
        this.query = val
        this.page = 1
      }
    }
  }
</script>

<style scoped>
  .link {
    cursor: pointer !important;
  }

  .mb1 {
    margin-bottom: 1rem;
  }

  /*.fixed_table {*/
  /*table-layout: fixed !important;*/
  /*}*/

  .center-table {
    margin: auto;
  }

  .fullwidth {
    width: 100%;
  }

  .nowrap {
    white-space: nowrap;
  }
</style>
