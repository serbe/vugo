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
        type="text"
        label
        placeholder="Тема тренировки"
        iconLeft="tag"
        v-model="practice.topic"
      ></bulma-input>

      <bulma-date v-model="practice.date_of_practice" label="Дата проведения тренировки"></bulma-date>

      <bulma-input
        type="text"
        label="Заметка"
        placeholder="Заметка"
        iconLeft="comment"
        v-model="practice.note"
      ></bulma-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <bulma-button text="Сохранить" color="primary" @click="submit"></bulma-button>
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
import BulmaDate from "@/components/BulmaDate";
import BulmaSelect from "@/components/BulmaSelect";
import Practice from "@/objects/Practice";
import SelectItem from "@/objects/SelectItem";
import mixItem from "@/mixins/mixItem";
import request from "@/request";

export default {
  name: "PracticeItem",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton,
    "bulma-date": BulmaDate,
    "bulma-select": BulmaSelect
  },
  mixins: [mixItem],
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
    close() {
      this.$router.push("/practices");
    },
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
