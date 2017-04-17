<template>
  <div id="app">
      <vue-navigation/>
      <section class="section">
      <div class="container">
        <!--<img src="./assets/logo.png">-->
        <router-view></router-view>
      </div>
      </section>
  </div>
</template>

<script>
import navigation from '@/components/Navigation'
export default {
  name: 'app',
  components: {
    'vue-navigation': navigation
  }
}
</script>

<style lang="scss">
  @import "~bulma/bulma.sass";

  $fa-font-path: "~font-awesome/fonts";
  @import "~font-awesome/scss/font-awesome";
</style>
