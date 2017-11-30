<template>
  <div class="container">
    <vue-table
      name="company"
      :names="['Наименование', 'Адрес', 'Сфера деятельности', 'Телефон', 'Факс', 'Тренировки']"
      :columns="['name', 'address', 'scope_name', 'phones', 'faxes', 'practices']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-touch', 'is-hidden-mobile', 'w9 nowrap', 'is-hidden-touch w9 nowrap', 'is-hidden-touch is-hidden-desktop-only w9 nowrap']"
      :cellTypes="['text', 'text', 'text', 'array', 'array', 'array']"
      pagination
      hyper
      search
      adding
    ></vue-table>
  </div>
</template>

<script>
import vtable from '@/elements/Table'
import mixin from '@/mixins/funcs'
import mix from '@/mixins/mix'

export default {
  name: 'companies',
  components: {
    'vue-table': vtable
  },
  mixins: [mixin, mix],
  mounted () {
    this.fetchData('companies')
  },
  methods: {
    createList (companies) {
      let list = []
      if (companies) {
        list = companies.map((c) => {
          const str = [c.name, c.address, c.scope_name]
          if (c.phones.length > 0 && c.phones[0] !== '') {
            str.push(c.phones.join(' '))
          }
          if (c.faxes.length > 0 && c.faxes[0] !== '') {
            str.push(c.faxes.join(' '))
          }
          if (c.practices.length > 0 && c.practices[0] !== '') {
            str.push(c.practices.join(' '))
          }
          const nc = c
          nc.str = str.join(' ').toLowerCase()
          return nc
        })
      }
      return list
    }
  }
}
</script>
