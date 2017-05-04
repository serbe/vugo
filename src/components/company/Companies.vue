<template>
  <div>
    <vue-table
      :names="['Наименование', 'Адрес', 'Сфера деятельности', 'Телефон', 'Факс', 'Тренировки']"
      :columns="['name', 'address', 'scope_name', 'phones', 'faxes', 'practices']"
      :tableData="companiesList"
      pagination
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'

  export default {
    name: 'companies',
    components: {
      'vue-table': table
    },
    data: () => ({
      companies: [],
      companiesList: [],
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/companies').then(r => r.json()).then((data) => {
        this.companiesList = this.createCompaniesList(data.companies)
        this.isLoaded = true
      })
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
