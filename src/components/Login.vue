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
// import auth from '../auth'
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
  // mounted () {
  //   console.log(this.$auth)
  // },
  methods: {
    login () {
      // this.$auth.login({
      //   params: {
      //     username: this.name,
      //     password: this.pass
      //   },
      //   success: function (r) {
      //     if (r.data.token && r.data.token !== '') {
      //       localStorage.setItem['token'] = r.data.token
      //       console.log(r.data.token)
      //     }
      //     this.$auth.token()
      //   },
      //   rememberMe: true,
      //   fetchUser: false
      //   // etc...
      // })
  //     auth.login(this.email, this.pass, loggedIn => {
  //       if (!loggedIn) {
  //         this.error = true
  //       } else {
  //         this.$router.replace(this.$route.query.redirect || '/')
  //       }
  //     })
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
