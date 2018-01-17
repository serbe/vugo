<template>
  <div class="container">
    <vue-table
      name="certificate"
      :names="['Номер', 'ФИО', 'УМЦ', 'Дата', 'Заметка']"
      :columns="['num', 'contact_name', 'company_name', 'cert_date', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', '', 'is-hidden-mobile', 'nowrap', 'is-hidden-mobile']"
      :cellTypes="['text', 'text', 'text', 'text', 'text']"
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
    components: {
      'vue-table': vtable
    },
    mixins: [mix],
    mounted () {
      this.fetchData('certificates')
    },
    methods: {
      createList (certificates) {
        let list = []
        if (certificates) {
          list = certificates.map((e) => {
            const str = [e.num, e.contact_name, e.company_name, e.cert_date, e.note]
            const ne = e
            ne.str = str.join(' ').toLowerCase()
            return ne
          })
        }
        return list
      }
    }
  }
</script>
