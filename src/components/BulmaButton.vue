<template>
  <a :class="classList" @click="click" :disabled="disabled">
    <bulma-icon v-if="iconLeft" :size="size" :icon="iconLeft" position="left" :color="color" key="ButtonIconLeft"/>
    <bulma-icon v-if="iconRight" :size="size" :icon="iconRight" position="right" :color="color" key="ButtonIconRight"/>
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
      default: false,
      validator: (value) => ['white', 'light', 'dark', 'black', 'text', 'primary', 'info', 'success', 'warning', 'danger'].includes(value) || !value
    },
    size: {
      type: [String, Boolean],
      default: false,
      validator: (value) => ['small', 'medium', 'large'].includes(value) || !value
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
    iconLeft: {
      type: [String, Boolean],
      default: false
    },
    iconRight: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    classList () {
      return {
        'button': true,
        [`is-${this.color}`]: this.color,
        [`is-${this.size}`]: this.size,
        'is-outlined': this.outlined,
        'is-inverted': this.inverted,
        'is-rounded': this.rounded,
        'is-hovered': this.hovered,
        'is-focused': this.focused,
        'is-active': this.active,
        'is-loading': this.loading,
        'is-static': this.static
      }
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
