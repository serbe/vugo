<template>
  <div class="container mw768">
    <form :model="department" id="department">
      <bulma-input
        v-model="department.name"
        label
        placeholder="Наименование отдела"
        iconLeft="tag"
      ></bulma-input>

      <bulma-input
        v-model="department.note"
        label
        placeholder="Заметка"
        iconLeft="comment"
      ></bulma-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <bulma-button
            text="Сохранить"
            color="primary"
            @click="submit"
          ></bulma-button>
        </div>
        <div class="control">
          <bulma-button text="Закрыть" @click="close"></bulma-button>
        </div>
        <div class="control">
          <bulma-button
            text="Удалить"
            color="danger"
            onclick="return confirm('Вы действительно хотите удалить эту запись?');"
          ></bulma-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BulmaInput from "@/components/BulmaInput";
import BulmaButton from "@/components/BulmaButton";
import Department from "@/objects/Department";
import mixItem from "@/mixins/mixItem";
import request from "@/request";

export default {
  name: "DepartmentItem",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton
  },
  mixins: [mixItem],
  data() {
    return {
      title: "",
      department: Department
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = "departments";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.department;
      request({
        url,
        method,
        mode: "cors",
        data: JSON.stringify(values)
      }).then(() => {
        this.close();
      });
    },
    // close() {
    //   this.$router.back();
    // },
    delete() {
      // console.log('delete!')
    },
    fetchData() {
      this.fetchItem("departments", ["department"]);
    }
  }
};
</script>

<style scoped>
.columns {
  margin-bottom: -0.25rem !important;
}

.field .is-grouped {
  margin-bottom: 0 !important;
}
</style>
