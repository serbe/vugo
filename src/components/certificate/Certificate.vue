<template>
  <div class="container mw768">
    <form :model="certificate" id="certificate">

      <vue-input v-model="certificate.num" label placeholder="Серийный номер удостоверения" iconLeft="tag"></vue-input>

      <vue-select :list="contacts" :selected-item="certificate.contact" label="Полное имя" @select="onSelect" icon="user"></vue-select>

      <vue-date v-model="certificate.cert_date" label="Дата выдачи"></vue-date>

      <vue-input v-model="certificate.note" label placeholder="Заметка" iconLeft="comment"></vue-input>

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
import vdate from '@/elements/Date';
import request from '@/request';

export default {
  name: 'certificate',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect,
    'vue-date': vdate,
  },
  data() {
    return {
      title: '',
      certificate: {
        id: 0,
        num: '',
        contact_id: 0,
        contact: {
          id: 0,
          name: '',
        },
        cert_date: '',
        note: '',
      },
      contacts: [{
        id: 0,
        name: '',
      }],
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
      let url = 'certificates';
      let method = 'POST';
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`;
        method = 'PUT';
      }
      const values = this.certificate;
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
      this.$router.push('/certificates');
    },
    delete() {
      // console.log('delete!');
    },
    fetchData() {
      request({
        url: `certificates/${this.$route.params.id}`,
        method: 'GET',
      })
        .then((r) => {
          this.certificate = r.data.certificate;
          this.contacts = r.data.contacts;
          this.isLoaded = true;
        });
    },
  },
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
