<template>
  <div class="field">
    <label v-if="getLabel" class="label">{{ getLabel }}</label>
    <p :class="classList" @click="openOptions">
      <input
        :class="inputClassList"
        type="text"
        ref="vueSelect"
        autocomplete="off"
        :placeholder="placeholder"
        v-model="isLoaded ? searchText : selectedItem.name"
        tabindex="0"
        @blur="onBlur"
        @keydown.up="onKeyUp"
        @keydown.down="onKeyDown"
        @keyup.enter="onKeyEnter"
        @keydown.delete="onKeyDelete"
      >
      <span v-if="icon" class="icon">
        <i :class="'fa fa-' + icon"></i>
      </span>
      <div class="select-box" v-if="opened==true">
        <template  v-for="item in filteredList">
          <div class="select-item" @click.stop="selectItem(item)" @mousedown="mousedownItem">{{ item.name }}</div>
        </template>
      </div>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vue-select',
  props: {
    selectedItem: {
      type: Object,
      default: () => { return { id: 0, name: '' } }
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
    list: {
      type: [Array, Boolean],
      required: true,
      default: []
    }
  },
  data () {
    return {
      opened: false,
      searchText: this.selectedItem.name,
      mousedownState: false,
      placeholder: '',
      isLoaded: false
    }
  },
  computed: {
    classList () {
      var res = ['control is-expanded select is-fullwidth']
      if (this.icon) {
        res.push('has-icon')
      }
      return res
    },
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
    filteredList () {
      if (this.searchText) {
        return this.list.filter(item => {
          return item.name.match(new RegExp(this.searchText, 'i'))
        })
      } else {
        return this.list
      }
    },
    item () {
      if (this.selectedItem) {
        return { id: this.selectedItem.id, name: this.selectedItem.name }
      } else {
        return { id: 0, name: '' }
      }
    }
  },
  methods: {
    openOptions () {
      this.isLoaded = true
      this.$refs.vueSelect.focus()
      this.searchText = ''
      this.placeholder = this.selectedItem.name
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
      this.searchText = item.name
      this.closeOptions()
      this.$emit('select', item)
    },
    onBlur () {
      if (!this.mousedownState) {
        this.searchText = this.selectedItem.name
        this.closeOptions()
      }
    },
    onKeyUp () {
      // const selectedItemIndex = this.filteredOptions.findIndex(item => {
      //   return item.selected === true
      // })
      // if (selectedItemIndex === -1) {
      //   this.filteredOptions[0].selected = true
      // } else if (selectedItemIndex !== 0) {
      //   this.filteredOptions[selectedItemIndex].selected = false
      //   this.filteredOptions[selectedItemIndex - 1].selected = true
      // }
    },
    onKeyDown () {
      // const selectedItemIndex = this.filteredOptions.findIndex(item => {
      //   return item.selected === true
      // })
      // if (selectedItemIndex === -1) {
      //   this.filteredOptions[0].selected = true
      // } else if (selectedItemIndex !== this.filteredOptions.length - 1) {
      //   this.filteredOptions[selectedItemIndex].selected = false
      //   this.filteredOptions[selectedItemIndex + 1].selected = true
      // }
    },
    onKeyEnter () {
      // const selectedItem = this.filteredOptions.find(item => {
      //   return item.selected === true
      // })
      // if (selectedItem) {
      //   this.selectItem(selectedItem)
      // }
    },
    onKeyDelete () {
      // if (!this.searchText && this.selectedOption) {
      //   this.selectItem({})
      //   this.openOptions()
      // }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 0.75rem;
}

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
