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
            <select v-model="perPage">
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
    <table class="table" :class="tableClasses">
      <thead>
        <tr v-for="(name, index) in head">
          <th :class="headClass(index)">{{ name }}</th>
        </tr>
      </thead>
      <tbody v-for="item in table">
        <tr v-for="(name, index) in head">
          <td :class="cellClass(index)">{{ item[name] }}</td>
        </tr>
      </tbody>
    </table>
    <vue-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="pagination"/>
  </div>
</template>

<script>
  export default {
    name: 'vue-table',
    data: function () {
      return {
        query: ''
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
      table: {
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
      }
    },
    computed: {
      head: function () {
        return this.names ? Object.keys(this.table) : this.columns
      },
      headClass: function (index) {
        return this.headClasses ? this.headClasses[index] : []
      },
      aClassList: function () {
        var res = ['button']
        if (this.color) {
          res.push(this.color.split(' ').map(e => { return 'is-' + e }))
        }
        if (this.size) {
          res.push(this.size.split(' ').map(e => { return 'is-' + e }))
        }
        if (this.state) {
          res.push(this.state.split(' ').map(e => { return 'is-' + e }))
        }
        return res
      }
    },
    methods: {
      click () {
        this.$emit('click')
      }
    }
  }
</script>
