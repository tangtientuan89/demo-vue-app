<template>
  <div>
    <div>_id: {{$route.params._id}}</div>
    <div>{{findItem($route.params._id)}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      data: state => state.dataTodo.dataTodo
    })
  },
  methods: {
    findItem(_id) {
      let arr = JSON.parse(localStorage.getItem("dataTodo"));
      return arr.find(item => item._id == _id);
    },
  }
};
</script>

<style scoped>
</style>