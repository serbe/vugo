<template>
  <nav class="pagination is-centered" v-if="max > 1" ref="pagination">
    <a class="pagination-previous" v-if="value > 1" @click="onClick(value - 1)">Previous</a>
    <a class="pagination-next" v-if="value < max" @click="onClick(value + 1)">Next page</a>
    <ul class="pagination-list">
      <li v-if="value > 3">
        <a class="pagination-link" @click="onClick(1)">1</a>
      </li>
      <li v-if="value > 4">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="value > 2">
        <a class="pagination-link" @click="onClick(value - 1)">{{ value - 1 }}</a>
      </li>
      <li>
        <a class="pagination-link is-current">{{ value }}</a>
      </li>
      <li v-if="value < max - 2">
        <a class="pagination-link" @click="onClick(value + 1)">{{ value + 1 }}</a>
      </li>
      <li v-if="value < max - 3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link" @click="onClick(max)">{{ max }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'vue-pagination',
  props: {
    allElems: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    perPage: {
      required: true
    }
  },
  computed: {
    value () {
      return this.page
    },
    max () {
      return this.allElems % this.perPage === 0 ? this.allElems / this.perPage | 0 : (this.allElems / this.perPage | 0) + 1
    }
  },
  methods: {
    onClick: function (num) {
      this.$emit('pagination', num)
    }
  }
}
</script>
