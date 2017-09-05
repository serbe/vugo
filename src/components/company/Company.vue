<template>
  <div class="container mw768">
    <form :model="company" id="company">

      <vue-input v-model="company.name" label placeholder="Наименование организации" iconLeft="building"></vue-input>

      <vue-select :list="scopes" :selected-item="company.scope" label="Сфера деятельности" @select="onSelect" icon="tag"></vue-select>

      <vue-input v-model="company.address" label placeholder="Адрес" iconLeft="address-card"></vue-input>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Электронный адрес</label>
            <vue-input
              v-for="(email, index) in company.emails"
              v-bind:key="index"
              v-model="company.emails[index].email"
              type="email"
              placeholder="Электронный адрес"
              iconLeft="envelope"
              autocomplete="email"
              @blur="onBlur('emails', 'email')"
              pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              error="Неправильный email"
            ></vue-input>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Телефон</label>
            <vue-input
              v-for="(phone, index) in company.phones"
              v-bind:key="index"
              v-model="company.phones[index].phone"
              type="tel"
              placeholder="Телефон"
              iconLeft="phone"
              autocomplete="tel"
              @blur="onBlur('phones', 'phone')"
            ></vue-input>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Факс</label>
            <vue-input
              v-for="(fax, index) in company.faxes"
              v-bind:key="index"
              v-model="company.faxes[index].phone"
              type="tel"
              placeholder="Факс"
              iconLeft="phone"
              autocomplete="tel"
              @blur="onBlur('faxes', 'phone')"
            ></vue-input>
          </div>
        </div>
      </div>

      <div class="field" v-if="company.practices">
        <label class="label">Тренировки</label>
        <vue-input
          v-for="practice in company.practices"
          v-bind:key="practice.id"
          :value="practice.date_str + ' - ' + practice.kind_name + ' - ' + practice.topic"
          :hyper="'/practice/' + practice.id"
          iconLeft="history"
          disabled
        ></vue-input>
      </div>

      <div class="field" v-if="company.contacts">
        <label class="label">Сотрудники</label>
        <vue-input
          v-for="contact in company.contacts"
          v-bind:key="contact.id"
          :value="contact.name + ' - ' + contact.post_name"
          :hyper="'/contact/' + contact.id"
          iconLeft="user"
          disabled
        ></vue-input>
      </div>

      <vue-input v-model="company.note" label placeholder="Заметка" iconLeft="sticky-note"></vue-input>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <vue-button text="Сохранить" color="primary" @click="submit" ></vue-button>
        </div>
        <div class="control">
          <vue-button text="Закрыть" @click="close" ></vue-button>
        </div>
        <div class="control">
          <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');" ></vue-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import vinput from '@/elements/Input';
import vbutton from '@/elements/Button';
import vselect from '@/elements/Select';
import mixin from '@/mixins/funcs';
import request from '@/request';

export default {
  name: 'company',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect,
  },
  mixins: [mixin],
  data() {
    return {
      title: '',
      company: {
        id: 0,
        name: '',
        address: '',
        scope: {
          id: 0,
          name: '',
        },
        scope_id: 0,
        note: '',
        emails: [{
          id: 0,
          email: '',
        }],
        phones: [{
          id: 0,
          phone: '',
          fax: false,
        }],
        faxes: [{
          id: 0,
          phone: '',
          fax: true,
        }],
        practices: [{
          id: 0,
          date_str: '',
          kind_name: '',
          topic: '',
        }],
        contacts: [{
          id: 0,
          name: '',
          department_name: '',
          post_name: '',
          post_go_name: '',
        }],
      },
      scopes: [{
        id: 0,
        name: '',
      }],
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
        obj[key] = '';
        this.company[arr].push(obj);
      }
    },
    onSelect(item) {
      this.scope = item;
      this.company.scope_id = item.id;
    },
    submit() {
      let url = 'companies';
      let method = 'POST';
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`;
        method = 'PUT';
      }
      const values = this.company;
      values.emails = this.filterArray(values.emails, 'email');
      values.phones = this.filterArray(values.phones, 'phone');
      values.faxes = this.filterArray(values.faxes, 'phone');
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values),
      })
        .then(() => {
          this.close();
        });
    },
    close() {
      this.$router.push('/companies');
    },
    delete() {
    //  console.log('delete!');
    },
    fetchData() {
      request({
        url: `companies/${this.$route.params.id}`,
        method: 'GET',
      })
        .then((r) => {
          this.company = r.data.company;
          this.scopes = r.data.scopes;
          if (this.company.emails) {
            this.company.emails.push({ id: this.company.emails.length + 1, email: '' });
          } else {
            this.company.emails = [{ id: 1, email: '' }];
          }
          if (this.company.phones) {
            this.company.phones.push({ id: this.company.phones.length + 1, phone: '' });
          } else {
            this.company.phones = [{ id: 1, phone: '' }];
          }
          if (this.company.faxes) {
            this.company.faxes.push({ id: this.company.faxes.length + 1, phone: '' });
          } else {
            this.company.faxes = [{ id: 1, phone: '' }];
          }
          this.isLoaded = true;
        });
    },
    customLabel(val) {
      return val.name;
    },
  },
};
</script>

<style scoped>

</style>
