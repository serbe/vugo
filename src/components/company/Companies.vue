<template>
  <div class="container">
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
      adding
    ></vue-table>
  </div>
</template>

<script>
  import vtable from '@/elements/Table'
  import mixin from '@/mixins/funcs'
  import request from '@/request'

  export default {
    name: 'companies',
    components: {
      'vue-table': vtable
    },
    mixins: [mixin],
    data: () => ({
      name: 'companies',
      fetched: false,
      list: []
    }),
    created () {
      this.fetchData()
    },
    // watch: {
    //   '$route' (to, from) {
    //     this.fetchData()
    //   }
    // },
    methods: {
      fetchData () {
        if (!this.fetched) {
          request({
            url: this.name,
            method: 'GET'
          })
          .then(r => {
            this.list = this.createList(r.data[this.name])
            this.fetched = true
          })
        }
      },
      createList (companies) {
        let list = []
        if (companies) {
          list = companies.map(c => {
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
        }
        return list
      }
    }
  }
</script>

<style scoped>

</style>
