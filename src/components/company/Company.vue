<template>
    <form :model="company" id="company">

      <b-field label="Наименование организации">
        <b-input v-model="company.name" placeholder="Наименование организации" icon="building"></b-input>
      </b-field>

      <b-field label="Сфера деятельности">
        <!--<v-select v-model="company.scope.name" :options="scopes"></v-select>-->

        <vue-select v-model="company.scope.name" :options="scopes" placeholder="Сфера деятельности"></vue-select>

        <!--<p class="control">
          <span class="select is-fullwidth">
            <select v-model="company.scope.name">
              <option></option>
              <option v-for="scope in scopes"
                      :key="scope.id">{{ scope.name }}</option>
            </select>
          </span>
        </p>-->
      </b-field>

      <b-field label="Адрес">
        <b-input v-model="company.address" placeholder="Адрес" icon="address-card"></b-input>
      </b-field>

      <div class="columns">
        <div class="column">
          <b-field label="Почта">
            <template v-for="(email, index) in company.emails">
              <b-field>
                <b-input v-model="company.emails[index].email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email" @blur="blurEmail"></b-input>
              </b-field>
            </template>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Телефон">
            <template v-for="(phone, index) in company.phones">
              <b-field>
                <b-input v-model="company.phones[index].phone" placeholder="Телефон" icon="phone" autocomplete="tel" @blur="blurPhone"></b-input>
              </b-field>
            </template>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Факс">
            <template v-for="(fax, index) in company.faxes">
              <b-field>
                <b-input v-model="company.faxes[index].phone" placeholder="Факс" icon="phone" autocomplete="tel" @blur="blurFax"></b-input>
              </b-field>
            </template>
          </b-field>
        </div>
      </div>

      <b-field v-if="company.practices" label="Тренировки">
        <template v-for="practice in company.practices">
          <b-field>
            <a :href="'/practice/' + practice.id" state="disabled">
              <b-input disabled :value="practice.date_str + ' - ' + practice.kind_name + ' - ' + practice.topic"></b-input>
            </a>
          </b-field>
        </template>
      </b-field>

      <b-field v-if="company.practices" label="Сотрудники">
        <template v-for="contact in company.contacts">
          <b-field>
            <a :href="'/contact/' + contact.id">
              <b-input disabled :value="contact.name + ' - ' + contact.post_name"></b-input>
            </a>
          </b-field>
        </template>
      </b-field>

      <b-field label="Заметка">
        <b-input v-model="company.note" placeholder="Заметка" icon="comment"></b-input>
      </b-field>

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
</template>

<script>
import button from '@/elements/Button'
import select from '@/elements/Select'
import vSelect from 'vue-select'

export default {
  name: 'company',
  components: {
    'vue-button': button,
    'vue-select': select,
    'v-select': vSelect
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
      }],
      options: []
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    blurEmail: function (val) {
      if (this.checkArray(this.company.emails, 'email')) {
        this.company.emails.push({id: this.company.emails.length + 1, email: ''})
      }
    },
    blurPhone: function (val) {
      if (this.checkArray(this.company.phones, 'phone')) {
        this.company.phones.push({id: this.company.phones.length + 1, phone: '', fax: false})
      }
    },
    blurFax: function (val) {
      if (this.checkArray(this.company.faxes, 'phone')) {
        this.company.faxes.push({id: this.company.faxes.length + 1, phone: '', fax: true})
      }
    },
    checkArray (values, key) {
      let firstElem = -1
      let emptyElem = 0
      let fillElem = 0
      values.map((e, i) => {
        if (e[key] === '') {
          if (firstElem === -1) {
            firstElem = i
          }
          emptyElem++
        } else {
          fillElem++
        }
      })
      if (emptyElem > 1) {
        values.splice(firstElem, 1)
      }
      if (fillElem === values.length) {
        return true
      }
      return false
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

<style lang="sass">

</style>
