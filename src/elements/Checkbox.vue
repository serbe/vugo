<template>
  <div class="field">
    <p class="control">
      <a v-if="hyper" :href="hyper">
        <label v-if="getLabel" class="checkbox">
          <input
            :class="inputClassList"
            type="checkbox"
            ref="checkbox"
            :name="name"
            :value="value"
            v-model=inputValue
            :disabled="getDisabled"
            @blur="onBlur"
            @click="onClick"
          >{{ getLabel }}
        </label v-if="getLabel">
      </a>
      <template v-else>
        <label v-if="getLabel" class="checkbox">
          <input
            :class="inputClassList"
            type="checkbox"
            ref="checkbox"
            :name="name"
            :value="value"
            v-model=inputValue
            :disabled="getDisabled"
            @blur="onBlur"
            @click="onClick"
          >{{ getLabel }}
        </label v-if="getLabel">
      </template>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'vue-checkbox',
    data () {
      return {
        inputValue: false
      }
    },
    computed: {
      inputClassList () {
        var res = ['']
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
        if (this.label !== false && this.label === '') {
          return ''
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
      }
    },
    methods: {
      onClick () {
        let val = true
        if (this.value) {
          val = false
        }
        this.$emit('input', val)
      },
      onBlur (event) {
        let ret = {id: this.id, event: event}
        this.$emit('blur', ret)
      }
    },
    props: {
      value: '',
      name: {
        type: [String, Boolean],
        default: false,
        required: false
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
      }
    }
  }
</script>
