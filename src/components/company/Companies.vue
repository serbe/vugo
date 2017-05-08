<template>
  <div>
    <vue-table
      name="company"
      :names="['Наименование', 'Адрес', 'Сфера деятельности', 'Телефон', 'Факс', 'Тренировки']"
      :columns="['name', 'address', 'scope_name', 'phones', 'faxes', 'practices']"
      :tableData="companiesList"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-touch', 'is-hidden-mobile', 'w94', 'is-hidden-touch w94', 'is-hidden-touch is-hidden-desktop-only w94']"
      pagination
      hyper
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
          if (c.phones.length > 0 && c.phones[0] !== '') {
            str.push(c.phones.join(' '))
          }
          if (c.faxes.length > 0 && c.faxes[0] !== '') {
            str.push(c.faxes.join(' '))
          }
          if (c.practices.length > 0 && c.practices[0] !== '') {
            str.push(c.practices.join(' '))
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
