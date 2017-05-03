<template>
    <form :model="company" id="company">

      <vue-input v-model="company.name" label placeholder="Наименование организации" icon="building"/>

      <vue-select :list="scopes" :selected-item="company.scope" label="Сфера деятельности" @select="onSelect" icon="tag"/>

      <vue-input v-model="company.address" label placeholder="Адрес" icon="address-card"/>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Электронный адрес</label>
            <template v-for="(email, index) in company.emails">
              <vue-input v-model="company.emails[index].email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email" @blur="blurEmail"/>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <template v-for="(phone, index) in company.phones">
              <vue-input v-model="company.phones[index].phone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel" @blur="blurPhone"/>
            </template>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <template v-for="(fax, index) in company.faxes">
              <vue-input v-model="company.faxes[index].phone" type="tel" placeholder="Факс" icon="phone" autocomplete="tel" @blur="blurFax"/>
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
</template>

<script>
import button from '@/elements/Button'
import select from '@/elements/Select'
import input from '@/elements/Input'

export default {
  name: 'company',
  components: {
    'vue-button': button,
    'vue-select': select,
    'vue-input': input
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
    blurEmail: function () {
      if (this.checkArray(this.company.emails, 'email')) {
        this.company.emails.push({id: this.company.emails.length + 1, email: ''})
      }
    },
    blurPhone: function () {
      if (this.checkArray(this.company.phones, 'phone')) {
        this.company.phones.push({id: this.company.phones.length + 1, phone: '', fax: false})
      }
    },
    blurFax: function () {
      if (this.checkArray(this.company.faxes, 'phone')) {
        this.company.faxes.push({id: this.company.faxes.length + 1, phone: '', fax: true})
      }
    },
    onSelect (item) {
      this.scope = item
      this.company.scope_id = item.id
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
      values.emails = values.emails.filter((e) => {
        return e.email && e.email !== ''
      })
      values.phones = values.phones.filter((p) => {
        return p.phone && p.phone !== ''
      })
      values.faxes = values.faxes.filter((f) => {
        return f.phone && f.phone !== ''
      })
      fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(values)
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
        this.selectInit('company', 'scopes', 'scope')
        this.isLoaded = true
      })
    },
    customLabel (val) {
      return val.name
    },
    selectInit (parent, list, item) {
      if (this[parent][item + '_id'] > 0) {
        let tmpItem = this[list].filter(itemOfList => {
          return itemOfList.id === this[parent][item + '_id']
        })
        if (tmpItem) {
          this[parent][item + '_id'] = tmpItem[0].id
          this[parent][item].name = tmpItem[0].name
        }
      }
    }
  }
}
</script>

<style lang="sass">

</style>
