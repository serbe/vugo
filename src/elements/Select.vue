<template>
  <div class="field">
    <label v-if="getLabel" class="label">{{ getLabel }}</label>
    <p class="control dropdown-search">
      <div class="select is-fullwidth">
        <input type="text" class="hide search-id" name="company-scope-id" value='{{ .Company.ScopeID }}'>
        <input
          :class="inputClassList"
          type="text"
          :name="name"
          :placeholder="placeholder"
          @onkeyup="onkeyup"
          onfocus="onfocusinput"
           data-id="{{ .Company.ScopeID }}" autocomplete="off">
        <div class="select-box">
            <div class="select-item" data-id="0" onclick="sic(this)"></div>
            {{ range $scope := .ScopesSelect }}
            <div class="select-item" data-id="{{ $scope.ID }}" onclick="sic(this)">{{ $scope.Name }}</div>
            {{ end }}
        </div>
      </div>
    </p>


    <p :class="classList">
        <input
          :class="inputClassList"
          :type="type"
          ref="input"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          @input="onInput"
          :autocomplete="autocomplete">
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
        inputValue: this.value
      }
    },
    computed: {
      inputClassList () {
        var res = ['input']
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
        if (this.label !== false && this.placeholder !== false && this.label === '') {
          return this.placeholder
        } else {
          return this.label
        }
      }
    },
    methods: {
      onInput (event) {
        const val = event.target.value
        this.newValue = val
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
      placeholder: {
        type: [String, Boolean],
        required: false,
        default: false
      },
      autocomplete: {
        type: [String, Boolean],
        required: false,
        default: false
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
      }
    }
  }
</script>
