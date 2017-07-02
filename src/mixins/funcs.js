export default {
  methods: {
    checkArray (values, key) {
      let firstElem = -1
      let emptyElem = 0
      let fillElem = 0
      values.map((e, i) => {
        if (e[key] === '') {
          if (firstElem === -1) {
            firstElem = i
          }
          emptyElem++
        } else {
          fillElem++
        }
      })
      if (emptyElem > 1) {
        values.splice(firstElem, 1)
      }
      if (fillElem === values.length) {
        return true
      }
      return false
    },
    filterArray (values, key) {
      values.filter((e) => {
        return e[key] && e[key] !== ''
      })
      return values
    },
    telephone (value) {
      if (value !== undefined && value.length > 0) {
        value = value.replace(/[^0-9]/g, '')
        if (value.length === 10) {
          value = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4')
        }
        if (value.length === 11) {
          if (value[0] === '8') {
            value = '7' + value.slice(1)
          }
          value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
        }
        if (value.length === 7) {
          value = value.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')
        }
      }
      return value
    }
  }
}
