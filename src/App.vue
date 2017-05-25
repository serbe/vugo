<template>
  <div id="app">
      <vue-navigation/>
      <section class="section pt1">
      <div class="container">
        <!--<img src="./assets/logo.png">-->
        <router-view></router-view>
      </div>
      </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    'vue-navigation': require('@/components/Navigation')
  }
}
</script>

<style lang="scss">
  body {
    font-size: 0.85rem !important;
  }

  .select select {
    padding-right: 2.5em !important;
  }

  .pt1 {
    padding-top: 1rem !important;
  }

  $primary: #2B2B2B;

  $text: hsl(0, 0%, 14%);

  $size-1:	2.85rem;
  $size-2:	2.35rem;
  $size-3:	1.85rem;
  $size-4:	1.35rem;
  $size-5:	1.1rem;
  $size-6:	0.85rem;
  $size-7:	0.6rem;

  @import "~bulma/bulma.sass";

  $fa-font-path: "~font-awesome/fonts";
  @import "~font-awesome/scss/font-awesome";
</style>
