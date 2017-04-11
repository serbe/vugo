<template>
  <div class="content">

    <!--<h2 class="has-text-centered">Справочник организаций</h2>-->
    <p>
      <a class="button" href="/company/">Добавить</a>
    </p>
    <p class="control">
      <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
    </p>
    <table class="table is-striped fixed_table">
      <thead>
        <tr>
          <th class="t30"><a>Наименование</a></th>
          <th class="t20 is-hidden-touch"><a>Адрес</a></th>
          <th class="t20 is-hidden-mobile"><a>Сфера деятельности</a></th>
          <th class="t10"><a>Телефон</a></th>
          <th class="t10 is-hidden-mobile"><a>Факс</a></th>
          <th class="t10 is-hidden-touch is-hidden-desktop-only"><a>Тренировки</a></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in companies">
          <td class="tvm"><router-link :to="'/company/' + item.id">{{ item.name }}</router-link></td>
          <td class="tvm is-hidden-touch">{{ item.address }}</td>
          <td class="tvm is-hidden-mobile">{{ item.scope_name }}</td>
          <td class="has-text-right tvm">
            <span v-for="phone in item.phones">{{ phone }}<br></span>
          </td>
          <td class="has-text-right tvm is-hidden-mobile">
            <span v-for="fax in item.faxes">{{ fax }}<br></span>
          </td>
          <td class="has-text-centered tvm is-hidden-touch is-hidden-desktop-only">
            <span v-for="practice in item.practices">{{ practice }}<br></span>
          </td>
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
    name: 'companies',
    data: () => ({
      companies: null,
      companiesList: null,
      isLoaded: false,
      searchText: '',
      column: 'name',
      paginate: 0,
      query: ''
    }),
    mounted () {
      fetch('http://localhost:9090/companies').then(r => r.json()).then((data) => {
        this.companiesList = data.companies
        this.isLoaded = true
        this.getCompanies()
      })
    },
    watch: {
      query: function (val, oldVal) {
        this.query = val
        if ((val.trim().length > 1) || (val.length === 0 && oldVal.length > 0)) {
          this.getCompanies()
        }
      }
    },
    methods: {
      getCompanies () {
        let queryArr = this.query.toLowerCase().split(' ')
        let companies = this.companiesList.filter((c) => {
          let str = [c.name, c.address, c.scope_name]
          if (c.phone) {
            str.push(c.phone.join(' '))
          }
          if (c.fax) {
            str.push(c.fax.join(' '))
          }
          if (c.practice) {
            str.push(c.practice.join(' '))
          }
          str = str.join(' ').toLowerCase()
          let filterQuery = queryArr.filter((q) => {
            return str.includes(q)
          })
          return filterQuery.length === queryArr.length
        })
        this.companies = companies.filter((c, i) => {
          return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
        })
      }
    }
  }
</script>

<style scoped>
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

  .t40 {
      width: 40% !important;
  }

  .t50 {
      width: 50% !important;
  }

  nav li {
    list-style-type: none;
  }
</style>
