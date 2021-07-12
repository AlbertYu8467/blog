<template>
  <div class="p40">
    <h1>新建博客</h1>
    博客标题：<input type="text" v-model="title" />
    <div class="item"></div>
    博客内容：<textarea cols="30" rows="10" v-model="content"></textarea>
    <div class="item"></div>
    <button @click="submit()">save</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      content: "",
      title: "",
    };
  },
  computed: {
    ...mapState(["blog"]),
  },
  created() {
    this.content = this.blog ? this.blog.content : "";
    this.title = this.blog ? this.blog.title : "";
  },
  methods: {
    submit() {
      if (this.blog) {
        this.updateBlog();
      } else {
        this.createBlog();
      }
    },
    updateBlog() {
      let params = {
        content: this.content,
        title: this.title,
      };
      axios.post("/api/blog/update?id=" + this.blog.id, params).then((res) => {
        if (res && res.data.errno === 0) {
          alert("博客更新成功");
        } else {
          alert("博客更新失败");
        }
      });
    },
    createBlog() {
      let params = {
        content: this.content,
        title: this.title,
      };
      axios.post("/api/blog/new", params).then((res) => {
        if (res && res.data.errno === 0) {
          alert("博客新建成功");
        } else {
          alert("博客新建失败");
        }
      });
    },
  },
};
</script>

<style>
</style>
