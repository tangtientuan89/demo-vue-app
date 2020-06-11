<template>
  <div class="home">
    <div v-if="isLogin==true">
      <h1>Hello</h1>
      <h1>{{this.$cookies.get("user")}}</h1>
    </div>
    <div v-if="isLogin==false">
      <p class="text1"></p>
      <p class="text2" v-bind="handleText()">{{this.text.text}}</p>
      <div class="btn" v-bind="handleBtn()">{{this.text.btn}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      text: {
        text: "",
        btn: ""
      }
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin
    })
  },
  methods: {
    handleText() {
      setTimeout(() => {
        console.log("texst1");
        return (this.text.text =
          "Please login or register to use Web application");
      }, 1700);
    },
    handleBtn() {
      setTimeout(() => {
        console.log("hi");
        return (
          <div>
            <a href="/login">
              <button class="btn-login">Login</button>
            </a>
            <a href="/register">
              <button class="btn-register">Register</button>
            </a>
          </div>
        );
      }, 2700);
    }
  },
  render() {
    return this.handleBtn();
  }
};
</script>
<style scoped>
.home {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(80, 80, 80, 0.9) 100%
    ),
    url(../../../assets/bg-masthead.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 90vh;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
/* .text1 {
  height: 8rem;
  font-size: 5rem;
  font-weight: bold;
  animation: text1 3s;
} */
.text2 {
  height: 5rem;
  font-size: 2rem;
  font-style: italic;
  text-align: center;
  animation: text2 2s 1.5s;
}
.btn {
  height: 3rem;
  animation: btn 2s 2.5s;
}
@keyframes text1 {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(0.5);
  }
  75% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
  }
}

@keyframes text2 {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  75% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
  }
}

@keyframes btn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>