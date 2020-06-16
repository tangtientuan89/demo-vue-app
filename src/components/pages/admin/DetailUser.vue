<template>
  <div>
    <div>_id: {{$route.params._id}}</div>
    <div>{{findItem($route.params._id)}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    findItem(_id) {
      let arr = JSON.parse(localStorage.getItem("dataUsers"));
      return arr.find(item => item._id == _id);
    },
  }
};
</script>

<style scoped>
</style>