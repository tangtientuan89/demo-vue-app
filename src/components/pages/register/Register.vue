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
      <b-form-group id="input-group-2" label="Confirm Your Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.confirmPassword"
          required
          placeholder="Enter confirm password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <div class="text-danger py-3">{{message}}</div>
      <b-button type="submit" variant="primary" @click="fetchRegister()">Register</b-button>
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
        confirmPassword: ""
      },
      show: true,
      message: ""
    };
  },
  mounted() {},
  methods: {
    fetchRegister() {
      if (this.checkMatchPassword() && this.checkValidateEmail()) {
        axios({
          method: "post",
          url: host + "/register",
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              alert("register success, pls login");
              return this.redirectLogin();
            }
            if (res.data.code == 400) {
              this.message = res.data.message.message;
            }
          })
          .catch(err => this.$router.push("/error"));
      }
    },
    checkMatchPassword() {
      if (this.form.password !== this.form.confirmPassword) {
        this.message = "confirm password not match";
        return false
      }
      return true
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    checkValidateEmail() {
      if (!this.validateEmail(this.form.email) || !this.form.password) {
        return false;
      }
      return true;
    },
    redirectLogin() {
      // this method is called on button click
      // router.push("/");
      this.$router.push("/login");
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";
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