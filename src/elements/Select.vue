<template>
    <div class="field">
      <label v-if="getLabel" class="label">{{ getLabel }}</label>
      <div class="select is-fullwidth">
          <input
            :class="inputClassList"
            :type="type"
            ref="select"
            :name="name"
            :placeholder="placeholder"
            :value="value"
            @input="onSearchInput"
            @blur="onSearchBlur">
          <!--<input class="input select-input" type="text" name="company-scope" id="company-scope" placeholder="Сфера деятельности" onkeyup="filterClass(this)" onfocus="vd(this)" data-id="{{ .Company.ScopeID }}" autocomplete="off">
          <div class="select-box">
              <div class="select-item" data-id="0" onclick="sic(this)"></div>
              {{ range $scope := .ScopesSelect }}
              <div class="select-item" data-id="{{ $scope.ID }}" onclick="sic(this)">{{ $scope.Name }}</div>
              {{ end }}
          </div>-->
      </div>
  </div>
</template>

<script>
// Export the component itself
export default {
  name: 'vue-select',
  props: {
    value: '',
    name: {
      type: [String, Boolean],
      default: false,
      required: false
    },
    // icon: {
    //   type: [String, Boolean],
    //   required: false,
    //   default: false
    // },
    // color: {
    //   type: [String, Boolean],
    //   default: false,
    //   required: false
    // },
    // size: {
    //   type: [String, Boolean],
    //   default: false,
    //   required: false
    // },
    // state: {
    //   type: [String, Boolean],
    //   default: false,
    //   required: false
    // },
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
    // autocomplete: {
    //   type: [String, Boolean],
    //   required: false,
    //   default: false
    // },
    // hyper: {
    //   type: [String, Boolean],
    //   required: false,
    //   default: false
    // },
    id: {
      type: [String, Boolean],
      required: true,
      default: []
    },
    options: {
      type: [Array, Boolean]
    }
  },
  // Component inner state
  data () {
    //
    return {
      opened: false,
      searchField: '',
      saveSearchField: '',
      selected: undefined
    }
  },
  // Computed properties
  computed: {
    getLabel () {
      if (this.label !== false && this.placeholder !== false && this.label === '') {
        return this.placeholder
      } else {
        return this.label
      }
    }
  },
  // Methods
  methods: {
    onSearchInput (event) {
      // const val = event.target.value
      // this.newValue = val
      // this.$emit('input', val)
    },
    onSearchBlur (event) {
      // let ret = {id: this.id, event: event}
      // this.$emit('blur', ret)
    }
  },
  // Watchers
  watch: {

  },
  // When the component is created
  created () {
    // do it
    this.selectVModel()
  }
}
</script>

<style>

</style>
