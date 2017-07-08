<template>
  <div class="container mw768">
    <form :model="education" id="education">

      <vue-select :list="contacts" :selected-item="education.contact" label="Полное имя обучаемого" item-name="contact" @select="onSelect" iconLeft="user"></vue-select>

      <div class="columns">
        <div class="column">
          <vue-date v-model="education.start_date" label="Дата начала обучения"></vue-date>
        </div>

        <div class="column">
          <vue-date v-model="education.end_date" label="Дата конца обучения"></vue-date>
        </div>
      </div>

      <vue-input type="text" label="Заметка" placeholder="Заметка" iconLeft="comment" v-model="education.note" ></vue-input>

      <div class="field">
        <div class="columns mt3">
          <div class="column is-2 is-offset-2">
            <vue-button text="Сохранить" color="primary" @click="submit" ></vue-button>
          </div>
          <div class="column is-2">
            <vue-button text="Закрыть" @click="close" ></vue-button>
          </div>
          <div class="column is-2 is-offset-2">
            <vue-button text="Удалить" color="danger" onclick="return confirm('Вы действительно хотите удалить эту запись?');" ></vue-button>
          </div>
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
  name: 'education',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
    'vue-select': vselect,
    'vue-date': vdate,
  },
  data() {
    return {
      title: '',
      education: {
        id: 0,
        contact_id: 0,
        contact: {
          id: 0,
          name: '',
        },
        start_date: '',
        end_date: '',
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
    submit() {
      let url = 'educations';
      let method = 'POST';
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`;
        method = 'PUT';
      }
      const values = this.education;
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values),
      });
      this.close();
    },
    close() {
      this.$router.push('/educations');
    },
    delete() {
      // console.log('delete!')
    },
    fetchData() {
      request({
        url: `educations/${this.$route.params.id}`,
        method: 'GET',
      })
      .then((r) => {
        const data = r.data;
        this.education = data.education;
        this.contacts = data.contacts;
        this.setSelect('education', 'contacts', 'contact', 'contact_id');
        this.isLoaded = true;
      });
    },
    onSelect(item, itemName) {
      this.siren[itemName] = item;
      this.siren[`${itemName}_id`] = item.id;
    },
    setSelect(root, list, item, value) {
      this[root][item] = this[list].find(v => v.id === this[root][value]);
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
