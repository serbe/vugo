<template>
  <div class="container mw768">
    <form :model="post" id="post">

      <vue-input v-model="post.name" label placeholder="Наименование должности" iconLeft="tag"></vue-input>

      <vue-switch :checked="post.go" v-model="post.go" label="Должность по гражданской обороне"></vue-switch>

      <vue-input v-model="post.note" label placeholder="Заметка" iconLeft="comment"></vue-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <vue-button text="Сохранить" color="primary" @click="submit" ></vue-button>
        </div>
        <div class="control">
          <vue-button text="Закрыть" @click="close" ></vue-button>
        </div>
        <div class="control">
          <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');" ></vue-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import vinput from '@/elements/Input'
import vbutton from '@/elements/Button'
import vswitch from '@/elements/Switch'
import request from '@/request'

export default {
  name: 'post',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-switch': vswitch
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
  created () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'posts'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.post
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
      this.$router.push('/posts')
    },
    delete () {
      // console.log('delete!');
    },
    fetchData () {
      request({
        url: `posts/${this.$route.params.id}`,
        method: 'GET'
      })
        .then((r) => {
          this.post = r.data.post
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
