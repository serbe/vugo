<template>
  <div class="container mw768">
    <form :model="siren" id="siren">
<--

	NumID     int64     `sql:"num_id,null"     json:"num_id"     form:"num_id"     query:"num_id"`
	NumPass   string    `sql:"num_pass,null"   json:"num_pass"   form:"num_pass"   query:"num_pass"`
--	TypeID    int64     `sql:"type_id"         json:"type_id"    form:"type_id"    query:"type_id"`
--	Type      SirenType `sql:"-"               json:"siren_type" form:"siren_type" query:"siren_type"`
--	Address   string    `sql:"address,null"    json:"address"    form:"address"    query:"address"`
	Radio     string    `sql:"radio,null"      json:"radio"      form:"radio"      query:"radio"`
	Desk      string    `sql:"desk,null"       json:"desk"       form:"desk"       query:"desk"`
	ContactID int64     `sql:"contact_id,null" json:"contact_id" form:"contact_id" query:"contact_id"`
	Contact   Contact   `sql:"-"               json:"contact"    form:"contact"    query:"contact"`
	CompanyID int64     `sql:"company_id,null" json:"company_id" form:"company_id" query:"company_id"`
	Company   Company   `sql:"-"               json:"company"    form:"company"    query:"company"`
	Latitude  string    `sql:"latitude,null"   json:"latitude"   form:"latitude"   query:"latitude"`
	Longitude string    `sql:"longitude,null"  json:"longitude"  form:"longitude"  query:"longitude"`
	Stage     int64     `sql:"stage,null"      json:"stage"      form:"stage"      query:"stage"`
	Own       string    `sql:"own,null"        json:"own"        form:"own"        query:"own"`
	Note      string    `sql:"note,null"       json:"note"       form:"note"       query:"note"`

      <vue-select :list="siren_types" :selected-item="siren.type" label="Тип сирены" item-name="type" @select="onSelect" icon="tag" ></vue-select>
      <vue-input v-model="siren.address" type="text" label placeholder="Адрес" iconLeft="address-card" ></vue-input>

      <vue-input v-model="sirenType.radius" label placeholder="Радиус действия сирены" iconLeft="circle-o"></vue-input>
      <vue-input v-model="sirenType.note" label placeholder="Заметка" iconLeft="comment"></vue-input>


            label.col-sm-3.control-label(for='organization') Организация
            input.form-control(type='text', id='organization', value=siren.organization, name='organization')


            label.col-sm-2.control-label(for='control') Тип управления
            input.form-control(type='text', id='control', value=siren.control, name='control')

            label.col-sm-3.control-label(for='startupDate') Дата ввода в эксплуатацию
            input.form-control(type='date', id='startupDate', value=siren.startupDate, name='startupDate')

            label.col-sm-2.control-label(for='population') Количество населения
            input.form-control(type='text', id='population', value=siren.population, name='population')

            label.col-sm-3.control-label(for='coverage') Радиус действия
            input.form-control(type='text', id='coverage', value=siren.coverage, name='coverage')

            label.col-sm-2.control-label(for='rateCoverage') Процент охвата
            input.form-control(type='text', id='rateCoverage', value=siren.rateCoverage, name='rateCoverage')

            label.col-sm-3.control-label(for='state') Состояние
            input.form-control(type='text', id='state', value=siren.state, name='state')

            label.col-sm-3.control-label(for='responsible') Ответственное лицо
            input.form-control(type='text', id='responsible', value=siren.responsible, name='responsible')

            label.col-sm-3.control-label(for='phones') Контактные телефоны
            input.form-control(type='text', id='phones', value=siren.phones, name='phones')

            label.col-sm-3.control-label(for='photo') Файлы фотофиксации
            input.form-control(type='text', id='photo', placeholder='Файлы фотофиксации')
            input.form-control(type='file', name='files', multiple='', id='photo')

            label.col-sm-3.control-label(for='coordinate') Координаты на карте
            input.form-control(type='text', id='coordinate', value=siren.coordinate, name='coordinate')


--\>
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
import request from '@/request'

export default {
  name: 'sirenType',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect
  },
  data () {
    return {
      title: '',
      sirenType: {
        id: 0,
        name: '',
        radius: '',
        note: ''
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'sirenTypes'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      const values = this.sirenType
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/sirenTypes')
    },
    onSelect (item, itemName) {
      this.contact[itemName] = item
      this.contact[itemName + '_id'] = item.id
    },
    close () {
      this.$router.push('/sirenTypes')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      request({
        url: 'sirenTypes/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        const data = r.data
        this.sirenType = data.sirenType
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

.w300 {
  width: 300px !important;
}
</style>
