<template>
  <div class="field">
    <label v-if="getLabel" class="label" key="SwitchLabel">{{ label }}</label>
    <p class="control">
      <label class="switch" :class="classObject">
        <input type="checkbox" :name="name" :disabled="disabled" v-model="value">
      </label>
    </p>
  </div>
</template>

<script>
export default {
  name: 'BulmaSwitch',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isFullwidth: {
      type: Boolean,
      default: false
    },
    type: String,
    size: String,
    checked: {
      type: Boolean,
      default: false
    },
    name: String,
    label: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      value: null
    }
  },
  beforeMount () {
    this.value = this.checked
  },
  mounted () {
    this.$emit('input', this.value = !!this.checked)
  },
  computed: {
    getLabel () {
      return this.label
    },
    classObject () {
      return {
        [`is-${this.type}`]: this.type,
        [`is-${this.size}`]: this.size,
        checked: this.value
      }
    }
  },
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/derived-variables';

.switch {
  --height: 22px;
  input {
    opacity: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }
  // appearance: none;
  position: relative;
  outline: 0;
  border-radius: calc(0.8 * var(--height));
  width: calc(1.625 * var(--height));
  height: var(--height);
  background-color: $border;
  border: 1px solid $border;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  &:before,
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    height: calc(var(--height) - 2px);
    border-radius: calc((var(--height) - 2px) / 2);
    transition: .233s;
  }
  &:before {
    width: calc(1.625 * var(--height) - 2px);
    background-color: $grey-lighter;
  }
  &:after {
    width: calc(var(--height) - 2px);
    background-color: #FFF;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1);
  }
  &.checked {
    border-color: $text;
    background-color: $text;
    &:before {
      transform: scale(0);
    }
    &:after {
      transform: translateX(calc(0.625 * var(--height)));
    }
  }
  // Colors
  // @each $name, $pair in $colors {
  //   $color: nth($pair, 1);
  //   &.is-#{$name} {
  //     &.checked {
  //       border-color: $color;
  //       background-color: $color;
  //     }
  //   }
  // }
  // Sizes
  &.is-small {
    --height: 12px
  }
  &.is-medium {
    --height: 28px
  }
  &.is-large {
    --height: 32px
  }
}
</style>