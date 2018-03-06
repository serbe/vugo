<template>
  <div class="field">
    <p class="control">
      <a :class="aClassList" @click="click">
        <bulma-icon v-if="icon" :size="size" :icon="icon" :position="iconPosition" :color="color" key="ButtonIcon"/>
        <template v-if="text">{{ text }}</template>
      </a>
    </p>
  </div>
</template>

<script>
import BulmaIcon from '@/elements/BulmaIcon'

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
