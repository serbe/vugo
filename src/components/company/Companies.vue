<template>
  <div>

    <!--<h2 class="has-text-centered">Справочник организаций</h2>-->
    <a class="button mb1" href="/company/">Добавить</a>
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
      :html="isHtml"
      default-sort="name"
      @check="checked"
      @select="selected"
      @click="clicked">

      <b-table-column field="name" label="Наименование" sortable></b-table-column>
      <b-table-column field="address" label="Адрес" sortable></b-table-column>
      <b-table-column field="scope_name" label="Сфера деятельности" sortable></b-table-column>
      <b-table-column field="phones" label="Телефон" :format="formatArray" numeric></b-table-column>
      <b-table-column field="faxes" label="Факс" :format="formatArray" numeric></b-table-column>
      <b-table-column field="practices" label="Тренировки" :format="formatDate" numeric></b-table-column>

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
      perPage: 50,
      isHtml: false
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
      formatDate (value, row) {
        let fmt = []
        value.map(e => {
          let splitDate = e.split('-')
          if (splitDate.length > 1) {
            fmt.push(splitDate[2] + '.' + splitDate[1] + '.' + splitDate[0])
          }
        })
        return fmt.join(' ')
      },
      clicked (row) {
        this.$router.push('/company/' + row.id)
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
  .mb1 {
    margin-bottom: 1rem;
  }
</style>
