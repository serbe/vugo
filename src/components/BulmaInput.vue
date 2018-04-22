<template>
  <div class="field">
    <label v-if="getLabel" class="label" key="InputLabel">{{ getLabel }}</label>
    <div :class="classList">
      <a v-if="hyper" :href="hyper">
        <input
          ref="input"
          :class="inputClassList"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          :disabled="getDisabled"
          :autocomplete="autocomplete"
          @input="onInput"
          @blur="onBlur"
          @keyup="onKeyup"
        >
        <bulma-icon v-if="iconLeft" :size="size" position="left" :icon="iconLeft" :color="color" key="InputIconLeft"/>
        <bulma-icon v-if="iconRight" :size="size" position="right" :icon="iconRight" :color="color" key="InputIconRight"/>
        <p v-if="isError" class="help is-danger" key="InputError">{{ error }}</p>
      </a>
      <template v-else>
        <input
          ref="input"
          :class="inputClassList"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          :disabled="getDisabled"
          :autocomplete="autocomplete"
          @input="onInput"
          @blur="onBlur"
          @keyup="onKeyup"
        >
        <bulma-icon v-if="iconLeft" :size="size" position="left" :icon="iconLeft" :color="color" key="InputIconLeft"/>
        <bulma-icon v-if="iconRight" :size="size" position="right" :icon="iconRight" :color="color" key="InputIconRight"/>
        <p v-if="isError" class="help is-danger" key="InputError">{{ error }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import BulmaIcon from '@/components/BulmaIcon'

export default {
  name: 'BulmaInput',
  components: {
    'bulma-icon': BulmaIcon
  },
  props: {
    value: '',
    type: {
      type: String,
      default: 'text'
      // validator: (value) => ['text', 'password', 'email', 'tel'].includes(value)
    },
    color: {
      type: [String, Boolean],
      default: false
      // validator: (value) => ['primary', 'info', 'success', 'warning', 'danger'].includes(value)
    },
    size: {
      type: [String, Boolean],
      default: false
      // validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    state: {
      type: [String, Boolean],
      default: false
    },
    name: {
      type: [String, Boolean],
      default: false
    },
    iconLeft: {
      type: [String, Boolean],
      default: false
    },
    iconRight: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: [String, Boolean],
      default: false
    },
    placeholder: {
      type: [String, Boolean],
      default: false
    },
    autocomplete: {
      type: [String, Boolean],
      default: false
    },
    hyper: {
      type: [String, Boolean],
      default: false
    },
    id: {
      type: [String, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: [String, Boolean],
      default: false
    },
    pattern: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  computed: {
    classList () {
      return {
        'control': true,
        'is-expanded': true,
        'has-icons-left': this.iconLeft,
        'has-icons-right': this.iconRight
      }
    },
    inputClassList () {
      return {
        'input': true,
        [`is-${this.color}`]: this.color,
        [`is-${this.size}`]: this.size,
        [`is-${this.state}`]: this.state
      }
    },
    getLabel () {
      if (this.label !== false && this.placeholder !== false && this.label === '') {
        return this.placeholder
      }
      return this.label
    },
    getDisabled () {
      if (this.disabled) {
        return 'disabled'
      }
      return false
    },
    isError () {
      if (this.value !== '' && this.pattern) {
        const patt = new RegExp(this.pattern)
        return !patt.test(this.value)
      }
      return false
    }
  },
  methods: {
    onInput (event) {
      const val = event.target.value
      this.$emit('input', val)
    },
    onBlur (event) {
      const ret = { id: this.id, event }
      this.$emit('blur', ret)
    },
    onKeyup (event) {
      const ret = { id: this.id, event }
      this.$emit('keyup', ret)
    }
  }
}
</script>
