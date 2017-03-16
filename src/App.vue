<template>
  <div id="app">
    <!--<section class="section">-->
      <div class="container">
        <!--<img src="./assets/logo.png">-->
        <router-view></router-view>
      </div>
    <!--</section>-->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "~bulma";
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";
</style>
