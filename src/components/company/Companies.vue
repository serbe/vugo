<template>
  <div>

    <!--<h2 class="has-text-centered">Справочник организаций</h2>-->
    <a class="button" href="/company/">Добавить</a>
    <b-field>
      <b-input placeholder="Поиск..." icon="search" v-model="query" autofocus>
      </b-input>
    </b-field>

    <b-table
      :data="companies"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :selectable="isSelectable"
      :checkable="isCheckable"
      :mobile-cards="hasMobileCards"
      :paginated="isPaginated"
      :per-page="perPage"
      :pagination-simple="isPaginationSimple"
      default-sort="name"
      @check="checked"
      @select="selected">

      <b-table-column field="name" label="Наименование" sortable></b-table-column>
      <b-table-column field="address" label="Адрес" sortable></b-table-column>
      <b-table-column field="scope_name" label="Сфера деятельности" sortable></b-table-column>
      <b-table-column field="phones" label="Телефон" :format="formatArray" numeric></b-table-column>
      <b-table-column field="faxes" label="Факс" :format="formatArray" numeric></b-table-column>
      <b-table-column field="practices" label="Тренировки" :format="formatArray" numeric></b-table-column>

    </b-table>
  </div>
</template>

<script>
  export default {
    name: 'companies',
    data: () => ({
      companies: [],
      companiesList: [],
      isLoaded: false,
      query: '',
      selItem: {},
      isBordered: false,
      isStriped: true,
      isNarrowed: true,
      isSelectable: false,
      isCheckable: false,
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: false,
      perPage: 50
    }),
    mounted () {
      fetch('http://localhost:9090/companies').then(r => r.json()).then((data) => {
        this.companiesList = this.createCompaniesList(data.companies)
        this.isLoaded = true
        this.filterCompanies()
      })
    },
    watch: {
      query: function (val, oldVal) {
        this.query = val
        this.filterCompanies()
      }
    },
    methods: {
      createCompaniesList (companies) {
        let list = companies.map(c => {
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
          c.str = str.join(' ').toLowerCase()
          return c
        })
        return list
      },
      filterCompanies () {
        let queryArr = this.query.toLowerCase().split(' ')
        this.companies = this.companiesList.filter((c) => {
          return queryArr.every(e => c.str.includes(e))
        })
      },
      formatArray (value, row) {
        if (value) {
          return value.join(' ')
        }
        return
      },
      checked (items, item) {
        this.checkItems = items
      },
      selected (item) {
        this.selItem = item
      }
    }
  }
</script>

<style scoped>
  .section {
    padding-top: 1.5rem !important;
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
