<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "./components/layout/header/Header";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Header: Header
  },
  computed: {
    ...mapState({ isLogin: state => state.login.isLogin })
  },
  created: function() {
    this.$store.dispatch("isLogin");
    console.log("isLogin", this.isLogin);
  }
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
