<template>
  <div class="container mw768">
    <form :model="contact" id="contact">

      <vue-input v-model="contact.name" type="text" label placeholder="Полное имя" iconLeft="user" ></vue-input>

      <vue-select :list="companies" :selected-item="contact.company" label="Организация" item-name="company" @select="onSelect" icon="building" ></vue-select>

      <div class="columns">
        <div class="column is-half">
          <vue-select :list="posts" :selected-item="contact.post" label="Должность" item-name="post" @select="onSelect" icon="tag" ></vue-select>
        </div>

        <div class="column is-half">
          <vue-select :list="departments" :selected-item="contact.department" label="Отдел" item-name="department" @select="onSelect" icon="tag" ></vue-select>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half">
          <vue-select :list="posts_go" :selected-item="contact.post_go" label="Должность ГО" item-name="post_go" @select="onSelect" icon="tag" ></vue-select>
        </div>

        <div class="column is-half">
          <vue-select :list="ranks" :selected-item="contact.rank" label="Звание" item-name="rank" @select="onSelect" icon="tag" ></vue-select>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <vue-date v-model="contact.birthday" label="Дата рождения"></vue-date>
        </div>

        <div class="column is-two-thirds">
          <vue-input v-model="contact.address" type="text" label placeholder="Адрес" iconLeft="address-card" ></vue-input>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Электронный адрес</label>
            <vue-input
              v-for="(email, index) in contact.emails"
              v-bind:key="index"
              v-model="contact.emails[index].email"
              type="email"
              placeholder="Электронный адрес"
              iconLeft="envelope"
              autocomplete="email"
              @blur="onBlur('emails', 'email')"
              pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              error="Неправильный email"
            ></vue-input>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <vue-input
              v-for="(phone, index) in contact.phones"
              v-bind:key="index"
              v-model="contact.phones[index].phone"
              type="tel"
              placeholder="Телефон"
              iconLeft="phone"
              autocomplete="tel"
              @blur="onBlur('phones', 'phone')"
            ></vue-input>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <vue-input
              v-for="(fax, index) in contact.faxes"
              v-bind:key="index"
              v-model="contact.faxes[index].phone"
              type="tel"
              placeholder="Факс"
              iconLeft="fax"
              autocomplete="tel"
              @blur="onBlur('faxes', 'phone')"
            ></vue-input>
          </div>
        </div>
      </div>

      <div class="field" v-if="contact.practices">
        <label class="label">Тренировки</label>
        <vue-input
          v-for="practice in contact.practices"
          v-bind:key="practice.id"
          type="text"
          :hyper="'/practice/' + practice.id"
          disabled
          :value="practice.date_str + ' - ' + practice.kind.name + ' - ' + practice.topic"
          iconLeft="graduation-cap"
        ></vue-input>
      </div>

      <vue-input type="text" label="Заметка" placeholder="Заметка" iconLeft="comment" v-model="contact.note" ></vue-input>

      <div class="field">
        <div class="columns mt3">
          <div class="column is-2 is-offset-2">
            <vue-button text="Сохранить" color="primary" @click="submit" ></vue-button>
          </div>
          <div class="column is-2">
            <vue-button text="Закрыть" @click="close" ></vue-button>
          </div>
          <div class="column is-2 is-offset-2">
            <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');" ></vue-button>
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
import vdate from '@/elements/Date'
import mixin from '@/mixins/funcs'
import request from '@/request'

export default {
  name: 'contact',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect,
    'vue-date': vdate
  },
  mixins: [mixin],
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
      }]
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    onBlur: function (arr, key) {
      if (this.checkArray(this.contact[arr], key)) {
        const obj = {}
        obj.id = this.contact[arr].length + 1
        obj[key] = ''
        this.contact[arr].push(obj)
      }
    },
    onSelect (item, itemName) {
      this.contact[itemName] = item
      this.contact[itemName + '_id'] = item.id
    },
    submit () {
      let url = '/contacts'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      const values = this.contact
      values.emails = this.filterArray(values.emails, 'email')
      values.phones = this.filterArray(values.phones, 'phone')
      values.faxes = this.filterArray(values.faxes, 'phone')
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
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
      request({
        url: 'contacts/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        const data = r.data
        this.contact = data.contact
        this.companies = data.companies
        this.posts = data.posts
        this.departments = data.departments
        this.posts_go = data.posts_go
        this.ranks = data.ranks
        this.contact.emails ? this.contact.emails.push({ id: this.contact.emails.length + 1, email: '' }) : this.contact.emails = [{ id: 1, email: '' }]
        this.contact.phones ? this.contact.phones.push({ id: this.contact.phones.length + 1, phone: '' }) : this.contact.phones = [{ id: 1, phone: '' }]
        this.contact.faxes ? this.contact.faxes.push({ id: this.contact.faxes.length + 1, phone: '' }) : this.contact.faxes = [{ id: 1, phone: '' }]
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
