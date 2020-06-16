<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="pt-5">
      <b-form-group id="input-group-1" label="Your Password:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Your New Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.newPassword"
          required
          placeholder="Enter new password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Confirm Your New Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.confirmNewPassword"
          required
          placeholder="Enter confirm new password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <div class="text-danger py-3">{{message}}</div>
      <b-button type="submit" variant="primary" @click="fetchRegister()">Change</b-button>
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
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      },
      show: true,
      message: ""
    };
  },
  methods: {
    fetchRegister() {
      if (this.checkMatchNewPassword()) {
        axios({
          method: "post",
          url: host + "/change-password",
          data: {
            password: this.form.password,
            newPassword: this.form.newPassword
          },
          headers: {
            Authorization: `Bearer token=${$cookies.get("token")}`,
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              alert("change success, pls login again");
              $cookies.remove("token");
              $cookies.remove("type");
              $cookies.remove("user");
              this.$store.dispatch("isLogin");
              localStorage.clear();
              return this.redirectLogin();
            }
            if (res.data.code == 404) {
              this.message = res.data.message;
            }
          })
          .catch(err => {
            this.$store.dispatch('getDataError',err)
            this.$router.push("/error")
          });
      }
    },
    checkMatchNewPassword() {
      if (this.form.newPassword !== this.form.confirmNewPassword) {
        this.message = "confirm new password not match";
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
      this.form.password = "";
      this.form.newPassword = "";
      this.form.confirmNewPassword = "";
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