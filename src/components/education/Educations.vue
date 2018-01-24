<template>
  <div class="container">
    <vue-table
      name="education"
      :names="['Обучаемый', 'Должность ГО ЧС', 'Начало обучения', 'Конец обучения']"
      :columns="['contact_name', 'post_name', 'start_str', 'end_str']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-mobile', '', 'is-hidden-mobile']"
      :cellTypes="['text', 'text', 'text', 'text']"
      pagination
      hyper
      search
      adding
    ></vue-table>
  </div>
</template>

<script>
import vtable from '@/elements/Table'
import mix from '@/mixins/mix'

export default {
  name: 'educations',
  components: {
    'vue-table': vtable
  },
  mixins: [mix],
  mounted () {
    this.fetchData('educations')
  },
  methods: {
    createList (educations) {
      let list = []
      if (educations) {
        list = educations.map((e) => {
          const str = [e.contact_name, e.start_str, e.end_str]
          e.str = str.join(' ').toLowerCase()
          return e
        })
      }
      return list
    }
  }
}
</script>
