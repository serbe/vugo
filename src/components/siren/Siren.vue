<template>
  <div class="container mw768">
    <form :model="siren" id="siren">

      <div class="columns">
        <div class="column is-half">
          <vue-input v-model="siren.num_pass" type="text" label placeholder="Серийный номер" iconLeft="tag"></vue-input>
        </div>
        <div class="column is-half">
          <vue-select :list="siren_types" :selected-item="siren.siren_type" label="Тип сирены" item-name="siren_type" @select="onSelect" icon="tag"></vue-select>
        </div>
      </div>

      <vue-input v-model="siren.address" type="text" label placeholder="Адрес" iconLeft="address-card"></vue-input>
      <vue-select :list="contacts" :selected-item="siren.contact" label="Контактное лицо" item-name="contact" @select="onSelect" icon="user"></vue-select>
      <vue-select :list="companies" :selected-item="siren.company" label="Организация" item-name="company" @select="onSelect" icon="building"></vue-select>

      <div class="columns">
        <div class="column is-half">
          <vue-input v-model="siren.latitude" label placeholder="Широта" iconLeft="tag"></vue-input>
        </div>
        <div class="column is-half">
          <vue-input v-model="siren.longitude" label placeholder="Долгота" iconLeft="tag"></vue-input>
        </div>
      </div>
      <vue-input v-model="siren.note" label placeholder="Заметка" iconLeft="comment"></vue-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <vue-button text="Сохранить" color="primary" @click="submit"></vue-button>
        </div>
        <div class="control">
          <vue-button text="Закрыть" @click="close"></vue-button>
        </div>
        <div class="control">
          <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');"></vue-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

// Radio     string    `sql:"radio,null"      json:"radio"      form:"radio"      query:"radio"`
// Panel      string    `sql:"desk,null"       json:"desk"       form:"desk"       query:"desk"`
// Stage     int64     `sql:"stage,null"      json:"stage"      form:"stage"      query:"stage"`
// Own       string    `sql:"own,null"        json:"own"        form:"own"        query:"own"`

import vinput from '@/elements/Input'
import vbutton from '@/elements/Button'
import vselect from '@/elements/Select'
import request from '@/request'

export default {
  name: 'siren',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect
  },
  data () {
    return {
      title: '',
      siren: {
        id: 0,
        num_id: 0,
        num_pass: '',
        siren_type_id: '',
        siren_type: {
          id: 0,
          name: ''
        },
        address: '',
        radio: '',
        desk: '',
        contact_id: 0,
        contact: {
          id: 0,
          name: ''
        },
        company_id: 0,
        company: {
          id: 0,
          name: ''
        },
        latitude: '',
        longtitude: '',
        stage: '',
        own: '',
        note: ''
      },
      siren_types: [{
        id: 0,
        name: ''
      }],
      contacts: [{
        id: 0,
        name: ''
      }],
      companies: [{
        id: 0,
        name: ''
      }]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'sirens'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.siren
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
        .then(() => {
          this.close()
        })
    },
    close () {
      this.$router.push('/sirens')
    },
    onSelect (item, itemName) {
      this.siren[itemName] = item
      this.siren[`${itemName}_id`] = item.id
    },
    delete () {
      // console.log('delete!');
    },
    fetchData () {
      request({
        url: `sirens/${this.$route.params.id}`,
        method: 'GET'
      })
        .then((r) => {
          this.siren = r.data.siren
          this.siren_types = r.data.siren_types
          this.contacts = r.data.contacts
          this.companies = r.data.companies
          this.setSelect('siren', 'siren_types', 'siren_type', 'siren_type_id')
          this.setSelect('siren', 'contacts', 'contact', 'contact_id')
          this.setSelect('siren', 'companies', 'company', 'company_id')
          this.isLoaded = true
        })
    },
    setSelect (root, list, item, value) {
      this[root][item] = this[list].find(v => v.id === this[root][value])
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
