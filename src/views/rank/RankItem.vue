<template>
  <div class="container mw768">
    <form :model="rank" id="rank">
      <bulma-input
        v-model="rank.name"
        label
        placeholder="Наименование чина"
        iconLeft="tag"
      ></bulma-input>

      <bulma-input
        v-model="rank.note"
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
import BulmaButton from "@/components/BulmaButton";
import BulmaInput from "@/components/BulmaInput";
import Rank from "@/objects/Rank";
import mixItem from "@/mixins/mixItem";
import mixin from "@/mixins/funcs";
import request from "@/request";

export default {
  name: "RankItem",
  components: {
    "bulma-button": BulmaButton,
    "bulma-input": BulmaInput
  },
  mixins: [mixin, mixItem],
  data() {
    return {
      title: "",
      rank: Rank
    };
  },
  mounted() {
    this.fetchItem("rank", "Rank", [], [], []);
  },
  methods: {
    submit() {
      let url = "ranks";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.rank;
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
