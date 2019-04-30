<template>
  <div class="container mw768">
    <form :model="company" id="company">
      <bulma-input
        v-model="company.name"
        label
        placeholder="Наименование организации"
        iconLeft="building"
      ></bulma-input>

      <bulma-select
        :list="scopes"
        :selected-item="company.scope"
        item-name="scope"
        label="Сфера деятельности"
        @select="onSelect"
        iconLeft="tag"
      ></bulma-select>

      <bulma-input
        v-model="company.address"
        label
        placeholder="Адрес"
        iconLeft="address-card"
      ></bulma-input>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Электронный адрес</label>
            <bulma-input
              v-for="(email, index) in company.emails"
              :key="index"
              v-model="company.emails[index].email"
              type="email"
              placeholder="Электронный адрес"
              iconLeft="envelope"
              autocomplete="email"
              @blur="onBlur('emails', 'email')"
              pattern="pattern"
              error="Неправильный email"
            ></bulma-input>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <bulma-input
              v-for="(phone, index) in company.phones"
              :key="index"
              v-model="company.phones[index].phone"
              type="tel"
              placeholder="Телефон"
              iconLeft="phone"
              autocomplete="tel"
              @blur="onBlur('phones', 'phone')"
            ></bulma-input>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <bulma-input
              v-for="(fax, index) in company.faxes"
              :key="index"
              v-model="company.faxes[index].phone"
              type="tel"
              placeholder="Факс"
              iconLeft="phone"
              autocomplete="tel"
              @blur="onBlur('faxes', 'phone')"
            ></bulma-input>
          </div>
        </div>
      </div>

      <div class="field" v-if="company.practices" key="practices">
        <label class="label">Тренировки</label>
        <bulma-input
          v-for="practice in company.practices"
          :key="practice.id"
          :value="
            practice.date_str +
              ' - ' +
              practice.kind_name +
              ' - ' +
              practice.topic
          "
          :hyper="'/practice/' + practice.id"
          iconLeft="history"
          readonly
        ></bulma-input>
      </div>

      <div class="field" v-if="company.contacts" key="contacts">
        <label class="label">Сотрудники</label>
        <bulma-input
          v-for="contact in company.contacts"
          :key="contact.id"
          :value="contact.name + ' - ' + contact.post_name"
          :hyper="'/contact/' + contact.id"
          iconLeft="user"
          readonly
        ></bulma-input>
      </div>

      <bulma-input
        v-model="company.note"
        label
        placeholder="Заметка"
        iconLeft="sticky-note"
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
import BulmaSelect from "@/components/BulmaSelect";
import Company from "@/objects/Company";
import SelectItem from "@/objects/SelectItem";
import mixin from "@/mixins/funcs";
import mixItem from "@/mixins/mixItem";
import request from "@/request";

export default {
  name: "CompanyItem",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton,
    "bulma-select": BulmaSelect
  },
  mixins: [mixin, mixItem],
  data() {
    return {
      title: "",
      company: Company,
      scopes: [SelectItem],
      pattern:
        '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onBlur(arr, key) {
      if (this.checkArray(this.company[arr], key)) {
        const obj = {};
        obj.id = this.company[arr].length + 1;
        obj[key] = "";
        this.company[arr].push(obj);
      }
    },
    onSelect(item) {
      this.scope = item;
      this.company.scope_id = item.id;
    },
    submit() {
      let url = "companies";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.company;
      values.emails = this.filterArray(values.emails, "email");
      values.phones = this.filterArray(values.phones, "phone");
      values.faxes = this.filterArray(values.faxes, "phone");
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
      this.$router.go(-2)
    },
    delete() {
      //  console.log('delete!');
    },
    fetchData() {
      this.fetchItem("companies", ["company", "scopes"], true);
    },
    afterFetch() {
      if (this.company.emails) {
        this.company.emails.push({
          id: this.company.emails.length + 1,
          email: ""
        });
      } else {
        this.company.emails = [{ id: 1, email: "" }];
      }
      if (this.company.phones) {
        this.company.phones.push({
          id: this.company.phones.length + 1,
          phone: ""
        });
      } else {
        this.company.phones = [{ id: 1, phone: "" }];
      }
      if (this.company.faxes) {
        this.company.faxes.push({
          id: this.company.faxes.length + 1,
          phone: ""
        });
      } else {
        this.company.faxes = [{ id: 1, phone: "" }];
      }
    },
    customLabel(val) {
      return val.name;
    }
  }
};
</script>
