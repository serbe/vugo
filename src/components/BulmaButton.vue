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
      validator (value) {
        return ['white', 'light', 'dark', 'text', 'primary', 'link', 'info', 'success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
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
      return {
        button: true,
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
