<template>
    <div class="field">
      <label v-if="getLabel" class="label">{{ getLabel }}</label>
      <div class="select is-fullwidth" tabindex="-1" @blur="onBlurSelect">
          <input
            :class="inputClassList"
            type="text"
            ref="select"
            :name="name"
            :placeholder="placeholder"
            :value="value"
            @input="onSearchInput"
            @blur="onSearchBlur"
            @click="onClickInput">
          <!--<input class="input select-input" type="text" name="company-scope" id="company-scope" placeholder="Сфера деятельности" onkeyup="filterClass(this)" onfocus="vd(this)" data-id="{{ .Company.ScopeID }}" autocomplete="off">-->
          <div class="select-box" v-if="opened==true" tabindex="-2" @blur="onBlurSelectBox">
            <template  v-for="(item, index) in options">
            <!--<div class="select-item" data-id="0" onclick="sic(this)"></div>-->
              <div class="select-item" :data-id="item.id" @click="onClickItem">{{ item.name }}</div>
            </template>
          </div>
      </div>
  </div>
</template>

<script>
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
    id: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    options: {
      type: [Array, Boolean],
      required: true,
      default: []
    }
  },
  data () {
    return {
      opened: false,
      searchField: '',
      saveSearchField: '',
      selected: undefined
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
    onSearchInput (event) {
      // const val = event.target.value
      // this.newValue = val
      // this.$emit('input', val)
    },
    onSearchBlur (event) {
      // let ret = {id: this.id, event: event}
      // this.$emit('blur', ret)
    },
    onClickInput (event) {
      if (!this.opened) {
        this.opened = true
      }
    },
    onClickItem (event) {
      // console.log(event)
      this.$emit('input', event.target.outerText)
      // this.value =
      this.opened = false
    },
    onBlurSelect: function (event) {
      console.log('onBlurSelect')
      console.log(event)
    },
    onBlurSelectBox: function (event) {
      console.log('onBlurSelectBox')
      console.log(event)
    }
  },
  // Watchers
  watch: {

  },
  // When the component is created
  created () {
    // do it
    // this.selectVModel()
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.select-box {
    box-shadow: inset 0 1px 2px rgba(17, 17, 17, 0.1);
    /*display: inline-block;*/
    position: absolute;
    border: 1px solid #1fc8db;
    /*visibility: hidden;*/
    background-color: #FFF;
    /*left: -1px;*/
    /*top: 20%;*/
    width: 100%;
    overflow: auto;
    z-index: 5;
    /*margin-top: -10px;*/
    max-height: 300px;
}

.select-item {
    background-color: white;
    /*border: 1px solid #d3d6db;*/
    /*border-radius: 3px;*/
    color: #222324;
    height: 22px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 12px;
    white-space: nowrap;
    /*box-shadow: inset 0 1px 2px rgba(17, 17, 17, 0.1);*/
}

.select-item:hover {
    background-color: #aeb1b5;
}
</style>
