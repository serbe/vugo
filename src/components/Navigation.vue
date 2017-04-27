<template>
  <nav class="nav">
    <div class="nav-left">
      <router-link to="/" class="nav-item">ЕДДС</router-link>
      <router-link to="/contacts" class="nav-item">Контакты</router-link>
      <router-link to="/companies" class="nav-item">Организации</router-link>
      <router-link to="/educations" class="nav-item">Обучение</router-link>
      <router-link to="/posts" class="nav-item">Должности</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'vue-navigation'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
