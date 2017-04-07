<template>
  <div class="content">

    <h2 class="has-text-centered">Справочник организаций</h2>
    <p>
      <a class="button" href="/company/">Добавить</a>
    </p>
    <p class="control">
      <input class="input is-expanded" type="search" placeholder="Поиск" onkeyup="filter(this)" autofocus>
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
      paginate: 0
    }),
    mounted () {
      fetch('http://localhost:9090/companies').then(r => r.json()).then((data) => {
        this.companiesList = data.companies
        this.isLoaded = true
        this.companies = this.companiesList.filter((c, i) => {
          return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
        })
      })
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
