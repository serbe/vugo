<template>
  <div class="container w300">
    <div class="content has-text-centered">
      <h2>Авторизация</h2>
    </div>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <vue-input v-model="name" label placeholder="Имя пользователя" icon="user"></vue-input>
    <vue-input v-model="pass" type="password" label placeholder="Пароль" icon="lock" @keyup="onKeyup"></vue-input>
    <div class="field is-grouped pt10">
      <vue-button text="Вход" color="primary" @click="login" class="pl20"></vue-button>
      <vue-button text="Закрыть" @click="close" class="pl20" color="light"></vue-button>
    </div>
    <p v-if="error" class="error">Bad login information</p>
  </div>
</template>

<script>
import vinput from '@/elements/Input'
import vbutton from '@/elements/Button'
import auth from '@/auth'
import axios from 'axios'

export default {
  name: 'login',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton
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
      const router = this.$router
      let url = '/edds/api/login'
      const data = {
        username: this.name,
        password: this.pass
      }
      if (process.env.NODE_ENV === 'development') {
        url = 'http://localhost:9090/edds/api/login'
      }
      let rightPage = auth.right_page
      axios({
        url,
        method: 'POST',
        data
      })
        .then((r) => {
          if (r.data.token && r.data.token !== '') {
            auth.login(r.data)
            router.push({name: rightPage})
          }
        })
    },
    close () {
      this.$router.push('/')
    },
    onKeyup (event) {
      if (event.event.key === 'Enter') {
        this.login()
      }
    }
  }
}
</script>

<style>
  .error {
    color: red;
  }

  .w300 {
    width: 300px !important;
  }

  .pt10 {
    padding-top: 10px;
  }

  .pl20 {
    padding-left: 20px;
  }
</style>
