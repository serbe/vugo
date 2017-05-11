<template>
  <div>
    <vue-table
      name="company"
      :names="['Наименование', 'Адрес', 'Сфера деятельности', 'Телефон', 'Факс', 'Тренировки']"
      :columns="['name', 'address', 'scope_name', 'phones', 'faxes', 'practices']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-touch', 'is-hidden-mobile', 'w9', 'is-hidden-touch w9', 'is-hidden-touch is-hidden-desktop-only w9']"
      :cellTypes="['text', 'text', 'text', 'array', 'array', 'array']"
      pagination
      hyper
      search
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import axios from 'axios'
  import mixin from '@/mixins/funcs'

  export default {
    name: 'companies',
    components: {
      'vue-table': table
    },
    mixins: [mixin],
    data: () => ({
      name: 'companies',
      list: []
    }),
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        axios.get('http://localhost:9090/' + this.name)
        .then(r => {
          this.list = this.createList(r.data[this.name])
        })
      },
      createList (companies) {
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
