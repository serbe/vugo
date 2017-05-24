<template>
  <form :model="kind" id="kind">

    <vue-input v-model="kind.name" label placeholder="Наименование типа тренировки" icon="tag"/>

    <vue-input v-model="kind.note" label placeholder="Заметка" icon="comment"/>

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
  name: 'kind',
  components: {
    'vue-input': require('@/elements/Input'),
    'vue-button': require('@/elements/Button')
  },
  data () {
    return {
      title: '',
      kind: {
        id: 0,
        name: '',
        note: ''
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'http://localhost:9090/kinds'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.kind
      http({
        url: url,
        method: method,
        mode: 'cors',
        body: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/kinds')
    },
    close () {
      this.$router.push('/kinds')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      http({
        url: 'kinds/' + this.$route.params.id,
        method: 'GET'
      })
      .then(r => r.json())
      .then((data) => {
        this.kind = data.kind
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
