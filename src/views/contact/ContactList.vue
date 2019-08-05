<template>
  <div class="container">
    <bulma-table
      name="contact"
      :names="[
        'Фамилия Имя Отчество',
        'Организация',
        'Должность',
        'Телефон',
        'Факс'
      ]"
      :columns="['name', 'company_name', 'post_name', 'phones', 'faxes']"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="[
        '',
        'is-hidden-mobile',
        'is-hidden-touch',
        'w9 nowrap',
        'is-hidden-mobile w9 nowrap'
      ]"
      :cellTypes="['text', 'text', 'text', 'array', 'array']"
      pagination
      hyper
      search
      adding
    ></bulma-table>
  </div>
</template>

<script>
import BulmaTable from "@/components/BulmaTable";
import mixList from "@/mixins/mixList";
import mixin from "@/mixins/funcs";

export default {
  name: "ContactList",
  components: {
    "bulma-table": BulmaTable
  },
  mixins: [mixin, mixList],
  mounted() {
    this.fetchData("contact/list", "ContactList");
  },
  methods: {
    createList(contacts) {
      let list = [];
      if (contacts) {
        list = contacts.map(c => {
          const str = [c.name, c.company_name, c.post_name];
          if (c.phones.length > 0 && c.phones[0] !== "") {
            str.push(c.phones.join(" "));
          }
          if (c.faxes.length > 0 && c.faxes[0] !== "") {
            str.push(c.faxes.join(" "));
          }
          const nc = c;
          nc.str = str.join(" ").toLowerCase();
          return nc;
        });
      }
      return list;
    }
  }
};
</script>
