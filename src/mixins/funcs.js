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
    }
  }
}
