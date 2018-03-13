<template>
  <a :class="classList" @click="click" :disabled="disabled">
    <bulma-icon v-if="icon" :size="size" :icon="icon" :position="iconPosition" :color="color" key="ButtonIcon"/>
    <span v-if="text">{{ text }}</span>
  </a>
</template>

<script>
import BulmaIcon from '@/components/BulmaIcon'

export default {
  name: 'BulmaButton',
  components: {
    'bulma-icon': BulmaIcon
  },
  props: {
    text: {
      type: [String, Boolean],
      default: false
    },
    color: {
      type: [String, Boolean],
      default: false
    },
    size: {
      type: [String, Boolean],
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    hovered: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    classList () {
      const res = ['button']
      if (this.color) {
        res.push(`is-${this.color}`)
      }
      if (this.size) {
        res.push(`is-${this.size}`)
      }
      if (this.outlined) {
        res.push('is-outlined')
      }
      if (this.inverted) {
        res.push('is-inverted')
      }
      if (this.rounded) {
        res.push('is-rounded')
      }
      if (this.hovered) {
        res.push('is-hovered')
      }
      if (this.focused) {
        res.push('is-focused')
      }
      if (this.active) {
        res.push('is-active')
      }
      if (this.loading) {
        res.push('is-loading')
      }
      if (this.static) {
        res.push('is-static')
      }
      return res
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
