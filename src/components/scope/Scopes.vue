<template>
  <div class="container">
    <vue-table
      name="scope"
      :names="['Сфера деятельности', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped"
      :headClasses="['', 'is-hidden-mobile']"
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
    name: 'scopes',
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
            url: 'scopes',
            method: 'GET',
          })
          .then((r) => {
            this.list = this.createList(r.data.scopes);
            this.fetched = true;
          });
        }
      },
      createList(scopes) {
        let list = [];
        if (scopes) {
          list = scopes.map((e) => {
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
