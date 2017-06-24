<template>
  <div>
    <template v-if="type === 'text'">{{ value }}</template>
    <template v-else-if="type === 'array'"><span v-for="(item, index) in value" v-bind:key="index">{{ item }}<br></span></template>
    <template v-else-if="type === 'checkbox'"><input type="checkbox" disabled :checked="value"></template>
    <template v-else>{{ value }}</template>
  </div>
</template>

<script>
  export default {
    name: 'vue-cell',
    data () {
      return {
        // query: '',
        // page: 1,
        // list: []
      }
    },
    props: {
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      value: {
        required: false
      }
    }
  }
</script>
