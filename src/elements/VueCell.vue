<template>
  <div>
    <template v-if="type === 'text'">{{ value }}</template>
    <template v-else-if="type === 'array'"><span v-for="(item, index) in value" :key="index">{{ item }}<br></span></template>
    <template v-else-if="type === 'checkbox'"><input type="checkbox" disabled :checked="value"></template>
    <template v-else>{{ value }}</template>
  </div>
</template>

<script>
export default {
  name: 'VueCell',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      required: false
    },
    cellClass: Array
  }
}
</script>
