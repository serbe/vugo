<template>
    <span :class="spanClass">
        <i :class="iconClass"/>
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
    size: {
      type: [String, Boolean],
      default: false
    },
    position: {
      type: [String, Boolean],
      default: false
    },
    color: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    spanClass () {
      let classList = ['icon']
      if (this.size) {
        classList.push(`is-${this.size}`)
      }
      if (this.position) {
        classList.push(`is-${this.position}`)
      }
      if (this.color) {
        classList.push(`is-${this.color}`)
      }
      return classList
    },
    iconClass () {
      return `fas fa-${this.icon}`
    }
  }
}
</script>
