<template>
    <div class="field">
      <label v-if="getLabel" class="label">{{ getLabel }}</label>
      <div class="select is-fullwidth" @click="openOptions">
          <input
            :class="inputClassList"
            type="text"
            ref="vueSelect"
            autocomplete="off"
            :placeholder="placeholder"
            tabindex="0" v-model="searchText"
            @blur="onBlur"
            @keydown.up="onKeyUp"
            @keydown.down="onKeyDown"
            @keyup.enter="onKeyEnter"
            @keydown.delete="onKeyDelete"
          />
          <div class="select-box" v-if="opened==true">
            <template  v-for="item in options">
              <div class="select-item" @click.stop="selectItem(item)" @mousedown="mousedownItem">{{ item.text }}</div>
            </template>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'vue-select',
  props: {
    selectedItem: {
      type: Object,
      default: () => { return { value: '', text: '' } }
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
    list: {
      type: [Array, Boolean],
      required: true,
      default: []
    }
  },
  data () {
    return {
      opened: false,
      searchText: '',
      mousedownState: false
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
    },
    filteredOptions () {
      if (this.searchText) {
        return this.options.filter(option => {
          return option.text.match(new RegExp(this.searchText, 'i'))
        })
      } else {
        return this.options
      }
    },
    options () {
      return this.list.map((e, i) => {
        return { value: e[this.optionValue], text: this.buildText(e) }
      })
    },
    item () {
      if (this.selectedItem) {
        return { value: this.selectedItem[this.optionValue], text: this.buildText(this.selectedItem) }
      } else {
        return { value: '', text: '' }
      }
    }
  },
  methods: {
    buildText (e) {
      if (e[this.id]) {
        if (this.name) {
          return this.customText(e)
        } else {
          return e[this.optionText]
        }
      } else {
        return ''
      }
    },
    openOptions () {
      this.$refs.vueSelect.focus()
      this.opened = true
      this.mousedownState = false
    },
    closeOptions () {
      this.opened = false
    },
    mousedownItem () {
      this.mousedownState = true
    },
    selectItem (item) {
      this.searchText = ''
      this.closeOptions()
      this.$emit('select', item)
    },
    onBlur () {
      if (!this.mousedownState) {
        this.searchText = ''
        this.closeOptions()
      }
    },
    onKeyUp () {
      const selectedItemIndex = this.filteredOptions.findIndex(item => {
        return item.selected === true
      })
      if (selectedItemIndex === -1) {
        this.filteredOptions[0].selected = true
      } else if (selectedItemIndex !== 0) {
        this.filteredOptions[selectedItemIndex].selected = false
        this.filteredOptions[selectedItemIndex - 1].selected = true
      }
    },
    onKeyDown () {
      const selectedItemIndex = this.filteredOptions.findIndex(item => {
        return item.selected === true
      })
      if (selectedItemIndex === -1) {
        this.filteredOptions[0].selected = true
      } else if (selectedItemIndex !== this.filteredOptions.length - 1) {
        this.filteredOptions[selectedItemIndex].selected = false
        this.filteredOptions[selectedItemIndex + 1].selected = true
      }
    },
    onKeyEnter () {
      const selectedItem = this.filteredOptions.find(item => {
        return item.selected === true
      })
      if (selectedItem) {
        this.selectItem(selectedItem)
      }
    },
    onKeyDelete () {
      if (!this.searchText && this.selectedOption) {
        this.selectItem({})
        this.openOptions()
      }
    }
  }
}
</script>

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
