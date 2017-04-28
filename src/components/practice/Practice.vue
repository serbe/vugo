<template>
  <form :model="education" id="education">

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Дата начала обучения</label>
          <p class="control">
            <vue-datepicker inputClass="input w300" v-model="education.start_date" language="ru" format="yyyy-MM-dd" />
          </p>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Дата конца обучения</label>
          <p class="control">
            <vue-datepicker inputClass="input w300" v-model="education.start_date" language="ru" format="yyyy-MM-dd" />
          </p>
        </div>
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
import input from '@/elements/Input'
import button from '@/elements/Button'
import datepicker from '@/elements/Datepicker'

export default {
  name: 'education',
  components: {
    'vue-input': input,
    'vue-button': button,
    'vue-datepicker': datepicker
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
      if (this.$route.params.id !== '') {
        url = url + '/' + this.$route.params.id
      }
      let values = this.education
      fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(values)
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
      fetch('http://localhost:9090/educations/' + this.$route.params.id)
      .then(r => r.json())
      .then((data) => {
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
