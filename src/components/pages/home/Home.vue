<template>
  <div class="home">
    <div v-if="isLogin==true">
      <h1>Hello</h1>
      <h1>{{this.$cookies.get("user")}}</h1>
    </div>
    <div v-if="isLogin==false">
      <div class="text-h1"><p class="text-h1-content">{{text.animation}}</p></div>
      <div class="text-h3"><p class="text-h3-content" v-if="text.text==true">Please login or register to use Web application</p></div>
      <div class="btn">
        <div class="btn-content" v-if="text.btn==true">
          <router-link to="/login">
            <button class="btn-login">Login</button>
          </router-link>
          <router-link to="/register">
            <button class="btn-register">Register</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      text: {
        animation: "",
        text: false,
        btn: false
      }
    };
  },
  mounted() {
    this.handleText();
    this.handleBtn();
    this.textLagre();
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin
    })
  },
  methods: {
    textLagre() {
      let text = "WELLCOME";
      let arrText = [];

      for (var i = 0; i < text.length; i++) {
        arrText.push(text[i]);
      }
      let newText = "";
      arrText.forEach((element, index) => {
        setTimeout(() => {
          this.text.animation = newText + element;
          newText = newText + element;
        }, 200 * (index + 1));
      });
    },
    handleText() {
      setTimeout(() => {
        return (this.text.text = true);
      }, 1700);
    },
    handleBtn() {
      setTimeout(() => {
        this.text.btn = true;
      }, 2700);
    }
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
  height: 91vh;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  z-index: 0;
}
button {
  height: 2.5rem;
  width: 8rem;
  margin: 1rem;
  padding: 0;
  cursor: pointer;
  border-radius: 5px;
  border: #007bff;
  background-color: #007bff;
  color: white;
}
button:hover {
  border: #f37748;
  background-color: #f37748;
}
.text-h1 {
  height: 8rem;
  font-size: 5rem;
  font-weight: bold;
}
.text-h1-content {
  animation: text1 3s;
}
.text-h3 {
  height: 5rem;
  font-size: 2rem;
  font-style: italic;
  text-align: center;
}
.text-h3-content {
  animation: text2 2s;
}
.btn {
  height: 3rem;
}
.btn-content {
  animation: btn 2s;
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