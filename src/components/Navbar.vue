<template>
  <div class="container">
    <nav class="navbar ">
      <div class="navbar-brand">
        <template v-if="user.authenticated">
          <router-link to="/" class="navbar-item" exact>ЕДДС</router-link>
          <router-link to="/contacts" class="navbar-item">Контакты</router-link>
          <router-link to="/companies" class="navbar-item">Организации</router-link>
        </template>
        <router-link v-else to="/login" class="navbar-item">Авторизация</router-link>
        <div class="navbar-burger burger" data-target="navMenu" @click="toggle" :class="active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenu" class="navbar-menu" :class="active">
        <div class="navbar-start">
          <template v-if="user.authenticated">
            <router-link to="/sirens" class="navbar-item">Сирены</router-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Справочники</a>
              <div class="navbar-dropdown ">
                <router-link to="/departments" class="navbar-item ">Отделы</router-link>
                <router-link to="/educations" class="navbar-item ">Обучение</router-link>
                <router-link to="/kinds" class="navbar-item ">Типы</router-link>
                <router-link to="/posts" class="navbar-item ">Должности</router-link>
                <router-link to="/practices" class="navbar-item ">Учения</router-link>
                <router-link to="/ranks" class="navbar-item ">Чины</router-link>
                <router-link to="/scopes" class="navbar-item ">Сферы</router-link>
                <router-link to="/certificates" class="navbar-item ">Удостоверения</router-link>
                <hr class="navbar-divider">
                <router-link to="/sirentypes" class="navbar-item ">Типы сирен</router-link>
              </div>
            </div>
          </template>
        </div>
        <div class="navbar-end">
          <vue-button v-if="user.authenticated" class="navbar-item" text="Выход" color="info" @click="logout"></vue-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import auth from '@/auth';
  import vbutton from '@/elements/Button';

  export default {
    name: 'vue-navigation',
    components: {
      'vue-button': vbutton,
    },
    data() {
      return {
        active: '',
        tabShow: false,
        tabSirenShow: false,
        user: auth.user,
      };
    },
    methods: {
      logout() {
        auth.logout();
        this.$router.push('/login');
      },
      toggle() {
        this.active = this.active === '' ? 'is-active' : '';
      },
      toggleTab() {
        this.tabShow = !this.tabShow;
        this.tabSirenShow = false;
      },
      toggleSirenTab() {
        this.tabSirenShow = !this.tabSirenShow;
        this.tabShow = false;
      },
    },
  };
</script>

<style scoped>
a.is-active {
  border-bottom: 3px solid #363636;
}
</style>
