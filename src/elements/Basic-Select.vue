<template>
  <div class="ui fluid search selection dropdown"
       :class="{ 'active visible':showMenu, 'error': isError }" @click="openOptions">
    <i class="dropdown icon"></i>
    <input class="search" autocomplete="off" tabindex="0" v-model="searchText" ref="searchInput"
           @blur="blurInput"
           @keydown.up="prevItem"
           @keydown.down="nextItem"
           @keyup.enter="enterItem"
           @keydown.delete="deleteTextOrItem"
    />
    <div class="text" :class="textClass">{{inputText}}</div>
    <div class="menu" :class="menuClass" :style="menuStyle" tabindex="-1">
      <template v-for="(option, idx) in filteredOptions">
        <div class="item" :class="{ 'selected': option.selected }"
             @click.stop="selectItem(option)"
             @mousedown="mousedownItem">
          {{option.name}}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  /* event : select */
  // import common from '../common'
  export default {
    props: {
      'options': {
        type: Array
      },
      'selectedOption': {
        type: Object,
        default: () => { return { id: '', name: '' } }
      },
      'isError': {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showMenu: false,
        searchText: '',
        mousedownState: false // mousedown on option menu
      }
    },
    computed: {
      inputText () {
        if (this.searchText) {
          return ''
        } else {
          let text = this.placeholder
          if (this.selectedOption.name) {
            text = this.selectedOption.name
          }
          return text
        }
      },
      textClass () {
        if (!this.selectedOption.name && this.placeholder) {
          return 'default'
        } else {
          return ''
        }
      },
      menuClass () {
        return {
          visible: this.showMenu,
          hidden: !this.showMenu
        }
      },
      menuStyle () {
        return {
          display: this.showMenu ? 'block' : 'none'
        }
      },
      filteredOptions () {
        if (this.searchText) {
          return this.options.filter(option => {
            return option.name.match(new RegExp(this.searchText, 'i'))
          })
        } else {
          return this.options
        }
      }
    },
    methods: {
      deleteTextOrItem () {
        if (!this.searchText && this.selectedOption) {
          this.selectItem({})
          this.openOptions()
        }
      },
      // cursor on input
      openOptions () {
        this.$refs.searchInput.focus()
        this.showMenu = true
        this.mousedownState = false
      },
      blurInput () {
        if (!this.mousedownState) {
          this.searchText = ''
          this.closeOptions()
        }
      },
      closeOptions () {
        this.showMenu = false
      },
      prevItem () {
        const selectedItemIndex = this.filteredOptions.findIndex(item => {
          return item.selected === true
        })
        if (selectedItemIndex === -1) {
          this.filteredOptions[0].selected = true
        } else if (selectedItemIndex === 0) {
          // nothing todo
        } else {
          this.filteredOptions[selectedItemIndex].selected = false
          this.filteredOptions[selectedItemIndex - 1].selected = true
        }
      },
      nextItem () {
        const selectedItemIndex = this.filteredOptions.findIndex(item => {
          return item.selected === true
        })
        if (selectedItemIndex === -1) {
          this.filteredOptions[0].selected = true
        } else if (selectedItemIndex === this.filteredOptions.length - 1) {
          // nothing todo
        } else {
          this.filteredOptions[selectedItemIndex].selected = false
          this.filteredOptions[selectedItemIndex + 1].selected = true
        }
      },
      enterItem () {
        const selectedItem = this.filteredOptions.find(item => {
          return item.selected === true
        })
        if (selectedItem) {
          this.selectItem(selectedItem)
        }
      },
      mousedownItem () {
        this.mousedownState = true
      },
      selectItem (option) {
        this.searchText = '' // reset text when select item
        this.closeOptions()
        this.$emit('select', option)
      }
    }
  }
</script>

<style scoped>
.ui.dropdown {
  min-height: 14px !important;
}

.ui.dropdown .text {
  font-size: 14px !important;
}

.ui.dropdown .menu > .item {
  font-size: 14px !important;
}

.ui.search.selection.dropdown > input.search {
  font-size: 14px !important;
  line-height: 14px !important;
}

.ui.selection.dropdown .menu {
  min-width: calc(100%) !important;
  width: calc(100%) !important;
}
.ui.fluid.dropdown {
  width: auto;
}
.ui.label > .delete.icon:after {
  content: "x";
  color: #266d4d;
  font-size: 16px;
  font-style: normal;
}
</style>
