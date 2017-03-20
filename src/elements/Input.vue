<template>
  <div class="field">
    <label v-if="label" class="label" :name="name" :placeholder="placeholder">{{ label }}</label>
    <p class="control">
      <input class="input" :type="type" :placeholder="placeholder">
    </p>
  </div>
</template>

<script>
  export default {
    name: 'BInput',
    data () {
      return {
      }
    },
    props: {
      type: {
        type: String,
        required: true
      },
      name: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      // id: {
      //   type: String,
      //   required: false
      // },
      label: {
        type: [String, Boolean],
        default: false,
        required: false
      },
      error: {
        type: Boolean,
        default: true,
        required: false
      },
      placeholder: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      'iconAfter': {
        type: String,
        required: false
      },
      'iconBefore': {
        type: String,
        required: false
      }
    },
    computed: {
      // getPlaceholder () {
      //   if (this.placeholder === false) {
      //     return ''
      //   }
      //   if (this.placeholder === true) {
      //     return titleCase(this.name)
      //   }
      //   return this.placeholder
      // },
      // showLabel () {
      //   return typeof this.label === 'boolean' && this.label === true
      // },
      // module () {
      //   return this.$parent.module
      // },
      // getId () {
      //   return this.id ? this.id : this.namespace.replace('/', '-')
      // },
      // getLabel () {
      //   return typeof this.label === 'string' ? this.label : titleCase(this.name)
      // },
      // value: {
      //   get () {
      //     return store.get(this.namespace)
      //   },
      //   set (value) {
      //     store.set(this.namespace, value)
      //     store.dispatch(this.namespace + '.validate')
      //   }
      // },
      // isModified () {
      //   return store.get(this.namespace + '.isModified')
      // },
      // isValid () {
      //   return store.get(this.namespace + '.isValid')
      // },
      // errorMessage () {
      //   return typeof this.error === 'string'
      //     ? this.error
      //     : store.get(this.namespace + '.errorMessage')
      // },
      // showError () {
      //   return this.error && ((this.$parent.showErrors && !this.isValid) || (!this.isValid && this.isDirty))
      // }
    },
    methods: {
      // shakeErrors () {
      //   console.log('shake')
      // }
    }
    // created () {
      // if (this.$parent.module === undefined) {
      //   console.error('[Vue Warning] A VueInput component must be wrapped in a VueForm element with the module prop defined.')
      // }
    // }
  }
</script>
