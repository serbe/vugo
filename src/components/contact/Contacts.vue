<template>
  <div>
    <p>
      <a class="button mb1" href="/contact/">Добавить</a>
    </p>
    <p class="control">
      <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
    </p>
    <table class="table is-striped fixed_table">
      <thead>
        <tr>
          <th class="t20"><a>Фамилия Имя Отчество</a></th>
          <th class="t30 is-hidden-mobile"><a>Организация</a></th>
          <th class="t20 is-hidden-touch"><a>Должность</a></th>
          <th class="t10"><a>Телефон</a></th>
          <th class="t10 is-hidden-mobile"><a>Факс</a></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in contacts">
          <td class="tvm"><router-link :to="'/contact/' + item.id">{{ item.name }}</router-link></td>
          <td class="tvm is-hidden-mobile">{{ item.company_name }}</td>
          <td class="tvm is-hidden-touch">{{ item.post_name }}</td>
          <td class="has-text-right tvm">
            <span v-for="phone in item.phones">{{ phone }}<br></span>
          </td>
          <td class="has-text-right tvm is-hidden-mobile">
            <span v-for="fax in item.faxes">{{ fax }}<br></span>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="pagination is-centered">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li><a class="pagination-link">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">45</a></li>
        <li><a class="pagination-link is-current">46</a></li>
        <li><a class="pagination-link">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link">86</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'contacts',
    data: () => ({
      contacts: null,
      contactsList: null,
      isLoaded: false,
      searchText: '',
      column: 'name',
      paginate: 0,
      query: ''
    }),
    mounted () {
      fetch('http://localhost:9090/contacts').then(r => r.json()).then((data) => {
        this.contactsList = this.createContactsList(data.contacts)
        this.isLoaded = true
        this.filterContacts()
      })
    },
    watch: {
      query: function (val, oldVal) {
        this.query = val
        this.filterContacts()
      }
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
      },
      filterContacts () {
        let queryArr = this.query.toLowerCase().split(' ')
        let contacts = this.contactsList.filter((c) => {
          return queryArr.every(e => c.str.includes(e))
        })
        this.contacts = contacts.filter((c, i) => {
          return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
        })
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

  /*.fixed_table {
      table-layout: fixed !important;
  }*/

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
