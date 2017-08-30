<template>
  <div class="container">
    <vue-table
      name="practice"
      :names="['Дата тренировки', 'Тип тренировки', 'Организация']"
      :columns="['date_str', 'kind_name', 'company_name']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['w16', '', 'is-hidden-mobile']"
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
    name: 'practices',
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
            url: 'practices',
            method: 'GET',
          })
            .then((r) => {
              this.list = this.createList(r.data.practices);
              this.fetched = true;
            });
        }
      },
      createList(practices) {
        let list = [];
        if (practices) {
          list = practices.map((e) => {
            const str = [e.date_str, e.kind_name, e.note];
            e.str = str.join(' ').toLowerCase();
            return e;
          });
        }
        return list;
      },
    },
  };
</script>

<style scoped>

</style>
