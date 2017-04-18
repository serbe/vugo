<template>
  <div class="content">
    <form :model="contact" id="contact">

      <vue-input v-model="contact.name" type="text" label placeholder="Полное имя" icon="user"/>

      <vue-select :list="companies" :selected-item="company" label="Организация" @select="onSelectCompany" icon="building"/>

      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">Должность</label>
            <p class="control">
              <span class="select is-fullwidth">
                <select v-model="contact.post.name">
                  <option></option>
                  <option v-for="post in posts"
                          :key="post.id">{{ post.name }}</option>
                </select>
              </span>
            </p>
          </div>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">Отдел</label>
            <p class="control">
              <span class="select is-fullwidth">
                <select v-model="contact.department.name">
                  <option></option>
                  <option v-for="department in departments"
                          :key="department.id">{{ department.name }}</option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">Должность ГО</label>
            <p class="control">
              <span class="select is-fullwidth">
                <select v-model="contact.post_go.name">
                  <option></option>
                  <option v-for="post in posts_go"
                          :key="post.id">{{ post.name }}</option>
                </select>
              </span>
            </p>
          </div>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">Звание</label>
            <p class="control">
              <span class="select is-fullwidth">
                <select v-model="contact.rank.name">
                  <option></option>
                  <option v-for="rank in ranks"
                          :key="rank.id">{{ rank.name }}</option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>

      <!--<div class="field">
        <label class="label">Сфера деятельности</label>
        <p class="control">
          <span class="select is-fullwidth">
            <select v-model="contact.scope.name">
              <option></option>
              <option v-for="scope in scopes"
                      :key="scope.id">{{ scope.name }}</option>
            </select>
          </span>
        </p>
      </div>-->

      <!--<vue-input v-model="contact.address" type="text" label placeholder="Адрес" icon="address-card"/>-->

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Почта</label>
            <template v-for="(email, index) in contact.emails">
              <div class="field">
                <vue-input :value="email.email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email"/>
              </div>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <template v-for="(phone, index) in contact.phones">
              <div class="field">
                <vue-input :value="phone.phone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel"/>
              </div>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <template v-for="(fax, index) in contact.faxes">
              <div class="field">
                <vue-input :value="fax.phone" type="tel" placeholder="Факс" icon="fax" autocomplete="tel"/>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!--<div class="field">
        <label class="label" v-if="contact.practices">Тренировки</label>
        <template v-for="practice in contact.practices">
          <vue-input type="text" :hyper="'/practice/' + practice.id" state="disabled" :value="practice.date_str + ' - ' + practice.kind.name + ' - ' + practice.topic"/>
        </template>
      </div>

      <div class="field">
        <label class="label" v-if="contact.contacts">Сотрудники</label>
        <template v-for="contact in contact.contacts">
          <vue-input type="text" :hyper="'/contact/' + contact.id" state="disabled marginless" :value="contact.name + ' - ' + contact.post_name"/>
        </template>
      </div>-->

      <!--<div class="field">
        <label class="label">Дата рождения</label>
        <div class="control i150">
          <input type="text" class="input" v-model="birthday" placeholder="DD.MM.YYYY">
        </div>
      </div>-->

      <vue-input type="text" label="Заметка" placeholder="Заметка" icon="comment" v-model="contact.note"/>

      <div class="field">
        <div class="columns mt3">
          <div class="column is-2 is-offset-2">
            <vue-button text="Сохранить" color="primary" @click="submit"/>
          </div>
          <div class="column is-2">
            <vue-button text="Закрыть" @click="close"/>
          </div>
          <div class="column is-2 is-offset-2">
            <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');"/>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import input from '@/elements/Input'
import button from '@/elements/Button'
import select from '@/elements/Select'
export default {
  name: 'contact',
  components: {
    'vue-input': input,
    'vue-button': button,
    'vue-select': select
  },
  data () {
    return {
      title: '',
      contact: {
        id: 0,
        name: '',
        birthday: '',
        company: {
          id: 0,
          name: ''
        },
        company_id: 0,
        post: {
          id: 0,
          name: ''
        },
        post_id: 0,
        department: [{
          id: 0,
          email: ''
        }],
        department_id: 0,
        post_go: {
          id: 0,
          name: ''
        },
        post_go_id: 0,
        rank: {
          id: 0,
          name: ''
        },
        rank_id: 0,
        emails: [{
          id: 0,
          email: ''
        }],
        phones: [{
          id: 0,
          phone: ''
        }],
        faxes: [{
          id: 0,
          phone: ''
        }],
        note: ''
      },
      companies: [{
        id: 0,
        name: ''
      }],
      posts: [{
        id: 0,
        name: ''
      }],
      posts_go: [{
        id: 0,
        name: ''
      }],
      departments: [{
        id: 0,
        name: ''
      }],
      ranks: [{
        id: 0,
        name: ''
      }],
      company: {
        id: 0,
        name: ''
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    onSelectCompany (item) {
      this.company = item
      this.contact.company_id = item.id
    },
    submit () {
      let url = 'http://localhost:9090/contacts'
      if (this.$route.params.id !== '') {
        url = url + '/' + this.$route.params.id
      }
      let values = this.contact
      values.emails = values.emails.filter((e, i) => {
        return e.email && e.email !== ''
      })
      values.phones = values.phones.filter((p, i) => {
        return p.phone && p.phone !== ''
      })
      values.faxes = values.faxes.filter((f, i) => {
        return f.phone && f.phone !== ''
      })
      fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/contacts')
    },
    close () {
      this.$router.push('/contacts')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      fetch('http://localhost:9090/contacts/' + this.$route.params.id)
      .then(r => r.json())
      .then((data) => {
        this.contact = data.contact
        this.companies = data.companies
        this.posts = data.posts
        this.departments = data.departments
        this.posts_go = data.posts_go
        this.ranks = data.ranks
        this.contact.emails ? this.contact.emails.push({id: this.contact.emails.length + 1, email: ''}) : this.contact.emails = [{id: 1, email: ''}]
        this.contact.phones ? this.contact.phones.push({id: this.contact.phones.length + 1, phone: ''}) : this.contact.phones = [{id: 1, phone: ''}]
        this.contact.faxes ? this.contact.faxes.push({id: this.contact.faxes.length + 1, phone: ''}) : this.contact.faxes = [{id: 1, phone: ''}]
        if (this.contact.company_id > 0) {
          let company = this.companies.filter(item => {
            return item.id === this.contact.company_id
          })
          if (company) {
            this.company.id = company[0].id
            this.company.name = company[0].name
          }
        }
        this.isLoaded = true
      })
    }
  }
}
</script>

<style scoped>
.columns {
  margin-bottom: -0.25rem !important;
}

.field .is-grouped {
  margin-bottom: 0 !important;
}
</style>
