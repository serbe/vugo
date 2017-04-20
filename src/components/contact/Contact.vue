<template>
  <form :model="contact" id="contact">

    <vue-input v-model="contact.name" type="text" label placeholder="Полное имя" icon="user" />

    <vue-select :list="companies" :selected-item="contact.company" label="Организация" item-name="company" @select="onSelect" icon="building" />

    <div class="columns">
      <div class="column is-half">
        <vue-select :list="posts" :selected-item="contact.post" label="Должность" item-name="post" @select="onSelect" icon="tag" />
      </div>

      <div class="column is-half">
        <vue-select :list="departments" :selected-item="contact.department" label="Отдел" item-name="department" @select="onSelect" icon="tag" />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <vue-select :list="posts_go" :selected-item="contact.post_go" label="Должность ГО" item-name="post_go" @select="onSelect" icon="tag" />
      </div>

      <div class="column is-half">
        <vue-select :list="ranks" :selected-item="contact.rank" label="Звание" item-name="rank" @select="onSelect" icon="tag" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Дата рождения</label>
          <div class="control">
            <vue-datepicker inputClass="input w300" v-model="contact.birthday" language="ru" format="yyyy-MM-dd" />
          </div>
        </div>
      </div>

      <div class="column is-three-quarters">
        <vue-input v-model="contact.address" type="text" label placeholder="Адрес" icon="address-card" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Почта</label>
          <template v-for="(email, index) in contact.emails">
            <vue-input :value="email.email" type="email" placeholder="Электронный адрес" icon="envelope" autocomplete="email" />
          </template>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Телефон</label>
          <template v-for="(phone, index) in contact.phones">
            <vue-input :value="phone.phone" type="tel" placeholder="Телефон" icon="phone" autocomplete="tel" />
          </template>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Факс</label>
          <template v-for="(fax, index) in contact.faxes">
            <vue-input :value="fax.phone" type="tel" placeholder="Факс" icon="fax" autocomplete="tel" />
          </template>
        </div>
      </div>
    </div>

    <div class="field" v-if="contact.practices">
      <label class="label">Тренировки</label>
      <template v-for="practice in contact.practices">
        <vue-input type="text" :hyper="'/practice/' + practice.id" state="disabled" :value="practice.date_str + ' - ' + practice.kind.name + ' - ' + practice.topic" icon="graduation-cap" />
      </template>
    </div>

    <vue-input type="text" label="Заметка" placeholder="Заметка" icon="comment" v-model="contact.note" />

    <div class="field">
      <div class="columns mt3">
        <div class="column is-2 is-offset-2">
          <vue-button text="Сохранить" color="primary" @click="submit" />
        </div>
        <div class="column is-2">
          <vue-button text="Закрыть" @click="close" />
        </div>
        <div class="column is-2 is-offset-2">
          <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import input from '@/elements/Input'
import button from '@/elements/Button'
import select from '@/elements/Select'
import datepicker from '@/elements/Datepicker'

export default {
  name: 'contact',
  components: {
    'vue-input': input,
    'vue-button': button,
    'vue-select': select,
    'vue-datepicker': datepicker
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
      }]
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    onSelect (item, itemName) {
      this.contact[itemName] = item
      this.contact[itemName + '_id'] = item.id
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
          this.contact.emails ? this.contact.emails.push({ id: this.contact.emails.length + 1, email: '' }) : this.contact.emails = [{ id: 1, email: '' }]
          this.contact.phones ? this.contact.phones.push({ id: this.contact.phones.length + 1, phone: '' }) : this.contact.phones = [{ id: 1, phone: '' }]
          this.contact.faxes ? this.contact.faxes.push({ id: this.contact.faxes.length + 1, phone: '' }) : this.contact.faxes = [{ id: 1, phone: '' }]
          this.selectInit('contact', 'companies', 'company')
          this.isLoaded = true
        })
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

<style scoped>
.columns {
  margin-bottom: -0.25rem !important;
}

.field .is-grouped {
  margin-bottom: 0 !important;
}

.w300 {
  width: 300px !important;
}
</style>
