<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login">
      <label class="label">email</label>
      <p class="control">
        <input class="input" type="text" v-model="email" placeholder="email">
      </p>
      <label class="label">email</label>
      <p class="control">
        <input class="input" type="password" v-model="pass" placeholder="password">
      </p>
      <p class="control">
        <button class="button is-primary" type="submit">login</button>
      </p>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script>
// import auth from '../auth'
export default {
  data () {
    return {
      email: 'joe@example.com',
      pass: '',
      error: false
    }
  }
  // },
  // methods: {
  //   login () {
  //     auth.login(this.email, this.pass, loggedIn => {
  //       if (!loggedIn) {
  //         this.error = true
  //       } else {
  //         this.$router.replace(this.$route.query.redirect || '/')
  //       }
  //     })
  //   }
  // }
}
</script>

<style>
.error {
  color: red;
}
</style>
