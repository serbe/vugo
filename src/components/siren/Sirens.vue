<template>
  <div class="container">
    <vue-table
      name="siren"
      :names="['Тип сирены', 'Адрес', 'Заметка']"
      :columns="['siren_type_name', 'address', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', '', 'is-hidden-mobile']"
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
    name: 'sirens',
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
            url: 'sirens',
            method: 'GET',
          })
            .then((r) => {
              this.list = this.createList(r.data.sirens);
              this.fetched = true;
            });
        }
      },
      createList(sirens) {
        let list = [];
        if (sirens) {
          list = sirens.map((e) => {
            const str = [e.name, e.note];
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
