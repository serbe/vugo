<template>
  <div class="container mw768">
    <form :model="sirenType" id="sirenType">

      <vue-input v-model="sirenType.name" label placeholder="Тип сирены" iconLeft="tag"/>
      <vue-input v-model="sirenType.radius" label placeholder="Радиус действия сирены (метры)" iconLeft="circle-o"/>
      <vue-input v-model="sirenType.note" label placeholder="Заметка" iconLeft="comment"/>

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
  </div>
</template>

<script>
import vinput from '@/elements/Input'
import vbutton from '@/elements/Button'
import request from '@/request'

export default {
  name: 'sirenType',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton
  },
  data () {
    return {
      title: '',
      sirenType: {
        id: 0,
        name: '',
        radius: '',
        note: ''
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'sirentypes'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.sirenType
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/sirentypes')
    },
    close () {
      this.$router.push('/sirentypes')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      request({
        url: 'sirentypes/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        let data = r.data
        this.sirenType = data.siren_type
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
