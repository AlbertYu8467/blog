<template>
  <div class="p40">
    <div class="item">用户名：<input type="text" v-model="username" /></div>
    <div class="item">密码：<input type="text" v-model="pwd" /></div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      pwd: "",
    };
  },
  methods: {
    login() {
      axios
        .post("api/user/login", { username: this.username, password: this.pwd })
        .then((res) => {
          if (res && res.data.errno === 0) {
            alert("登录成功");
          } else {
            alert("登录失败");
          }
        });
    },
  },
};
</script>
