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

      <div class="columns is-gapless">
        <div class="column">
          <div class="field">
            <label class="label">Почта</label>
            <template v-for="(email, index) in company.emails">
              <div class="field has-addons is-marginless">
                <vue-input :value="email.email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email"/>
                <vue-button color="danger" icon="minus"/>
              </div>
            </template>
            <div class="field has-addons">
              <vue-input v-model="newEmail" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email"/>
              <vue-button color="success" icon="plus"/>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <template v-for="(phone, index) in company.phones">
              <div class="field has-addons is-marginless">
                <vue-input :value="phone.phone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel"/>
                <vue-button color="danger" icon="minus"/>
              </div>
            </template>
            <div class="field has-addons">
              <vue-input v-model="newPhone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel"/>
              <vue-button color="success" icon="plus"/>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <template v-for="(fax, index) in company.faxes">
              <div class="field has-addons is-marginless">
                <vue-input :value="fax.phone" type="tel" placeholder="Факс" icon="fax" autocomplete="tel"/>
                <vue-button color="danger" icon="minus"/>
              </div>
            </template>
            <div class="field has-addons">
              <vue-input v-model="newFax" type="tel" placeholder="Факс" icon="fax" autocomplete="tel"/>
              <vue-button color="success" icon="plus"/>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" v-if="company.practices.length > 0">Тренировки</label>
        <template v-for="practice in company.practices">
          <vue-input type="text" :hyper="'/practice/' + practice.id" state="disabled" :value="practice.date_str + ' - ' + practice.kind.name + ' - ' + practice.topic"/>
        </template>
      </div>

      <div class="field">
        <label class="label" v-if="company.contacts.length > 0">Сотрудники</label>
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
            <vue-button text="Закрыть"/>
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
      scopes: [{
        id: 0,
        name: ''
      }],
      company: {
        id: 0,
        name: '',
        scope_id: '',
        scope: {
          id: 0,
          name: ''
        },
        address: '',
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
          date_of_practice: '',
          kind: {
            id: 0,
            name: ''
          },
          topic: ''
        }],
        contacts: [{
          id: 0,
          name: '',
          post_name: ''
        }],
        note: ''
      },
      newEmail: '',
      newPhone: '',
      newFax: ''
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    submit () {
      axios.post('http://localhost:9090/api/company', this.company)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
      })
      .catch(function (error) {
        console.log('Request failed', error)
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onDelete () {
      console.log('delete!')
    },
    fetchData () {
      axios.get('http://localhost:9090/api/company/' + this.$route.params.id)
        .then(response => {
          const jsondata = response.data
          if (jsondata) {
            this.company = jsondata.company
            this.scopes = jsondata.scopes_select
            this.isLoaded = true
          }
        })
        .catch(e => {
          console.log('Error ' + e)
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
