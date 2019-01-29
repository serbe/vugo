<template>
  <div class="container mw768">
    <form :model="scope" id="scope">
      <bulma-input
        v-model="scope.name"
        label
        placeholder="Наименование сферы дефтельности"
        iconLeft="tag"
      ></bulma-input>

      <bulma-input
        v-model="scope.note"
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
import Scope from "@/objects/Scope";
import mixItem from "@/mixins/mixItem";
import request from "@/request";

export default {
  name: "ScopeItem",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton
  },
  mixins: [mixItem],
  data() {
    return {
      title: "",
      scope: Scope
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = "scopes";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.scope;
      request({
        url,
        method,
        mode: "cors",
        data: JSON.stringify(values)
      }).then(() => {
        this.close();
      });
    },
    close() {
      this.$router.push("/scopes");
    },
    delete() {
      // console.log('delete!');
    },
    fetchData() {
      this.fetchItem("scopes", ["scope"]);
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

.w300 {
  width: 300px !important;
}
</style>
