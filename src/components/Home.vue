<template>
  <div class="content has-text-centered">
    <h2>{{ dwidth }}</h2>
    <h2>{{ dpr }}</h2>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  },
  computed: {
    dwidth () {
      return (window.innerWidth > 0) ? window.innerWidth : screen.width
    },
    dpr () {
      return window.devicePixelRatio
    }
  }
}
</script>

<style scoped>

</style>
