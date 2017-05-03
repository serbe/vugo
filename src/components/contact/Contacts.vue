<template>
  <div>
    <nav class="nav">
      <div class="nav-left">
        <p class="nav-item">
          <a class="button mb1" href="/contact/0">Добавить</a>
        </p>
      </div>
      <div class="nav-rigth">
        <p class="nav-item">
          <span class="select">
            <select v-model="perPage">
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>100</option>
            </select>
          </span>
        </p>
      </div>
    </nav>
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
    <vue-pagination :page="page" :allElems="all" :perPage="perPage" @pagination="pagination"/>
  </div>
</template>

<script>
  import pagination from '@/elements/Pagination'

  export default {
    name: 'contacts',
    components: {
      'vue-pagination': pagination
    },
    data: () => ({
      contacts: null,
      contactsList: null,
      isLoaded: false,
      perPage: 50,
      query: '',
      page: 1
    }),
    computed: {
      all () {
        return this.filtered ? this.filtered.length : 0
      },
      filtered () {
        if (this.contactsList) {
          let queryArr = this.query.toLowerCase().split(' ')
          let contacts = this.contactsList.filter((c) => {
            return queryArr.every(e => c.str.includes(e))
          })
          return contacts
        } else {
          return []
        }
      }
    },
    mounted () {
      fetch('http://localhost:9090/contacts').then(r => r.json()).then((data) => {
        this.contactsList = this.createContactsList(data.contacts)
        this.isLoaded = true
        this.filterList()
      })
    },
    watch: {
      query: function (val) {
        this.query = val
        this.page = 1
        this.filterList()
      },
      perPage: function (val, oldVal) {
        if (val !== oldVal) {
          this.perPage = val
          this.page = (oldVal * this.page / val) | 0
          this.filterList()
        }
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
      filterList () {
        if (this.filtered) {
          this.contacts = this.filtered.filter((c, i) => {
            return i >= (this.page - 1) * this.perPage && i < this.page * this.perPage
          })
        } else {
          return []
        }
      },
      pagination: function (num) {
        if (num !== this.page) {
          this.page = num
          this.filterList()
        }
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
