<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <p :class="classList">
      <input class="input" :type="type" :name="name" :placeholder="placeholder" :value="value" @input="value = $emit('input', $event.target.value)" :autocomplete="autocomplete">
      <span v-if="icon" class="icon is-small">
        <i :class="'fa fa-' + icon"></i>
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'vue-input',
    data () {
      return {
      }
    },
    props: {
      value: {
        type: String,
        default: false
      },
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
      }
    },
    computed: {
      classList () {
        var res = ['control']
        if (this.icon) {
          res.push('has-icon')
        }
        return res
      }
    }
  }
</script>
