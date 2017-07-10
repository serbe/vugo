<template>
  <div id="app">
    <vue-navbar></vue-navbar>
    <section class="section pt1">
      <!--<img src="./assets/logo.png">-->
      <router-view></router-view>
    </section>
    <footer class="footer bot">
      <div class="container">
        <div class="content has-text-centered">© 2017 Сочи</div>
      </div>
    </footer>
  </div>
</template>

<script>
import vnavbar from '@/components/Navbar';

export default {
  name: 'app',
  components: {
    'vue-navbar': vnavbar,
  },
};
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

.mw768 {
  max-width: 768px !important;
}

.bot {
    background-color: white !important;
    padding: 6rem 1.5rem 3rem !important;
}
$primary: #2B2B2B;

$text: hsl(0, 0%, 14%);

$size-1: 2.85rem;
$size-2: 2.35rem;
$size-3: 1.85rem;
$size-4: 1.35rem;
$size-5: 1.1rem;
$size-6: 0.85rem;
$size-7: 0.6rem;

@import "~bulma/bulma.sass";

$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";
</style>
