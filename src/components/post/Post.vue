<template>
  <form :model="post" id="post">

    <vue-input v-model="post.name" label placeholder="Наименование должности" icon="tag"/>

    <vue-switch :checked="post.go" v-model="post.go" label="Должность по гражданской обороне"/>

    <vue-input v-model="post.note" label placeholder="Заметка" icon="comment"/>

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
  name: 'post',
  components: {
    'vue-input': require('@/elements/Input'),
    'vue-button': require('@/elements/Button'),
    'vue-switch': require('@/elements/Switch')
  },
  data () {
    return {
      title: '',
      post: {
        id: 0,
        name: '',
        go: false,
        note: ''
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'http://localhost:9090/posts'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = url + '/' + this.$route.params.id
        method = 'PUT'
      }
      let values = this.post
      request({
        url: url,
        method: method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
      .then(function (res) {
        console.log(res)
      })
      this.$router.push('/posts')
    },
    close () {
      this.$router.push('/posts')
    },
    delete () {
      console.log('delete!')
    },
    fetchData () {
      request({
        url: 'posts/' + this.$route.params.id,
        method: 'GET'
      })
      .then((r) => {
        let data = r.data
        this.post = data.post
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
