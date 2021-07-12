<template>
  <div class="home">
    <h1>博客首页</h1>
    <ul v-for="item in blogList" :key="item.title">
      <li @click="goToDetail(item)">
        <h3>{{ item.title }}</h3>
        <b @click.stop="getBlogList(item.author)">{{ item.author }}</b
        ><i>{{ item.createtime }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    getBlogList(author) {
      axios
        .get(`/api/blog/list?a=1${author ? "&author=" + author : ""}`)
        .then((res) => {
          if (res && res.data.errno === 0) {
            this.blogList = res.data.data;
          }
        });
    },
    goToDetail(item) {
      this.$router.push({
        path: "/detail",
        query: { id: item.id },
      });
    },
  },
};
</script>
<style scoped>
</style>
