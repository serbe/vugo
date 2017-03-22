<template>
  <div class="field">
    <label v-if="getLabel" class="label">{{ getLabel }}</label>
    <p :class="classList">
      <a v-if="hyper" :href="hyper">
        <input v-if="type=='text'"
          :class="inputClassList"
          type="text"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
          :autocomplete="autocomplete">
        <input v-if="type=='email'"
          :class="inputClassList"
          type="email"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
          :autocomplete="autocomplete">
        <input v-if="type=='tel'"
          :class="inputClassList"
          type="tel"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
          :autocomplete="autocomplete">
        <span v-if="icon" class="icon is-small">
          <i :class="'fa fa-' + icon"></i>
        </span>
      </a>
      <template v-else>
        <input v-if="type=='text'"
          :class="inputClassList"
          type="text"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
          :autocomplete="autocomplete">
        <input v-if="type=='email'"
          :class="inputClassList"
          type="email"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
          :autocomplete="autocomplete">
        <input v-if="type=='tel'"
          :class="inputClassList"
          type="tel"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="updateValue($event.target.value)"
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
      updateValue: function (value) {
        var formattedValue = value.trim()
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        this.$emit('input', formattedValue)
      }
    }
  }
</script>
