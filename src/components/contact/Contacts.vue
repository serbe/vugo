<template>
  <div class="container">
    <vue-table
      name="contact"
      :names="['Фамилия Имя Отчество', 'Организация', 'Должность', 'Телефон', 'Факс']"
      :columns="['name', 'company_name', 'post_name', 'phones', 'faxes']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile', 'is-hidden-touch', 'w9', 'is-hidden-mobile w9']"
      :cellTypes="['text', 'text', 'text', 'array', 'array']"
      pagination
      hyper
      search
    ></vue-table>
  </div>
</template>

<script>
  import table from '@/elements/Table'
  import mixin from '@/mixins/funcs'
  import request from '@/request'

  export default {
    name: 'contacts',
    components: {
      'vue-table': table
    },
    mixins: [mixin],
    data: () => ({
      name: 'contacts',
      list: []
    }),
    created () {
      this.fetchData()
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        console.log(newRoute, oldRoute)
        this.fetchData()
      }
    },
    methods: {
      fetchData () {
        request({
          url: this.name,
          method: 'GET'
        })
        .then((r) => {
          this.list = this.createList(r.data[this.name])
        })
      },
      createList (contacts) {
        let list = []
        if (contacts) {
          list = contacts.map(c => {
            let str = [c.name, c.company_name, c.post_name]
            if (c.phones.length > 0 && c.phones[0] !== '') {
              str.push(c.phones.join(' '))
            }
            if (c.faxes.length > 0 && c.faxes[0] !== '') {
              str.push(c.faxes.join(' '))
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
