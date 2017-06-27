<template>
  <section class="hero is-dark">
		<div class="hero-head">
      <div class="container">
        <nav class="nav has-shadow">
          <div class="nav-left">
            <router-link to="/" class="nav-item is-tab" exact>ЕДДС</router-link>
            <router-link v-if="!auth" to="/login" class="nav-item is-tab">Авторизация</router-link>
            <template v-else>
              <router-link to="/contacts" class="nav-item is-tab">Контакты</router-link>
              <router-link to="/companies" class="nav-item is-tab">Организации</router-link>
            </template>
          </div>
          <span v-if="auth" class="nav-toggle" :class="active" @click="toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div v-if="auth" class="nav-right nav-menu" :class="active">
            <a class="nav-item is-tab" @click="toggleSirenTab">Сирены</a>
            <a class="nav-item is-tab" @click="toggleTab">Справочники</a>
            <div class="nav-item">
              <vue-button text="Выход" color="info" @click="logout"></vue-button>
            </div>
          </div>
        </nav>
      </div>
      <div class="container">
        <div v-if="auth" class="tabs is-right">
          <ul v-if="tabSirenShow">
            <li><router-link to="/sirens">Сирены</router-link></li>
            <li><router-link to="/sirentypes">Типы сирен</router-link></li>
          </ul>
          <ul v-if="tabShow">
            <li><router-link to="/departments">Отделы</router-link></li>
            <li><router-link to="/educations">Обучение</router-link></li>
            <li><router-link to="/kinds">Типы</router-link></li>
            <li><router-link to="/posts">Должности</router-link></li>
            <li><router-link to="/practices">Учения</router-link></li>
            <li><router-link to="/ranks">Чины</router-link></li>
            <li><router-link to="/scopes">Сферы</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vbutton from '@/elements/Button'
export default {
  name: 'vue-navigation',
  components: {
    'vue-button': vbutton
  },
  data () {
    return {
      active: '',
      tabShow: false,
      tabSirenShow: false
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    toggle () {
      this.active = this.active === '' ? 'is-active' : ''
    },
    toggleTab () {
      this.tabShow = !this.tabShow
      this.tabSirenShow = false
    },
    toggleSirenTab () {
      this.tabSirenShow = !this.tabSirenShow
      this.tabShow = false
    }
  }
}
</script>

<style scoped>
.is-active {
  border-bottom: 3px solid #363636;
}
</style>
