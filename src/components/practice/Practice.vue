<template>
  <div class="container mw768">
    <form :model="practice" id="practice">

      <vue-select :list="companies" :selected-item="practice.company" label="Организация" item-name="company" @select="onSelect" icon="building" ></vue-select>

      <vue-select :list="kinds" :selected-item="practice.kind" label="Тип тренировки" item-name="kind" @select="onSelect" icon="tag" ></vue-select>

      <vue-input type="text" label placeholder="Тема тренировки" iconLeft="tag" v-model="practice.topic" ></vue-input>

      <vue-date v-model="practice.date_of_practice" label="Дата проведения тренировки"></vue-date>

      <vue-input type="text" label="Заметка" placeholder="Заметка" iconLeft="comment" v-model="practice.note" ></vue-input>

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
import vdate from '@/elements/Date'
import vselect from '@/elements/Select'
import request from '@/request'

export default {
  name: 'practice',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-date': vdate,
    'vue-select': vselect
  },
  data () {
    return {
      title: '',
      practice: {
        id: 0,
        company_id: 0,
        company: {
          id: 0,
          name: ''
        },
        company_name: '',
        kind_id: 0,
        kind: {
          id: 0,
          name: ''
        },
        kind_name: '',
        date_of_practice: '',
        topic: '',
        note: ''
      },
      companies: [{
        id: 0,
        name: ''
      }],
      kinds: [{
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
      this.practice[itemName] = item
      this.practice[itemName + '_id'] = item.id
    },
    submit () {
      let url = 'practices'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      const values = this.practice
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
      .then(function (res) {
        // console.log(res)
      })
      this.$router.push('/practices')
    },
    close () {
      this.$router.push('/practices')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      request({
        url: 'practices/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        const data = r.data
        this.practice = data.practice
        this.companies = data.companies
        this.kinds = data.kinds
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
