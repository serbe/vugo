<template>
  <div class="field">
    <label v-if="getLabel" class="label">{{ getLabel }}</label>
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
        <vue-icon v-if="icon" :size="size" :position="iconPosition" :icon="icon" :color="color"/>
        <p v-if="isError" class="help is-danger">{{ error }}</p>
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
        <vue-icon v-if="icon" :size="size" :position="iconPosition" :icon="icon" :color="color"/>
        <p v-if="isError" class="help is-danger">{{ error }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import icon from '@/elements/Icon'

export default {
  name: 'vue-input',
  components: {
    'vue-icon': icon
  },
  props: {
    value: '',
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: [String, Boolean],
      default: false
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left'
    },
    color: {
      type: [String, Boolean],
      default: false
    },
    size: {
      type: [String, Boolean],
      default: false
    },
    state: {
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
      const res = ['control is-expanded']
      if (this.icon) {
        res.push(`has-icons-${this.iconPosition}`)
      }
      return res
    },
    inputClassList () {
      const res = ['input']
      if (this.color) {
        res.push(this.color.split(' ').map(e => `is-${e}`))
      }
      if (this.size) {
        res.push(this.size.split(' ').map(e => `is-${e}`))
      }
      if (this.state) {
        res.push(this.state.split(' ').map(e => `is-${e}`))
      }
      return res
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
