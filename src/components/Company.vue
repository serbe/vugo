<template>
  <div class="content">

    <form :model="company"
          id="company">
      <!--<input type="text" class="hide" name="company-id" id="company-id" value='{{ .Company.ID }}'>-->
      <vue-input type="text" label="Test" placeholder="Write test text" v-model="company.name"/>

      <div class="field">
        <label class="label">Наименование организации:</label>
        <p class="control has-icon">
          <input class="input"
                 type="text"
                 v-model="company.name"
                 placeholder="Наименование организации"
                 required
                 autocomplete="organization">
          <span class="icon is-small">
            <i class="fa fa-building"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <label class="label">Сфера деятельности:</label>
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

      <div class="field">
        <label class="label">Адрес:</label>
        <p class="control has-icon">
          <input class="input"
                 type="text"
                 v-model="company.address"
                 placeholder="Адрес организации"
                 autocomplete="shipping street-address">
          <span class="icon is-small">
            <i class="fa fa-address-card"></i>
          </span>
        </p>
      </div>

      <div class="columns is-gapless">
        <div class="column">
          <div class="field">
            <label class="label">Почта:</label>
            <template v-for="(email, index) in company.emails">
              <div class="field has-addons is-marginless">
                <p class="control has-icon">
                  <input class="input"
                         type="email"
                         placeholder="Электронный адрес"
                         :value="email.email"
                         autocomplete="email">
                  <span class="icon is-small">
                    <i class="fa fa-envelope"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-danger">
                    <span class="icon is-small">
                      <i class="fa fa-minus"></i>
                    </span>
                  </a>
                </p>
              </div>
            </template>
            <div class="field has-addons">
              <p class="control has-icon">
                <input class="input"
                       type="email"
                       placeholder="Электронный адрес"
                       v-model="newEmail"
                       autocomplete="email">
                <span class="icon is-small">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
              <p class="control">
                <a class="button is-success">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон:</label>
            <template v-for="(phone, index) in company.phones">
              <div class="field has-addons is-marginless">
                <p class="control has-icon">
                  <input class="input"
                         type="tel"
                         placeholder="Телефон"
                         :value="phone.phone"
                         autocomplete="tel">
                  <span class="icon is-small">
                    <i class="fa fa-phone"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-danger">
                    <span class="icon is-small">
                      <i class="fa fa-minus"></i>
                    </span>
                  </a>
                </p>
              </div>
            </template>
            <div class="field has-addons">
              <p class="control has-icon">
                <input class="input"
                       type="tel"
                       placeholder="Телефон"
                       v-model="newPhone"
                       autocomplete="tel">
                <span class="icon is-small">
                  <i class="fa fa-phone"></i>
                </span>
              </p>
              <p class="control">
                <a class="button is-success">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс:</label>
            <template v-for="(fax, index) in company.faxes">
              <div class="field has-addons is-marginless">
                <p class="control has-icon">
                  <input class="input"
                         type="tel"
                         placeholder="Факс"
                         :value="fax.phone"
                         autocomplete="tel">
                  <span class="icon is-small">
                    <i class="fa fa-fax"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-danger">
                    <span class="icon is-small">
                      <i class="fa fa-minus"></i>
                    </span>
                  </a>
                </p>
              </div>
            </template>
            <div class="field has-addons">
              <p class="control has-icon">
                <input class="input"
                       type="tel"
                       placeholder="Факс"
                       v-model="newFax"
                       autocomplete="tel">
                <span class="icon is-small">
                  <i class="fa fa-fax"></i>
                </span>
              </p>
              <p class="control">
                <a class="button is-success">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label"
               v-if="company.practices.length > 0">Тренировки:</label>
        <template v-for="practice in company.practices">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <a :href="'/practice/' + practice.id">
                <input type="text"
                       class="input is-disabled"
                       :value="practice.date_str">
              </a>
            </p>
            <p class="control is-expanded">
              <input type="text"
                     class="input is-disabled"
                     :value="practice.kind.name">
            </p>
            <p class="control is-expanded">
              <input type="text"
                     class="input is-disabled"
                     :value="practice.topic">
            </p>
          </div>
        </template>
      </div>

      <div class="field">
        <label class="label"
               v-if="company.contacts.length > 0">Сотрудники:</label>
        <template v-for="contact in company.contacts">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <a :href="'/contact/' + contact.id">
                <input type="text"
                       class="input is-disabled"
                       :value="contact.name">
              </a>
            </p>
            <p class="control is-expanded">
              <input type="text"
                     class="input is-disabled"
                     :value="contact.post_name">
            </p>
          </div>
        </template>
      </div>

      <div class="field">
        <label class="label">Заметка:</label>
        <div class="control">
          <input type="text"
                 class="input"
                 name="company-note"
                 id="company-note"
                 placeholder="Заметка"
                 v-model="company.note">
        </div>
      </div>

      <div class="field">
        <div class="columns mt3">
          <div class="column is-2 is-offset-2">
            <p class="control">
              <a class="button is-primary">Сохранить</a>
            </p>
          </div>
          <div class="column is-2">
            <p class="control">
              <a class="button">Закрыть</a>
            </p>
          </div>
          <div class="column is-2 is-offset-2">
            <p class="control">
              <a class="button is-danger"
                 onclick="return confirm('Вы действительно хотите удалить эту запись?');">Удалить</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import input from '../elements/Input'
export default {
  name: 'company',
  components: {
    'vue-input': input
  },
  data () {
    return {
      test: '',
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
  created: function () {
    this.fetchData()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onDelete () {
      console.log('delete!')
    },
    fetchData () {
      // fetch('http://localhost:9090/api/companies').then(r => r.json()).then((data) => {
      //   this.companiesList = data.companies_list
      //   this.isLoaded = true
      //   this.companies = this.companiesList.filter((c, i) => {
      //     return i >= this.paginate * 50 && i < (this.paginate + 1) * 50
      //   })
      // })

      axios.get('http://localhost:9090/api/company/' + this.$route.params.id)
        .then(response => {
          const jsondata = response.data
          if (jsondata) {
            this.company = jsondata.company
            this.scopes = jsondata.scopes_select
            // console.log(jsondata.company.Contacts)
            // if (this.company.emails.length === 0) {
            //   this.company.emails.push()
            // }
            // if (this.company.phones.length === 0) {
            //   this.company.phones.push({name: ''})
            // }
            this.isLoaded = true
          }
        })
        .catch(e => {
          console.log(e)
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
