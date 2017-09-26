<template>
  <div class="container">
    <vue-table
      name="department"
      :names="['Наименование отдела', 'Заметка']"
      :columns="['name', 'note']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
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
  name: 'departments',
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
  methods: {
    fetchData() {
      if (!this.fetched) {
        request({
          url: 'departments',
          method: 'GET',
        })
          .then((r) => {
            this.list = this.createList(r.data.departments);
            this.fetched = true;
          });
      }
    },
    createList(departments) {
      let list = [];
      if (departments) {
        list = departments.map((e) => {
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
