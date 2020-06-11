<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Home</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/to-do">Todo</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/admin">Admin</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="isLogin == true">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em :key="getUser()">{{user}}</em>
              </template>
              <b-dropdown-item to="/" @click="getParams">Profile</b-dropdown-item>
              <b-dropdown-item to="/" @click="removeDataLocal">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-if="isLogin == false">
            <router-link to="/login">
        
              <b-btn>Login</b-btn>
            </router-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      user: ""
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin
    })
  },

  methods: {
    getUser() {
      return (this.user = $cookies.get("user"));
    },
    removeDataLocal() {
      $cookies.remove("token");
      $cookies.remove("type");
      $cookies.remove("user");
      this.$store.dispatch("isLogin");
      localStorage.clear();
    },
    getParams() {
      console.log("$route.params ", this);
    }
  }
};
</script>

<style scoped></style>