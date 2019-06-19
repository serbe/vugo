<template>
  <div class="container mw768">
    <form :model="certificate" id="certificate">
      <bulma-input
        v-model="certificate.num"
        label
        placeholder="Серийный номер удостоверения"
        iconLeft="tag"
      ></bulma-input>

      <bulma-select
        :list="contacts"
        :selected-item="certificate.contact"
        item-name="contact"
        label="Полное имя"
        @select="onSelect"
        iconLeft="user"
      ></bulma-select>

      <bulma-select
        :list="companies"
        :selected-item="certificate.company"
        item-name="company"
        label="Учебно методический центр"
        @select="onSelect"
        iconLeft="building"
      ></bulma-select>

      <bulma-date
        v-model="certificate.cert_date"
        label="Дата выдачи"
      ></bulma-date>

      <bulma-input
        v-model="certificate.note"
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
import BulmaDate from "@/components/BulmaDate";
import BulmaInput from "@/components/BulmaInput";
import BulmaSelect from "@/components/BulmaSelect";
import Certificate from "@/objects/Certificate";
import SelectItem from "@/objects/SelectItem";
import mixItem from "@/mixins/mixItem";
import mixin from "@/mixins/funcs";
import request from "@/request";

export default {
  name: "CertificateItem",
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
      certificate: Certificate,
      contacts: [SelectItem],
      companies: [SelectItem]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onSelect(item, itemName) {
      this.certificate[itemName] = item;
      this.certificate[`${itemName}_id`] = item.id;
    },
    submit() {
      let url = "certificates";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.certificate;
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
    //   // store.commit('increment', this.$router.);
    //   this.$router.back();
    // },
    delete() {
      // console.log('delete!');
    },
    fetchData() {
      this.fetchItem("certificates", ["certificate", "contacts", "companies"]);
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
