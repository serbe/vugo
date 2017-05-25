<template>
  <div class="container w300">
    <h3 class="title is-3">Авторизация</h3>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <vue-input v-model="name" label placeholder="Имя пользователя" icon="user"/></p>
    <vue-input v-model="pass" type="password" label placeholder="Пароль" icon="lock"/>
    <div class="field is-grouped pt10">
      <vue-button text="Вход" color="primary" @click="login" class="pl20"/>
      <vue-button text="Закрыть" @click="close" class="pl20" color="light"/>
    </div>
    <p v-if="error" class="error">Bad login information</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  components: {
    'vue-input': require('@/elements/Input'),
    'vue-button': require('@/elements/Button')
  },
  data () {
    return {
      name: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      let store = this.$store
      let router = this.$router
      let url = '/login'
      let data = {
        username: this.name,
        password: this.pass
      }
      if (process.env.NODE_ENV === 'development') {
        url = 'http://localhost:9090/login'
      }
      axios({
        url: url,
        method: 'POST',
        data: data
      })
      .then((r) => {
        if (r.data.token && r.data.token !== '') {
          store.dispatch('login', { 'name': data.username, 'admin': false })
          store.dispatch('setToken', r.data.token)
          router.push({name: 'home'})
        }
      })
      .catch((e) => {
        console.log(e)
      })
    },
    close () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .error {
    color: red;
  }

  .w300 {
    width: 300px;
  }

  .pt10 {
    padding-top: 10px;
  }

  .pl20 {
    padding-left: 20px;
  }

  .w56 {
    min-width: 56px !important;
  }
</style>
