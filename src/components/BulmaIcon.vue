<template>
    <span :class="spanClass">
      <i :class="iconClass"></i>
    </span>
</template>

<script>
export default {
  name: 'BulmaIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: [String, Boolean],
      default: false
    },
    size: {
      type: [String, Boolean],
      default: false
    },
    position: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    spanClass () {
      return {
        'icon': true,
        [`is-${this.color}`]: this.color,
        [`is-${this.size}`]: this.size,
        [`is-${this.position}`]: this.position
      }
    },
    iconClass () {
      return `fas fa-${this.icon}`
    }
  }
}
</script>
