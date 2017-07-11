<template>
  <div class="container mw768">
    <form :model="kind" id="kind">

      <vue-input v-model="kind.name" label placeholder="Наименование типа тренировки" iconLeft="tag"></vue-input>

      <vue-input v-model="kind.short_name" label placeholder="Сокращенное наименование" iconLeft="tag"></vue-input>

      <vue-input v-model="kind.note" label placeholder="Заметка" iconLeft="comment"></vue-input>

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
import request from '@/request';

export default {
  name: 'kind',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
  },
  data() {
    return {
      title: '',
      kind: {
        id: 0,
        name: '',
        short_name: '',
        note: '',
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = 'kinds';
      let method = 'POST';
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`;
        method = 'PUT';
      }
      const values = this.kind;
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values),
      });
      this.close();
    },
    close() {
      this.$router.push('/kinds');
    },
    delete() {
      // console.log('delete!');
    },
    fetchData() {
      request({
        url: `kinds/${this.$route.params.id}`,
        method: 'GET',
      })
        .then((r) => {
          const data = r.data;
          this.kind = data.kind;
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
