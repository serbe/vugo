<template>
  <div>
    <vue-table
      :names="['Наименование', 'Адрес', 'Сфера деятельности', 'Телефон', 'Факс', 'Тренировки']"
      :columns="['name', 'address', 'scope_name', 'phones', 'faxes', 'practices']"
      :tableData="companiesList"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-touch', 'is-hidden-mobile', '', 'is-hidden-touch', 'is-hidden-touch is-hidden-desktop-only']"
      :cellClasses="['', 'is-hidden-touch', 'is-hidden-mobile', '', 'is-hidden-touch', 'is-hidden-touch is-hidden-desktop-only']"
      pagination
      hyper="company"
      search
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

</style>
