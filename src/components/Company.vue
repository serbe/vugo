<template>
  <div class="content">
    <form :model="company" id="company">
      <!--<input type="text" class="hide" name="company-id" id="company-id" value='{{ .Company.ID }}'>-->

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
                <vue-input :value="email.email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email"/>
              </div>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <template v-for="(phone, index) in company.phones">
              <div class="field">
                <vue-input :value="phone.phone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel"/>
              </div>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <template v-for="(fax, index) in company.faxes">
              <div class="field">
                <vue-input :value="fax.phone" type="tel" placeholder="Факс" icon="fax" autocomplete="tel"/>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" v-if="company.practices">Тренировки</label>
        <template v-for="practice in company.practices">
          <vue-input type="text" :hyper="'/practice/' + practice.id" state="disabled" :value="practice.date_str + ' - ' + practice.kind.name + ' - ' + practice.topic"/>
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
import axios from 'axios'
import input from '../elements/Input'
import button from '../elements/Button'
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
          phone: ''
        }],
        faxes: [{
          id: 0,
          phone: ''
        }],
        practices: [{
          id: 0,
          date_str: '',
          kind: {
            name: ''
          },
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
    submit () {
      axios.post('http://localhost:9090/companies', this.company)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
      })
      .catch(function (error) {
        console.log('Request failed', error)
      })
    },
    close () {
      console.log(this.company)
    },
    onSubmit () {
      console.log('submit!')
    },
    onDelete () {
      console.log('delete!')
    },
    fetchData () {
      axios.get('http://localhost:9090/companies/' + this.$route.params.id)
        .then(response => {
          const jsondata = response.data
          if (jsondata) {
            this.company = jsondata.company
            this.scopes = jsondata.scopes
            this.company.emails ? this.company.emails.push({id: 0, email: ''}) : this.company.emails = [].push({id: 0, email: ''})
            this.company.phones ? this.company.phones.push({id: 0, phone: ''}) : this.company.phones = [].push({id: 0, phone: ''})
            this.company.faxes ? this.company.faxes.push({id: 0, phone: ''}) : this.company.faxes = [].push({id: 0, phone: ''})
            this.isLoaded = true
          }
        })
        .catch(e => {
          // console.log('Error ' + e)
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
