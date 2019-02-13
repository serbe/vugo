<template>
  <span :class="spanClass">
    <i :class="iconClass"></i>
  </span>
</template>

<script>
export default {
  name: "BulmaIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: [String, Boolean],
      default: false,
      validator: value =>
        ["info", "success", "warning", "danger"].includes(value)
    },
    size: {
      type: [String, Boolean],
      default: false,
      validator: value => !value || ["small", "medium", "large"].includes(value)
    },
    position: {
      type: [String],
      default: "left",
      validator: value => ["left", "right"].includes(value)
    }
  },
  computed: {
    spanClass() {
      return {
        icon: true,
        [`has-text-${this.color}`]: this.color,
        [`is-${this.size}`]: this.size,
        [`is-${this.position}`]: this.position
      };
    },
    iconClass() {
      return `fas fa-${this.icon}`;
    }
  }
};
</script>
