<template>
  <div class="container mw768">
    <form :model="contact" id="contact">
      <bulma-input
        v-model="contact.name"
        label
        placeholder="Полное имя"
        iconLeft="user"
      ></bulma-input>

      <bulma-select
        :list="companies"
        :selected-item="contact.company"
        label="Организация"
        item-name="company"
        @select="onSelect"
        iconLeft="building"
      ></bulma-select>

      <div class="columns">
        <div class="column is-half">
          <bulma-select
            :list="posts"
            :selected-item="contact.post"
            label="Должность"
            item-name="post"
            @select="onSelect"
            iconLeft="tag"
          ></bulma-select>
        </div>

        <div class="column is-half">
          <bulma-select
            :list="departments"
            :selected-item="contact.department"
            label="Отдел"
            item-name="department"
            @select="onSelect"
            iconLeft="tag"
          ></bulma-select>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half">
          <bulma-select
            :list="posts_go"
            :selected-item="contact.post_go"
            label="Должность ГО"
            item-name="post_go"
            @select="onSelect"
            iconLeft="tag"
          ></bulma-select>
        </div>

        <div class="column is-half">
          <bulma-select
            :list="ranks"
            :selected-item="contact.rank"
            label="Звание"
            item-name="rank"
            @select="onSelect"
            iconLeft="tag"
          ></bulma-select>
        </div>
      </div>

      <div class="columns">
        <div class="column is-one-third">
          <bulma-date
            v-model="contact.birthday"
            label="Дата рождения"
          ></bulma-date>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Электронный адрес</label>
            <bulma-input
              v-for="(email, index) in contact.emails"
              :key="index"
              v-model="contact.emails[index].email"
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
              v-for="(phone, index) in contact.phones"
              :key="index"
              v-model="contact.phones[index].phone"
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
              v-for="(fax, index) in contact.faxes"
              :key="index"
              v-model="contact.faxes[index].phone"
              type="tel"
              placeholder="Факс"
              iconLeft="fax"
              autocomplete="tel"
              @blur="onBlur('faxes', 'phone')"
            ></bulma-input>
          </div>
        </div>
      </div>

      <div class="field" v-if="contact.practices" key="practices">
        <label class="label">Тренировки</label>
        <bulma-input
          v-for="practice in contact.practices"
          :key="practice.id"
          :hyper="'/practice/' + practice.id"
          readonly
          :value="
            practice.date_str +
              ' - ' +
              practice.kind.name +
              ' - ' +
              practice.topic
          "
          iconLeft="graduation-cap"
        ></bulma-input>
      </div>

      <bulma-input
        label="Заметка"
        placeholder="Заметка"
        iconLeft="comment"
        v-model="contact.note"
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
// import BulmaCalendar from '@/components/BulmaCalendar'
import BulmaInput from "@/components/BulmaInput";
import BulmaButton from "@/components/BulmaButton";
import BulmaSelect from "@/components/BulmaSelect";
import BulmaDate from "@/components/BulmaDate";
import Contact from "@/objects/Contact";
import SelectItem from "@/objects/SelectItem";
import mixin from "@/mixins/funcs";
import request from "@/request";

export default {
  name: "ContactItem",
  components: {
    // 'bulma-calendar': BulmaCalendar,
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton,
    "bulma-select": BulmaSelect,
    "bulma-date": BulmaDate
  },
  mixins: [mixin],
  data() {
    return {
      title: "",
      contact: Contact,
      companies: [SelectItem],
      posts: [SelectItem],
      posts_go: [SelectItem],
      departments: [SelectItem],
      ranks: [SelectItem],
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onBlur(arr, key) {
      if (this.checkArray(this.contact[arr], key)) {
        const obj = {};
        obj.id = this.contact[arr].length + 1;
        obj[key] = "";
        this.contact[arr].push(obj);
      }
    },
    onSelect(item, itemName) {
      this.contact[itemName] = item;
      this.contact[`${itemName}_id`] = item.id;
    },
    submit() {
      let url = "/contacts";
      let method = "POST";
      if (this.$route.params.id !== "0") {
        url = `${url}/${this.$route.params.id}`;
        method = "PUT";
      }
      const values = this.contact;
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
    // close() {
    //   window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    // },
    delete() {
      // console.log('delete!');
    },
    fetchData() {
      request({
        url: `contacts/${this.$route.params.id}`,
        method: "GET"
      }).then(r => {
        this.contact = r.data.contact;
        this.companies = r.data.companies;
        this.posts = r.data.posts;
        this.departments = r.data.departments;
        this.posts_go = r.data.posts_go;
        this.ranks = r.data.ranks;
        if (this.contact.emails) {
          this.contact.emails.push({
            id: this.contact.emails.length + 1,
            email: ""
          });
        } else {
          this.contact.emails = [{ id: 1, email: "" }];
        }
        if (this.contact.phones) {
          this.contact.phones.push({
            id: this.contact.phones.length + 1,
            phone: ""
          });
        } else {
          this.contact.phones = [{ id: 1, phone: "" }];
        }
        if (this.contact.faxes) {
          this.contact.faxes.push({
            id: this.contact.faxes.length + 1,
            phone: ""
          });
        } else {
          this.contact.faxes = [{ id: 1, phone: "" }];
        }
        this.isLoaded = true;
      });
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
