<template>
  <div class="container mw768">
    <form :model="department" id="department">

      <bulma-input v-model="department.name" label placeholder="Наименование отдела" icon="tag"></bulma-input>

      <bulma-input v-model="department.note" label placeholder="Заметка" icon="comment"></bulma-input>

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
import BulmaInput from '@/elements/BulmaInput'
import BulmaButton from '@/elements/BulmaButton'
import Department from '@/objects/Department'
import request from '@/request'

export default {
  name: 'DepartmentItem',
  components: {
    'bulma-input': BulmaInput,
    'bulma-button': BulmaButton
  },
  data () {
    return {
      title: '',
      department: Department
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    submit () {
      let url = 'departments'
      let method = 'POST'
      if (this.$route.params.id !== '0') {
        url = `${url}/${this.$route.params.id}`
        method = 'PUT'
      }
      const values = this.department
      request({
        url,
        method,
        mode: 'cors',
        data: JSON.stringify(values)
      })
        .then(() => {
          this.close()
        })
    },
    close () {
      this.$router.push('/departments')
    },
    delete () {
      // console.log('delete!')
    },
    fetchData () {
      request({
        url: `departments/${this.$route.params.id}`,
        method: 'GET'
      })
        .then((r) => {
          this.department = r.data.department
          this.isLoaded = true
        })
    }
  }
}
</script>

<style scoped>
.columns {
  margin-bottom: -0.25rem !important;
}

.field .is-grouped {
  margin-bottom: 0 !important;
}
</style>
