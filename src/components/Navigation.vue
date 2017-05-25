<template>
  <div class="container">
    <nav class="nav is-dark">
      <div class="nav-left">
        <router-link to="/" class="nav-item" exact>ЕДДС</router-link>
        <router-link v-if="!auth" to="/login" class="nav-item">Авторизация</router-link>
        <template v-else>
          <router-link to="/contacts" class="nav-item">Контакты</router-link>
          <router-link to="/companies" class="nav-item">Организации</router-link>
        </template>
      </div>
      <span v-if="auth" class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div v-if="auth" class="nav-right nav-menu">
        <router-link to="/departments" class="nav-item">Отделы</router-link>
        <router-link to="/educations" class="nav-item">Обучение</router-link>
        <router-link to="/kinds" class="nav-item">Типы</router-link>
        <router-link to="/posts" class="nav-item">Должности</router-link>
        <router-link to="/practices" class="nav-item">Учения</router-link>
        <router-link to="/ranks" class="nav-item">Чины</router-link>
        <router-link to="/scopes" class="nav-item">Сферы</router-link>
        <div class="nav-item">
          <vue-button text="Выход" color="primary" @click="logout"/>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'vue-navigation',
  components: {
    'vue-button': require('@/elements/Button')
  },
  computed: {
    auth () {
      // return this.$store.getters.isAuth
      return true
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*nav {
  border: 1px solid #363636;
}*/

.is-active {
  border-bottom: 3px solid #363636;
}
</style>
