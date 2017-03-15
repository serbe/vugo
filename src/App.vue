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

<style lang="sass">
@import "node_modules/bulma/bulma"
</style>
