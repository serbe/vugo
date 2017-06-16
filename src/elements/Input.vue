<template>
  <div class="field">
    <label v-if="getLabel" class="label">{{ getLabel }}</label>
    <p :class="classList">
      <a v-if="hyper" :href="hyper">
        <input
          :class="inputClassList"
          :type="type"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          @input="onInput"
          @blur="onBlur"
          @keyup="onKeyup"
          :disabled="getDisabled"
          :autocomplete="autocomplete"
        >
        <span v-if="iconLeft" class="icon is-left">
          <i :class="'fa fa-' + iconLeft"></i>
        </span>
        <span v-if="iconRight" class="icon is-right">
          <i :class="'fa fa-' + iconRight"></i>
        </span>
        <p v-if="isError" class="help is-danger">{{ error }}</p>
      </a>
      <template v-else>
        <input
          :class="inputClassList"
          :type="type"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          @input="onInput"
          @blur="onBlur"
          @keyup="onKeyup"
          :disabled="getDisabled"
          :autocomplete="autocomplete"
        >
        <span v-if="iconLeft" class="icon is-left">
          <i :class="'fa fa-' + iconLeft"></i>
        </span>
        <span v-if="iconRight" class="icon is-right">
          <i :class="'fa fa-' + iconRight"></i>
        </span>
        <p v-if="isError" class="help is-danger">{{ error }}</p>
      </template>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'vue-input',
    data () {
      return {
        inputValue: this.value
      }
    },
    computed: {
      classList () {
        var res = ['control is-expanded']
        if (this.iconLeft) {
          res.push('has-icons-left')
        }
        if (this.iconRight) {
          res.push('has-icons-right')
        }
        return res
      },
      inputClassList () {
        var res = ['input']
        if (this.color) {
          res.push(this.color.split(' ').map(e => { return 'is-' + e }))
        }
        if (this.size) {
          res.push(this.size.split(' ').map(e => { return 'is-' + e }))
        }
        if (this.state) {
          res.push(this.state.split(' ').map(e => { return 'is-' + e }))
        }
        return res
      },
      getLabel () {
        if (this.label !== false && this.placeholder !== false && this.label === '') {
          return this.placeholder
        } else {
          return this.label
        }
      },
      getDisabled () {
        if (this.disabled) {
          return 'disabled'
        } else {
          return false
        }
      },
      isError () {
        if (this.value !== '' && this.pattern) {
          let patt = new RegExp(this.pattern)
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
        let ret = {id: this.id, event: event}
        this.$emit('blur', ret)
      },
      onKeyup (event) {
        let ret = {id: this.id, event: event}
        this.$emit('keyup', ret)
      }
    },
    props: {
      value: '',
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      name: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      iconLeft: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      iconRight: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      color: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      size: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      state: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      label: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      placeholder: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      autocomplete: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      hyper: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      id: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      error: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      pattern: {
        type: [String, Boolean],
        required: false,
        default: false
      }
    }
  }
</script>
