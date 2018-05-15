<template>
  <div class="container mw768">
    <form :model="education" id="education">

      <bulma-select :list="contacts" :selected-item="education.contact" label="Полное имя обучаемого" item-name="contact" @select="onSelect" iconLeft="user"></bulma-select>

      <bulma-select :list="posts" :selected-item="education.post" label="Должность ГО ЧС" item-name="post" @select="onSelect" iconLeft="tag"></bulma-select>

      <div class="columns">
        <div class="column">
          <bulma-date v-model="education.start_date" label="Дата начала обучения"></bulma-date>
        </div>

        <div class="column">
          <bulma-date v-model="education.end_date" label="Дата конца обучения"></bulma-date>
        </div>
      </div>

      <bulma-input type="text" label="Заметка" placeholder="Заметка" iconLeft="comment" v-model="education.note"></bulma-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <bulma-button text="Сохранить" color="primary" @click="submit"></bulma-button>
        </div>
        <div class="control">
          <bulma-button text="Закрыть" @click="close"></bulma-button>
        </div>
        <div class="control">
          <bulma-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');"></bulma-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BulmaInput from "@/components/BulmaInput";
import BulmaButton from "@/components/BulmaButton";
import BulmaSelect from "@/components/BulmaSelect";
import BulmaDate from "@/components/BulmaDate";
import Education from "@/objects/Education";
import SelectItem from "@/objects/SelectItem";
import mixItem from "@/mixins/mixItem";
import request from "@/request";

export default {
  name: "EducationItem",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton,
    "bulma-select": BulmaSelect,
    "bulma-date": BulmaDate
  },
  mixins: [mixItem],
  data() {
    return {
      title: "",
      education: Education,
      contacts: [SelectItem],
      posts: [SelectItem]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = "educations";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.education;
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
      this.$router.push("/educations");
    },
    delete() {
      // console.log('delete!')
    },
    fetchData() {
      this.fetchItem("educations", ["education", "contacts", "posts"], true);
    },
    onSelect(item, itemName) {
      this.education[itemName] = item;
      this.education[`${itemName}_id`] = item.id;
    },
    afterFetch() {
      this.setSelect("education", "contacts", "contact", "contact_id");
      this.setSelect("education", "posts", "post", "post_id");
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
