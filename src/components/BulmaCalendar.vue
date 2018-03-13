<template>
  <div :id="id" class="datepicker" :class="overlay">
    <div v-if="options.overlay" class="modal-background" key="ModalBackground"></div>
    <div class="calendar">
      <div class="calendar-nav">
        <div class="calendar-nav-month">
          <div class="calendar-nav-previous-month">
            <button class="button is-small is-text">
              <i class="fa fa-chevron-left"></i>
            </button>
          </div>
          <div class="calendar-month">{{ monthName(month) }}</div>
          <div class="calendar-nav-next-month">
            <button class="button is-small is-text">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div class="calendar-nav-day">
          <div class="calendar-day"> {{ day }}</div>
        </div>
        <div class="calendar-nav-year">
          <div class="calendar-nav-previous-year">
            <button class="button is-small is-text">
              <i class="fa fa-chevron-left"></i>
            </button>
          </div>
          <div class="calendar-year">{{ year }}</div>
          <div class="calendar-nav-next-year">
            <button class="button is-small is-text">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-date">{{ getDayName(0, true) }}</div>
          <div class="calendar-date">{{ getDayName(1, true) }}</div>
          <div class="calendar-date">{{ getDayName(2, true) }}</div>
          <div class="calendar-date">{{ getDayName(3, true) }}</div>
          <div class="calendar-date">{{ getDayName(4, true) }}</div>
          <div class="calendar-date">{{ getDayName(5, true) }}</div>
          <div class="calendar-date">{{ getDayName(6, true) }}</div>
        </div>
        <div class="calendar-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import DatePicker from 'bulma-calendar/datepicker'
import { DatepickerLangs } from './calendar'
export default {
  name: 'BulmaCalentar',
  data () {
    return {
      picker: null,
      options: {
        overlay: false,
        lang: 'ru'
      },
      day: 0,
      month: 0,
      year: 0,
      datepicker_langs: null,
      abbr: false,
      open: false
    }
  },
  mounted () {
    this.datepicker_langs = DatepickerLangs
    // this._id = 'datePicker' + ( new Date() ).getTime() + Math.floor(Math.random() * Math.floor(9999));
    this.lang = typeof this.datepicker_langs[this.lang] !== 'undefined' ? this.lang : 'ru'
    // Set the startDate to the input value
    if (this.element.value) {
      this.options.startDate = new Date(this.element.value)
    }
    this.month = this.options.startDate.getMonth()
    this.year = this.options.startDate.getFullYear()
    this.day = this.options.startDate.getDate()
    // this.open = false
    // this._build()
    // this._bindEvents()
  },
  methods: {
    getDayName (day, abbr = false) {
      day += this.weekStart()
      while (day >= 7) {
        day -= 7
      }
      return this.abbr ? this.weekdayShort(day) : this.weekdayName(day)
    },
    prevMonth () {
      this.month -= 1
      this.adjustCalendar()
    },
    nextMonth () {
      this.month += 1
      this.adjustCalendar()
    },
    prevYear () {
      this.year -= 1
      this.adjustCalendar()
    },
    nextYear () {
      this.year += 1
      this.adjustCalendar()
    },
    adjustCalendar () {
      if (this.month < 0) {
        this.year -= Math.ceil(Math.abs(this.month) / 12)
        this.month += 12
      }
      if (this.month > 11) {
        this.year += Math.floor(Math.abs(this.month) / 12)
        this.month -= 12
      }
    },
    isDate (obj) {
      return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
    },
    isLeapYear (year) {
      return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
    },
    getDaysInMonth (year, month) {
      return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    }
  },
  computed: {
    overlay () {
      return this.options.overlay ? 'modal' : ''
    },
    weekStart () {
      return this.datepicker_langs[this.options.lang].weekStart
    },
    weekdayName (day) {
      return this.datepicker_langs[this.options.lang].weekdays[day]
    },
    weekdayShort (day) {
      return this.datepicker_langs[this.options.lang].weekdaysShort[day]
    },
    monthName (month) {
      return this.datepicker_langs[this.options.lang].months[month]
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~bulma/sass/utilities/_all';
@import '~bulma-calendar/calendar';
</style>
