<template>
  <div class="container mw768">
    <form :model="company" id="company">

      <vue-input v-model="company.name" label placeholder="Наименование организации" icon="building"/>

      <vue-select :list="scopes" :selected-item="company.scope" label="Сфера деятельности" @select="onSelect" icon="tag"/>

      <vue-input v-model="company.address" label placeholder="Адрес" icon="address-card"/>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Электронный адрес</label>
            <template v-for="(email, index) in company.emails">
              <vue-input v-model="company.emails[index].email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email" @blur="onBlur('emails', 'email')" pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' error="Неправильный email"/>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <template v-for="(phone, index) in company.phones">
              <vue-input v-model="company.phones[index].phone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel" @blur="onBlur('phones', 'phone')"/>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <template v-for="(fax, index) in company.faxes">
              <vue-input v-model="company.faxes[index].phone" type="tel" placeholder="Факс" icon="phone" autocomplete="tel" @blur="onBlur('faxes', 'phone')"/>
            </template>
          </div>
        </div>
      </div>

      <div class="field" v-if="company.practices">
        <label class="label">Тренировки</label>
        <template v-for="practice in company.practices">
          <vue-input :value="practice.date_str + ' - ' + practice.kind_name + ' - ' + practice.topic" :hyper="'/practice/' + practice.id" icon="history" disabled/>
        </template>
      </div>

      <div class="field" v-if="company.contacts">
        <label class="label">Сотрудники</label>
        <template v-for="contact in company.contacts">
          <vue-input :value="contact.name + ' - ' + contact.post_name" :hyper="'/contact/' + contact.id" icon="user" disabled/>
        </template>
      </div>

      <vue-input v-model="company.note" label placeholder="Заметка" icon="sticky-note"/>

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
import vinput from '@/elements/Input'
import vbutton from '@/elements/Button'
import vselect from '@/elements/Select'
import mixin from '@/mixins/funcs'
import request from '@/request'

export default {
  name: 'company',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect
  },
  mixins: [mixin],
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
    onBlur: function (arr, key) {
      if (this.checkArray(this.company[arr], key)) {
        let obj = {}
        obj.id = this.company[arr].length + 1
        obj[key] = ''
        this.company[arr].push(obj)
      }
    },
    onSelect (item) {
      this.scope = item
      this.company.scope_id = item.id
    },
    submit () {
      let url = 'companies'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.company
      values.emails = this.filterArray(values.emails, 'email')
      values.phones = this.filterArray(values.phones, 'phone')
      values.faxes = this.filterArray(values.faxes, 'phone')
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
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
      request({
        url: 'companies/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        let data = r.data
        this.company = data.company
        this.scopes = data.scopes
        this.company.emails ? this.company.emails.push({id: this.company.emails.length + 1, email: ''}) : this.company.emails = [{id: 1, email: ''}]
        this.company.phones ? this.company.phones.push({id: this.company.phones.length + 1, phone: ''}) : this.company.phones = [{id: 1, phone: ''}]
        this.company.faxes ? this.company.faxes.push({id: this.company.faxes.length + 1, phone: ''}) : this.company.faxes = [{id: 1, phone: ''}]
        this.isLoaded = true
      })
    },
    customLabel (val) {
      return val.name
    }
  }
}
</script>

<style scoped>

</style>
