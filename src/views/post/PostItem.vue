<template>
  <div class="container mw768">
    <form :model="post" id="post">
      <bulma-input
        v-model="post.name"
        label
        placeholder="Наименование должности"
        iconLeft="tag"
      ></bulma-input>

      <bulma-switch
        :checked="post.go"
        v-model="post.go"
        label="Должность по гражданской обороне"
      ></bulma-switch>

      <bulma-input
        v-model="post.note"
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
import BulmaSwitch from "@/components/BulmaSwitch";
import Kind from "@/objects/Kind";
import mixItem from "@/mixins/mixItem";
import request from "@/request";

export default {
  name: "PostItem",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton,
    "bulma-switch": BulmaSwitch
  },
  mixins: [mixItem],
  data() {
    return {
      title: "",
      post: Kind
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = "posts";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.post;
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
      // console.log('delete!');
    },
    fetchData() {
      this.fetchItem("posts", ["post"]);
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
