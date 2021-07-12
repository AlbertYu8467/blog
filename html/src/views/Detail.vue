<template>
  <div class="p40">
    <h1>博客详情页</h1>
    <h3>{{ detail.title }}</h3>
    <div class="content">{{ detail.content }}</div>
    <b>{{ detail.author }}</b
    ><i>{{ detail.createtime }}</i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    let url = `/api/blog/detail?id=${this.$route.query.id}`;
    axios.get(url).then((res) => {
      if (res && res.data.errno === 0) {
        this.detail = res.data.data;
      }
    });
  },
};
</script>
<style scoped>
.content {
  margin: 10px 0;
}
</style>
