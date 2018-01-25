<template>
  <div class="container mw768">
    <form :model="scope" id="scope">

      <vue-input v-model="scope.name" label placeholder="Наименование сферы дефтельности" icon="tag"></vue-input>

      <vue-input v-model="scope.note" label placeholder="Заметка" icon="comment"></vue-input>

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
import VueInput from '@/elements/VueInput'
import VueButton from '@/elements/VueButton'
import request from '@/request'

export default {
  name: 'ScopeItem',
  components: {
    'vue-input': VueInput,
    'vue-button': VueButton
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
  mounted () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'scopes'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.scope
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
      this.$router.push('/scopes')
    },
    delete () {
      // console.log('delete!');
    },
    fetchData () {
      request({
        url: `scopes/${this.$route.params.id}`,
        method: 'GET'
      })
        .then((r) => {
          this.scope = r.data.scope
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
