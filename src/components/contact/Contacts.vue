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
      fetched: false,
      list: []
    }),
    created () {
      this.fetchData()
    },
    watch: {
      '$route' (to, from) {
        // console.log(to, from)
        this.fetchData()
      }
      // $router () {
      //   console.log(this.$route.params)
      // }
    },
    methods: {
      fetchData () {
        console.log(this.fetched)
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
