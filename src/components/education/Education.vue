<template>
  <form :model="education" id="education">

    <div class="columns">
      <div class="column">
        <vue-date v-model="education.start_date" label="Дата начала обучения"/>
      </div>

      <div class="column">
        <vue-date v-model="education.end_date" label="Дата конца обучения"/>
      </div>
    </div>

    <vue-input type="text" label="Заметка" placeholder="Заметка" icon="comment" v-model="education.note" />

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
import request from '@/request'

export default {
  name: 'education',
  components: {
    'vue-input': require('@/elements/Input'),
    'vue-button': require('@/elements/Button'),
    'vue-date': require('@/elements/Date')
  },
  data () {
    return {
      title: '',
      education: {
        id: 0,
        start_date: '',
        end_date: '',
        note: ''
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'http://localhost:9090/educations'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.education
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/educations')
    },
    close () {
      this.$router.push('/educations')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      request({
        url: 'educations/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        let data = r.data
        this.education = data.education
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
