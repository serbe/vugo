<template>
  <div class="field">
    <p class="control">
      <a :class="aClassList" @click="click">
        <span v-if="icon" class="icon is-small">
          <i :class="'fa fa-' + icon"></i>
        </span>
        <template v-if="text">{{ text }}</template>
      </a>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'vue-button',
    props: {
      text: {
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
      }
    },
    computed: {
      aClassList () {
        const res = ['button']
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
      }
    },
    methods: {
      click () {
        this.$emit('click')
      }
    }
  }
</script>
