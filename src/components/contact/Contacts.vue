<template>
  <div>
    <vue-table
      name="contact"
      :names="['Фамилия Имя Отчество', 'Организация', 'Должность', 'Телефон', 'Факс']"
      :columns="['name', 'company_name', 'post_name', 'phones', 'faxes']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile', 'is-hidden-touch', 'w9', 'is-hidden-mobile w9']"
      pagination
      hyper
      search
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'

  export default {
    name: 'contacts',
    components: {
      'vue-table': table
    },
    data: () => ({
      list: []
    }),
    mounted () {
      fetch('http://localhost:9090/' + this.name).then(r => r.json()).then((data) => {
        this.list = this.createList(data[this.name])
      })
    },
    methods: {
      createList (contacts) {
        let list = contacts.map(c => {
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
        return list
      }
    }
  }
</script>

<style scoped>

</style>
