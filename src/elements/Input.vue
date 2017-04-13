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
          :autocomplete="autocomplete">
        <span v-if="icon" class="icon is-small">
          <i :class="'fa fa-' + icon"></i>
        </span>
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
          :autocomplete="autocomplete">
        <span v-if="icon" class="icon is-small">
          <i :class="'fa fa-' + icon"></i>
        </span>
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
        if (this.icon) {
          res.push('has-icon')
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
      }
    },
    methods: {
      onInput (event) {
        const val = event.target.value
        this.newValue = val
        this.$emit('input', val)
      },
      onBlur (event) {
        this.$emit('blur', event)
      }
    },
    props: {
      value: '',
      type: {
        type: String,
        required: true
      },
      name: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      icon: {
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
      }
    }
  }
</script>
