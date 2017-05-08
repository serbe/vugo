<template>
  <div>
    <vue-table
      name="post"
      :names="['Наименование должности', 'ГО', 'Заметка']"
      :columns="['name', 'go', 'note']"
      :tableData="postsList"
      tableClasses="is-narrow is-striped"
      :headClasses="['', '', 'is-hidden-mobile']"
      pagination
      hyper
      search
    />
  </div>
</template>

<script>
  import table from '@/elements/Table'

  export default {
    name: 'posts',
    components: {
      'vue-table': table
    },
    data: () => ({
      postsList: null,
      isLoaded: false
    }),
    mounted () {
      fetch('http://localhost:9090/posts').then(r => r.json()).then((data) => {
        this.postsList = this.createPostsList(data.posts)
        this.isLoaded = true
      })
    },
    methods: {
      createPostsList (posts) {
        let list = posts.map(e => {
          let str = [e.name, e.note]
          e.str = str.join(' ').toLowerCase()
          return e
        })
        return list
      }
    }
  }
</script>

<style scoped>

</style>
