<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="pt-5">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <div class="text-danger py-3">{{message}}</div>
      <b-button type="submit" variant="primary" @click="fetchLogin()">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
// import router from '../../../router/index'
import host from "../../../../config/host";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        checked: []
      },
      show: true,
      message: ""
    };
  },
  methods: {
    fetchLogin() {
      axios({
        method: "post",
        url: host + "/login",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            $cookies.set("token", res.data.token);
            $cookies.set("type", res.data.type);
            $cookies.set("user", res.data.user);
            this.$store.dispatch("isLogin");
            return this.redirectHome();
          }
          if (res.data.code == 400) {
            this.message = res.data.message.message;
          }
        })
        .catch(err => this.$router.push("/error"));
    },
    redirectHome() {
      // this method is called on button click
      // router.push("/");
      this.$router.push("/");
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
<style scoped>
</style>