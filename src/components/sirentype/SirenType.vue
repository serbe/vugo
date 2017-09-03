<template>
  <div class="container mw768">
    <form :model="sirenType" id="sirenType">

      <vue-input v-model="sirenType.name" label placeholder="Тип сирены" iconLeft="tag"></vue-input>
      <vue-input v-model="sirenType.radius" label placeholder="Радиус действия сирены (метры)" iconLeft="circle-o" type="number"></vue-input>
      <vue-input v-model="sirenType.note" label placeholder="Заметка" iconLeft="comment"></vue-input>

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
  name: 'sirenType',
  components: {
    'vue-input': vinput,
    'vue-button': vbutton,
  },
  data() {
    return {
      title: '',
      sirenType: {
        id: 0,
        name: '',
        radius: 0,
        note: '',
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    submit() {
      let url = 'sirentypes';
      let method = 'POST';
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`;
        method = 'PUT';
      }
      const values = this.sirenType;
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values),
      });
      this.close();
    },
    close() {
      this.$router.push('/sirentypes');
    },
    delete() {
      // console.log('delete!');
    },
    fetchData() {
      request({
        url: `sirentypes/${this.$route.params.id}`,
        method: 'GET',
      })
        .then((r) => {
          this.sirenType = r.data.siren_type;
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
