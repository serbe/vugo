<template>
  <div class="content">
    <form :model="company" id="company">

      <vue-input v-model="company.name" type="text" label placeholder="Наименование организации" icon="building"/>

      <div class="field">
        <label class="label">Сфера деятельности</label>
        <p class="control">
          <span class="select is-fullwidth">
            <select v-model="company.scope.name">
              <option></option>
              <option v-for="scope in scopes"
                      :key="scope.id">{{ scope.name }}</option>
            </select>
          </span>
        </p>
      </div>

      <vue-input v-model="company.address" type="text" label placeholder="Адрес" icon="address-card"/>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Почта</label>
            <template v-for="(email, index) in company.emails">
              <div class="field">
                <vue-input :value="email.email" :id="'email_' + index" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email" @blur="blurEmail"/>
              </div>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <template v-for="(phone, index) in company.phones">
              <div class="field">
                <vue-input :value="phone.phone" :id="'phone_' + index" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel" @blur="blurPhone"/>
              </div>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <template v-for="(fax, index) in company.faxes">
              <div class="field">
                <vue-input :value="fax.phone" :id="'fax_' + index" type="tel" placeholder="Факс" icon="fax" autocomplete="tel" @blur="blurFax"/>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" v-if="company.practices">Тренировки</label>
        <template v-for="practice in company.practices">
          <vue-input type="text" :hyper="'/practice/' + practice.id" state="disabled" :value="practice.date_str + ' - ' + practice.kind_name + ' - ' + practice.topic"/>
        </template>
      </div>

      <div class="field">
        <label class="label" v-if="company.contacts">Сотрудники</label>
        <template v-for="contact in company.contacts">
          <vue-input type="text" :hyper="'/contact/' + contact.id" state="disabled marginless" :value="contact.name + ' - ' + contact.post_name"/>
        </template>
      </div>

      <vue-input type="text" label="Заметка" placeholder="Заметка" icon="comment" v-model="company.note"/>

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
export default {
  name: 'company',
  components: {
    'vue-input': input,
    'vue-button': button
  },
  data () {
    return {
      title: '',
      company: {
        id: 0,
        name: '',
        address: '',
        scope: {
          id: 0,
          name: ''
        },
        scope_id: 0,
        note: '',
        emails: [{
          id: 0,
          email: ''
        }],
        phones: [{
          id: 0,
          phone: '',
          fax: false
        }],
        faxes: [{
          id: 0,
          phone: '',
          fax: true
        }],
        practices: [{
          id: 0,
          date_str: '',
          kind_name: '',
          topic: ''
        }],
        contacts: [{
          id: 0,
          name: '',
          department_name: '',
          post_name: '',
          post_go_name: ''
        }]
      },
      scopes: [{
        id: 0,
        name: ''
      }]
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    blurEmail: function (val) {
      let index = val.id[6]
      if (this.company.emails[index].email !== val.event.target.value) {
        this.company.emails[index].email = val.event.target.value
        if (val.event.target.value !== '' && (this.company.emails.length - 1).toString() === index) {
          this.company.emails.push({id: this.company.emails.length + 1, email: ''})
        }
        this.checkDelete(this.company.emails, 'email')
      }
    },
    blurPhone: function (val) {
      let index = val.id[6]
      if (this.company.phones[index].phone !== val.event.target.value) {
        this.company.phones[index].phone = val.event.target.value
        if (val.event.target.value !== '' && (this.company.phones.length - 1).toString() === index) {
          this.company.phones.push({id: this.company.phones.length + 1, phone: ''})
        }
        this.checkDelete(this.company.phones, 'phone')
      }
    },
    blurFax: function (val) {
      let index = val.id[4]
      if (this.company.faxes[index].phone !== val.event.target.value) {
        this.company.faxes[index].phone = val.event.target.value
        if (val.event.target.value !== '' && (this.company.faxes.length - 1).toString() === index) {
          this.company.faxes.push({id: this.company.faxes.length + 1, phone: ''})
        }
        this.checkDelete(this.company.faxes, 'phone')
      }
    },
    checkDelete (values, key) {
      let firstElem = 0
      let isForDelete = false
      values.map((e, i) => {
        if (e[key] === '') {
          if (firstElem === 0) {
            firstElem = i
          } else {
            isForDelete = true
          }
        }
      })
      if (isForDelete) {
        values.splice(firstElem, 1)
      }
    },
    submit () {
      let url = 'http://localhost:9090/companies'
      if (this.$route.params.id !== '') {
        url = url + '/' + this.$route.params.id
      }
      let values = this.company
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
        // console.log(res)
      })
      this.$router.push('/companies')
    },
    close () {
      this.$router.push('/companies')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      fetch('http://localhost:9090/companies/' + this.$route.params.id)
      .then(r => r.json())
      .then((data) => {
        this.company = data.company
        this.scopes = data.scopes
        this.company.emails ? this.company.emails.push({id: this.company.emails.length + 1, email: ''}) : this.company.emails = [{id: 1, email: ''}]
        this.company.phones ? this.company.phones.push({id: this.company.phones.length + 1, phone: '', fax: false}) : this.company.phones = [{id: 1, phone: '', fax: false}]
        this.company.faxes ? this.company.faxes.push({id: this.company.faxes.length + 1, phone: '', fax: true}) : this.company.faxes = [{id: 1, phone: '', fax: true}]
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
