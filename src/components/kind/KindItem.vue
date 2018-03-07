<template>
  <div class="container mw768">
    <form :model="kind" id="kind">

      <bulma-input v-model="kind.name" label placeholder="Наименование типа тренировки" icon="tag"></bulma-input>

      <bulma-input v-model="kind.short_name" label placeholder="Сокращенное наименование" icon="tag"></bulma-input>

      <bulma-input v-model="kind.note" label placeholder="Заметка" icon="comment"></bulma-input>

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
import BulmaInput from '@/elements/BulmaInput'
import BulmaButton from '@/elements/BulmaButton'
import Kind from '@/objects/Kind'
import request from '@/request'

export default {
  name: 'KindItem',
  components: {
    'bulma-input': BulmaInput,
    'bulma-button': BulmaButton
  },
  data () {
    return {
      title: '',
      kind: Kind
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'kinds'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.kind
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
      this.$router.push('/kinds')
    },
    delete () {
      // console.log('delete!');
    },
    fetchData () {
      request({
        url: `kinds/${this.$route.params.id}`,
        method: 'GET'
      })
        .then((r) => {
          this.kind = r.data.kind
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
