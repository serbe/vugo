<template>
  <div class="container mw768">
    <form :model="rank" id="rank">

      <vue-input v-model="rank.name" label placeholder="Наименование чина" icon="tag"></vue-input>

      <vue-input v-model="rank.note" label placeholder="Заметка" icon="comment"></vue-input>

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
  name: 'RankItem',
  components: {
    'vue-input': VueInput,
    'vue-button': VueButton
  },
  data () {
    return {
      title: '',
      rank: {
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
      let url = 'ranks'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.rank
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
      this.$router.push('/ranks')
    },
    delete () {
      // console.log('delete!');
    },
    fetchData () {
      request({
        url: `ranks/${this.$route.params.id}`,
        method: 'GET'
      })
        .then((r) => {
          this.rank = r.data.rank
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
