<template>
  <div class="container mw768">
    <form :model="department" id="department">

      <vue-input v-model="department.name" label placeholder="Наименование отдела" iconLeft="tag"></vue-input>

      <vue-input v-model="department.note" label placeholder="Заметка" iconLeft="comment"></vue-input>

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
import request from '@/request';

export default {
  name: 'department',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
  },
  data() {
    return {
      title: '',
      department: {
        id: 0,
        name: '',
        note: '',
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = 'departments';
      let method = 'POST';
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`;
        method = 'PUT';
      }
      const values = this.department;
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values),
      });
      this.$router.push('/departments');
    },
    close() {
      this.$router.push('/departments');
    },
    delete() {
      // console.log('delete!')
    },
    fetchData() {
      request({
        url: `departments/${this.$route.params.id}`,
        method: 'GET',
      })
        .then((r) => {
          const data = r.data;
          this.department = data.department;
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
</style>
