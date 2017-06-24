<template>
  <div class="field">
    <label v-if="getLabel" class="label">{{ getLabel }}</label>
    <div class="field has-addons">
      <p class="control">
        <span class="select">
          <select v-model="day" @change="changeDate">
            <option v-for="item in dayList" v-bind:key="item" :value="item">{{ item }}</option>
          </select>
        </span>
      </p>
      <p class="control">
        <span class="select">
          <select v-model="month" @change="changeDate">
            <option v-for="item in monthList" v-bind:key="item" :value="item">{{ item }}</option>
          </select>
        </span>
      </p>
      <p class="control">
        <span class="select">
          <select v-model="year" @change="changeDate">
            <option v-for="item in yearList" v-bind:key="item" :value="item">{{ item }}</option>
          </select>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  // import mixin from '@/mixins/funcs'

  export default {
    name: 'date',
    props: {
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: false
      }
    },
    data: () => ({
      year: 0,
      month: 0,
      day: 0
    }),
    watch: {
      value: function (val) {
        let arr = val.split('-')
        if (arr.length === 3) {
          this.year = arr[0]
          this.month = arr[1]
          this.day = arr[2]
        }
      }
    },
    computed: {
      getLabel () {
        if (this.label && this.label !== '') {
          return this.label
        } else {
          return false
        }
      },
      yearList () {
        let currentYear = new Date().getFullYear()
        let list = []
        for (let i = currentYear; i > currentYear - 100; i--) {
          list.push(i.toString())
        }
        return list
      },
      monthList () {
        let list = []
        for (let i = 1; i < 13; i++) {
          list.push(i.toString().length === 1 ? '0' + i : i.toString())
        }
        return list
      },
      dayList () {
        let days = new Date(this.year, this.month, 0).getDate()
        let list = []
        for (let i = 1; i <= days; i++) {
          list.push(i.toString().length === 1 ? '0' + i : i.toString())
        }
        return list
      }
    },
    methods: {
      changeDate () {
        let date = this.year + '-' + this.month + '-' + this.day
        if (date.length === 10) {
          this.$emit('input', date)
        }
      }
    }
  }
</script>
