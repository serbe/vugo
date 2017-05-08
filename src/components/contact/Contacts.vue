<template>
  <div>
    <vue-table
      name="contact"
      :names="['Фамилия Имя Отчество', 'Организация', 'Должность', 'Телефон', 'Факс']"
      :columns="['name', 'company_name', 'post_name', 'phones', 'faxes']"
      :tableData="contactsList"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile', 'is-hidden-touch', 'w94', 'is-hidden-mobile w94']"
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
      contactsList: [],
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/contacts').then(r => r.json()).then((data) => {
        this.contactsList = this.createContactsList(data.contacts)
        this.isLoaded = true
      })
    },
    methods: {
      createContactsList (contacts) {
        let list = contacts.map(c => {
          let str = [c.name, c.company_name, c.post_name]
          if (c.phone) {
            str.push(c.phone.join(' '))
          }
          if (c.fax) {
            str.push(c.fax.join(' '))
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
