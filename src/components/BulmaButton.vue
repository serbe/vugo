<template>
  <button
    v-if="(inputType = 'button')"
    :class="classList"
    @click="click"
    :disabled="disabled"
  >
    <bulma-icon
      v-if="iconLeft"
      :size="size"
      :icon="iconLeft"
      position="left"
      :color="color"
      key="ButtonIconLeft"
    />
    <bulma-icon
      v-if="iconRight"
      :size="size"
      :icon="iconRight"
      position="right"
      :color="color"
      key="ButtonIconRight"
    />
    <span v-if="text">{{ text }}</span>
  </button>
  <input
    v-else-if="['submit', 'reset'].includes(inputType)"
    :class="classList"
    @click.once="click"
    :type="inputType"
    :disabled="disabled"
    :value="text"
  />
  <a v-else :class="classList" @click="click" :disabled="disabled">
    <bulma-icon
      v-if="iconLeft"
      :size="size"
      :icon="iconLeft"
      position="left"
      :color="color"
      key="ButtonIconLeft"
    />
    <bulma-icon
      v-if="iconRight"
      :size="size"
      :icon="iconRight"
      position="right"
      :color="color"
      key="ButtonIconRight"
    />
    <span v-if="text">{{ text }}</span>
  </a>
</template>

<script>
import BulmaIcon from "@/components/BulmaIcon";

export default {
  name: "BulmaButton",
  components: {
    "bulma-icon": BulmaIcon,
  },
  props: {
    text: String,
    tag: {
      type: String,
      default: "a",
      validator: (value) => ["a", "button", "submit", "reset"].includes(value),
    },
    color: {
      type: String,
      validator: (value) =>
        !value ||
        [
          "white",
          "dark",
          "black",
          "text",
          "primary",
          "link",
          "info",
          "success",
          "warning",
          "danger",
        ].includes(value),
    },
    light: Boolean,
    size: {
      type: String,
      validator: (value) =>
        !value || ["small", "normal", "medium", "large"].includes(value),
    },
    fullwidth: Boolean,
    outlined: Boolean,
    inverted: Boolean,
    rounded: Boolean,
    hovered: Boolean,
    focused: Boolean,
    active: Boolean,
    loading: Boolean,
    static: Boolean,
    disabled: Boolean,
    iconLeft: String,
    iconRight: String,
  },
  data() {
    return {
      inputType: this.tag,
    };
  },
  computed: {
    classList() {
      return {
        button: true,
        [`is-${this.color}`]: this.color,
        "is-light": this.light,
        [`is-${this.size}`]: this.size,
        "is-fullwidth": this.fullwidth,
        "is-outlined": this.outlined,
        "is-inverted": this.inverted,
        "is-rounded": this.rounded,
        "is-hovered": this.hovered,
        "is-focused": this.focused,
        "is-active": this.active,
        "is-loading": this.loading,
        "is-static": this.static,
      };
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
