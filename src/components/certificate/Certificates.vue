<template>
  <div class="container">
    <vue-table
      name="certificate"
      :names="['Номер', 'ФИО', 'УМЦ', 'Дата', 'Заметка']"
      :columns="['num', 'contact_name', 'company_name', 'cert_date', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', '', 'is-hidden-mobile', '', 'is-hidden-mobile']"
      pagination
      hyper
      search
      adding
    ></vue-table>
  </div>
</template>

<script>
  import vtable from '@/elements/Table';
  import request from '@/request';

  export default {
    components: {
      'vue-table': vtable,
    },
    data() {
      return {
        fetched: false,
        list: [],
      };
    },
    created() {
      this.fetchData();
    },
    // watch: {
    //   '$route' (to, from) {
    //     this.fetchData()
    //   }
    // },
    methods: {
      fetchData() {
        if (!this.fetched) {
          request({
            url: 'certificates',
            method: 'GET',
          })
            .then((r) => {
              this.list = this.createList(r.data.certificates);
              this.fetched = true;
            });
        }
      },
      createList(certificates) {
        let list = [];
        if (certificates) {
          list = certificates.map((e) => {
            const str = [e.num, e.contact_name, e.company_name, e.cert_date, e.note];
            const ne = e;
            ne.str = str.join(' ').toLowerCase();
            return ne;
          });
        }
        return list;
      },
    },
  };
</script>

<style scoped>

</style>
