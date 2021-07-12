<template>
  <div class="p40">
    <h1>管理中心</h1>
    <h3 @click="operateBlog()">新建博客</h3>
    <input type="text" v-model="txt" @change="getBlogList" />
    <div class="item" v-for="v in blogList" :key="v.title">
      {{ v.title }}
      <span @click="delBlog(v)">删除</span>
      <span @click="operateBlog(v)">编辑</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      txt: "",
      blogList: [],
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    ...mapMutations(["changeBlog"]),
    getBlogList() {
      axios.get(`/api/blog/list?isadmin=1&keyword=${this.txt}`).then((res) => {
        if (res && res.data.errno === 0) {
          this.blogList = res.data.data;
        }
      });
    },
    operateBlog(item) {
      this.changeBlog(item);
      this.$router.push({
        path: "/operate",
      });
    },
    delBlog(item) {
      axios.get(`/api/blog/del?id=${item.id}`).then((res) => {
        if (res && res.data.errno === 0) {
          this.getBlogList();
          alert("博客删除成功");
        } else {
          alert("博客删除失败");
        }
      });
    },
  },
};
</script>

<style scoped>
span {
  margin-left: 10px;
  float: right;
}
</style>
