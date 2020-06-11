<template>
  <div>
    <div>_id: {{$route.params.id}}</div>
    <div>{{findItem($route.params.id)}}</div>
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
    findItem(id) {
      let arr = JSON.parse(localStorage.getItem("dataTodo"));
      console.log("data", arr);
      return arr.find(item => item._id == id);
    },
  }
};
</script>

<style scoped>
</style>