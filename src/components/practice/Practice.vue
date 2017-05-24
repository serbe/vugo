<template>
  <form :model="practice" id="practice">

    <vue-select :list="companies" :selected-item="practice.company" label="Организация" item-name="company" @select="onSelect" icon="building" />

    <vue-select :list="kinds" :selected-item="practice.kind" label="Тип тренировки" item-name="kind" @select="onSelect" icon="tag" />

    <vue-input type="text" label placeholder="Тема тренировки" icon="tag" v-model="practice.topic" />

    <vue-date v-model="practice.date_of_practice" label="Дата проведения тренировки"/>

    <vue-input type="text" label="Заметка" placeholder="Заметка" icon="comment" v-model="practice.note" />

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
import http from '@/http'

export default {
  name: 'practice',
  components: {
    'vue-input': require('@/elements/Input'),
    'vue-button': require('@/elements/Button'),
    'vue-date': require('@/elements/Date'),
    'vue-select': require('@/elements/Select')
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
      let url = 'http://localhost:9090/practices'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.practice
      http({
        url: url,
        method: method,
        mode: 'cors',
        body: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
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
      http({
        url: 'practices/' + this.$route.params.id,
        method: 'GET'
      })
      .then(r => r.json())
      .then((data) => {
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
