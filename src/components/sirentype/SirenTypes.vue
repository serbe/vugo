<template>
  <div class="container">
    <vue-table
      name="sirenType"
      :names="['Тип сирены', 'Радиус', 'Заметка']"
      :columns="['name', 'radius', 'note']"
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
    name: 'sirenTypes',
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
            url: 'sirentypes',
            method: 'GET',
          })
            .then((r) => {
              this.list = this.createList(r.data.siren_types);
              this.fetched = true;
            });
        }
      },
      createList(sirenTypes) {
        let list = [];
        if (sirenTypes) {
          list = sirenTypes.map((e) => {
            const str = [e.name, e.radius, e.note];
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
