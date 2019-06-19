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
    "bulma-icon": BulmaIcon
  },
  props: {
    tag: {
      type: String,
      default: "a",
      validator: value => ["a", "button", "submit", "reset"].includes(value)
    },
    text: {
      type: [String, Boolean],
      default: false
    },
    color: {
      type: [String, Boolean],
      default: false,
      validator: value =>
        !value ||
        [
          "white",
          "light",
          "dark",
          "black",
          "text",
          "primary",
          "link",
          "info",
          "success",
          "warning",
          "danger"
        ].includes(value)
    },
    size: {
      type: [String, Boolean],
      default: false,
      validator: value =>
        !value || ["small", "normal", "medium", "large"].includes(value)
    },
    fullwidth: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    hovered: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: [String, Boolean],
      default: false
    },
    iconRight: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      inputType: this.tag
    };
  },
  computed: {
    classList() {
      return {
        button: true,
        [`is-${this.color}`]: this.color,
        [`is-${this.size}`]: this.size,
        "is-fullwidth": this.fullwidth,
        "is-outlined": this.outlined,
        "is-inverted": this.inverted,
        "is-rounded": this.rounded,
        "is-hovered": this.hovered,
        "is-focused": this.focused,
        "is-active": this.active,
        "is-loading": this.loading,
        "is-static": this.static
      };
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
