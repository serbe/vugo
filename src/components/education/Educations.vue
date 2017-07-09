<template>
  <div class="container">
    <vue-table
      name="education"
      :names="['Обучаемый', 'Начало обучения', 'Конец обучения']"
      :columns="['contact_name', 'start_str', 'end_str']"
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
    name: 'educations',
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
            url: 'educations',
            method: 'GET',
          })
            .then((r) => {
              this.list = this.createList(r.data.educations);
              this.fetched = true;
            });
        }
      },
      createList(educations) {
        let list = [];
        if (educations) {
          list = educations.map((e) => {
            const str = [e.contact_name, e.start_str, e.end_str];
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
