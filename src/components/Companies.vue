<template>
  <div class="content">

    <h2 class="has-text-centered">Справочник организаций</h2>
    <p>
      <a class="button" href="/company/edit">Добавить</a>
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
          <th class="t10 is-hidden-touch is-hidden-desktop-only"><a>Даты тренировок</a></th>
        </tr>
      </thead>
      <tbody>
          <!--{{ range $company := .CompaniesList }}-->
        <tr v-for="(item, idx) in companies">
          <td class="tvm"><a href="/company/edit/">{{ item.name }}</a></td>
          <td class="tvm is-hidden-touch">{{ item.Address }}</td>
          <td class="tvm is-hidden-mobile">{{ item.ScopeName }}</td>
          <td class="has-text-right tvm">
            <!--{{ range $phone := $company.Phones }}
            <span class="phoneNumber">{{ $phone }}</span>
            <br/>
            {{ end }}-->
          </td>
          <td class="has-text-right tvm is-hidden-mobile">
            <!--{{ range $fax := $company.Faxes }}
            <span class="phoneNumber">{{ $fax }}</span>
            <br/>
            {{ end }}-->
          </td>
          <td class="has-text-centered tvm is-hidden-touch is-hidden-desktop-only">
            <!--{{ range $practice := $company.Practices }}
            <span class="practice">{{ $practice }}</span>
            <br/>
            {{ end }}-->
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--<el-table :data="companies" stripe style="width: 100%">
    <el-table-column prop="name" label="Наименование">
      <template scope="scope">
        <router-link :to="'company/' + scope.row.id">{{ scope.row.name }}</router-link>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="Адрес"></el-table-column>
    <el-table-column prop="scope_name" label="Сфера деятельности"></el-table-column>
    <el-table-column prop="phones" label="Телефон" width="150">
      <template scope="scope">
        <span v-for="item in scope.row.phones">{{ item }}<br></span>
      </template>
    </el-table-column>
    <el-table-column prop="faxes" label="Факс" width="150">
      <template scope="scope">
        <span v-for="item in scope.row.faxes">{{ item }}<br></span>
      </template>
    </el-table-column>
    <el-table-column prop="practices" label="Тренировки" width="120">
      <template scope="scope">
        <span v-for="item in scope.row.practices">{{ item }}<br></span>
      </template>
    </el-table-column>
  </el-table>-->
  <!--<ul>
    <li v-for="(item, id) in companies">{{ item.name }}</li>
  </ul>-->
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
      fetch('http://localhost:9090/api/companies').then(r => r.json()).then((data) => {
        this.companiesList = data.companies_list
        this.isLoaded = true
        this.companies = this.companiesList.filter((c, i) => {
          return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
        })
      })
    }
    // created: function () {
    //   this.fetchData()
    // },
    // methods: {
    //   fetchData: function () {
    //     axios.get('http://localhost:9090/api/companies')
    //     .then(response => {
    //       const jsondata = response.data
    //       if (jsondata) {
    //         this.companiesList = jsondata.companies_list
    //         this.isLoaded = true
    //         this.companies = this.companiesList.filter((c, i) => {
    //           return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
    //         })
    //       }
    //     })
    //     .catch(e => {
    //       console.log(e)
    //     })
    //   }
    // }
  }
</script>

<style scoped>
  a {
    color: #1f2d3d;
    text-decoration: none;
    word-break: break-word !important;
  }

  div .cell {
    word-break: break-word !important;
  }

  .fixed_table {
      table-layout: fixed !important;
  }

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

  .table a {
      border-bottom-style: none !important;
      color: #222324;
  }
</style>
