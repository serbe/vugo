<template>
  <div class="container w300">
    <div class="content has-text-centered">
      <h2>Авторизация</h2>
    </div>
    <p v-if="$route.query.redirect" key="redirect">
      You need to login first.
    </p>
    <bulma-input v-model="name" label placeholder="Имя пользователя" iconLeft="user"></bulma-input>
    <bulma-input v-model="pass" type="password" label placeholder="Пароль" iconLeft="lock" @keyup="onKeyup"></bulma-input>
    <div class="field is-grouped pt10">
      <bulma-button text="Вход" color="primary" @click="login" class="pl20"></bulma-button>
      <bulma-button text="Закрыть" @click="close" class="pl20" color="light"></bulma-button>
    </div>
    <p v-if="error" class="error" key="error">Bad login information</p>
  </div>
</template>

<script>
import BulmaInput from "@/components/BulmaInput";
import BulmaButton from "@/components/BulmaButton";
import auth from "@/auth";
import axios from "axios";

export default {
  name: "LoginPage",
  components: {
    "bulma-input": BulmaInput,
    "bulma-button": BulmaButton
  },
  data() {
    return {
      name: "",
      pass: "",
      error: false,
      rememberMe: true
    };
  },
  mounted() {
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },
  methods: {
    login() {
      const router = this.$router;
      let url = "/edds/api/login";
      const data = {
        username: this.name,
        password: this.pass
      };
      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:9090/edds/api/login";
      }
      let rightPage = auth.right_page;
      axios({
        url,
        method: "POST",
        data
      }).then(r => {
        if (r.data.token && r.data.token !== "") {
          auth.login(r.data);
          router.push({ name: rightPage });
        }
      });
    },
    close() {
      this.$router.push("/");
    },
    onKeyup(event) {
      if (event.event.key === "Enter") {
        this.login();
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.w300 {
  width: 300px !important;
}

.pt10 {
  padding-top: 10px;
}

.pl20 {
  padding-left: 20px;
}
</style>
