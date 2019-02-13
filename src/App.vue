<template>
  <div id="app">
    <!-- <div v-if="$auth.ready()" key="AuthReady"> -->
    <bulma-navbar />
    <section class="section pt1">
      <router-view></router-view>
    </section>
    <!-- </div> -->
    <footer class="footer bot">
      <div class="container">
        <div class="content has-text-centered">© 2019 Сочи</div>
      </div>
    </footer>
  </div>
</template>

<script>
import BulmaNavBar from "@/components/BulmaNavBar";

export default {
  name: "app",
  components: {
    "bulma-navbar": BulmaNavBar
  }
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

$primary: #2b2b2b;

$text: hsl(0, 0%, 14%);

$size-1: 2.5rem;
$size-2: 2.08rem;
$size-3: 1.66rem;
$size-4: 1.25rem;
$size-5: 1.04rem;
$size-6: 0.83rem;
$size-7: 0.62rem;
</style>
