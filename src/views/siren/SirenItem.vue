<template>
  <div class="container mw768">
    <form :model="siren" id="siren">

      <div class="columns">
        <div class="column is-half">
          <bulma-input v-model="siren.num_pass" type="text" label placeholder="Серийный номер" icon="tag"></bulma-input>
        </div>
        <div class="column is-half">
          <bulma-select :list="siren_types" :selected-item="siren.siren_type" label="Тип сирены" item-name="siren_type" @select="onSelect" icon="tag"></bulma-select>
        </div>
      </div>

      <bulma-input v-model="siren.address" type="text" label placeholder="Адрес" icon="address-card"></bulma-input>
      <bulma-select :list="contacts" :selected-item="siren.contact" label="Контактное лицо" item-name="contact" @select="onSelect" icon="user"></bulma-select>
      <bulma-select :list="companies" :selected-item="siren.company" label="Организация" item-name="company" @select="onSelect" icon="building"></bulma-select>

      <div class="columns">
        <div class="column is-half">
          <bulma-input v-model="siren.latitude" label placeholder="Широта" icon="tag"></bulma-input>
        </div>
        <div class="column is-half">
          <bulma-input v-model="siren.longitude" label placeholder="Долгота" icon="tag"></bulma-input>
        </div>
      </div>
      <bulma-input v-model="siren.note" label placeholder="Заметка" icon="comment"></bulma-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <bulma-button text="Сохранить" color="primary" @click="submit"></bulma-button>
        </div>
        <div class="control">
          <bulma-button text="Закрыть" @click="close"></bulma-button>
        </div>
        <div class="control">
          <bulma-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');"></bulma-button>
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

import BulmaInput from '@/components/BulmaInput'
import BulmaButton from '@/components/BulmaButton'
import BulmaSelect from '@/components/BulmaSelect'
import Siren from '@/objects/Siren'
import SelectItem from '@/objects/SelectItem'
import mixItem from '@/mixins/mixItem'
import request from '@/request'

export default {
  name: 'SirenItem',
  components: {
    'bulma-input': BulmaInput,
    'bulma-button': BulmaButton,
    'bulma-select': BulmaSelect
  },
  mixins: [mixItem],
  data () {
    return {
      title: '',
      siren: Siren,
      siren_types: [SelectItem],
      contacts: [SelectItem],
      companies: [SelectItem]
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
      this.fetchItem('sirens', ['siren', 'siren_types', 'contacts', 'companies'])
      if (this.fetched) {
        this.setSelect('siren', 'siren_types', 'siren_type', 'siren_type_id')
        this.setSelect('siren', 'contacts', 'contact', 'contact_id')
        this.setSelect('siren', 'companies', 'company', 'company_id')
      }
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
