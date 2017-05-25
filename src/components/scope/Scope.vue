<template>
  <form :model="scope" id="scope">

    <vue-input v-model="scope.name" label placeholder="Наименование сферы дефтельности" icon="tag"/>

    <vue-input v-model="scope.note" label placeholder="Заметка" icon="comment"/>

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
  name: 'scope',
  components: {
    'vue-input': require('@/elements/Input'),
    'vue-button': require('@/elements/Button')
  },
  data () {
    return {
      title: '',
      scope: {
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
      let url = 'http://localhost:9090/scopes'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.scope
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/scopes')
    },
    close () {
      this.$router.push('/scopes')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      request({
        url: 'scopes/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        let data = r.data
        this.scope = data.scope
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
