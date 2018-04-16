<template>
  <div class="container mw768">
    <form :model="sirenType" id="sirenType">

      <bulma-input v-model="sirenType.name" label placeholder="Тип сирены" icon="tag"></bulma-input>
      <bulma-input v-model="sirenType.radius" label placeholder="Радиус действия сирены (метры)" icon="circle-o" type="number"></bulma-input>
      <bulma-input v-model="sirenType.note" label placeholder="Заметка" icon="comment"></bulma-input>

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
import BulmaInput from '@/components/BulmaInput'
import BulmaButton from '@/components/BulmaButton'
import SirenType from '@/objects/SirenType'
import mixItem from '@/mixins/mixItem'
import request from '@/request'

export default {
  name: 'SirenTypeItem',
  components: {
    'bulma-input': BulmaInput,
    'bulma-button': BulmaButton
  },
  mixins: [mixItem],
  data () {
    return {
      title: '',
      sirenType: SirenType
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'sirentypes'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.sirenType
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
      this.$router.push('/sirentypes')
    },
    delete () {
      // console.log('delete!');
    },
    fetchData () {
      this.fetchItem('sirentypes', ['siren_type'])
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
