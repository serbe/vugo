<template>
  <div class="container mw768">
    <form :model="practice" id="practice">
      <bulma-select
        :list="companies"
        :selected-item="practice.company"
        label="Организация"
        item-name="company"
        @select="onSelect"
        iconLeft="building"
      ></bulma-select>

      <bulma-select
        :list="kinds"
        :selected-item="practice.kind"
        label="Тип тренировки"
        item-name="kind"
        @select="onSelect"
        iconLeft="tag"
      ></bulma-select>

      <bulma-input
        label
        placeholder="Тема тренировки"
        iconLeft="tag"
        v-model="practice.topic"
      ></bulma-input>

      <bulma-date
        v-model="practice.date_of_practice"
        label="Дата проведения тренировки"
      ></bulma-date>

      <bulma-input
        label="Заметка"
        placeholder="Заметка"
        iconLeft="comment"
        v-model="practice.note"
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
import BulmaDate from "@/components/BulmaDate";
import BulmaInput from "@/components/BulmaInput";
import BulmaSelect from "@/components/BulmaSelect";
import Practice from "@/objects/Practice";
import SelectItem from "@/objects/SelectItem";
import mixItem from "@/mixins/mixItem";
import mixin from "@/mixins/funcs";
import request from "@/request";

export default {
  name: "PracticeItem",
  components: {
    "bulma-button": BulmaButton,
    "bulma-date": BulmaDate,
    "bulma-input": BulmaInput,
    "bulma-select": BulmaSelect
  },
  mixins: [mixin, mixItem],
  data() {
    return {
      title: "",
      practice: Practice,
      companies: [SelectItem],
      kinds: [SelectItem]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onSelect(item, itemName) {
      this.practice[itemName] = item;
      this.practice[`${itemName}_id`] = item.id;
    },
    submit() {
      let url = "practices";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.practice;
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
      this.fetchItem("practices", ["practice", "companies", "kinds"]);
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
