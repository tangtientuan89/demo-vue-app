<template>
  <div>
    <div>this is page todo</div>
    <div>
      <Table :data="data" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "./table/Table";
import axios from "axios";
import host from "../../../../config/host";
export default {
  components: {
    Table
  },
  data() {
    return {
      data: ""
    };
  },
  created: function() {
    console.log("cookies ", $cookies.get("token"));
    axios({
      method: "get",
      url: host + "/api/to-do-list",
      headers: {
        Authorization: `Bearer token=${$cookies.get("token")}`,
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.data = res.data.data;
      localStorage.setItem('dataTodo',JSON.stringify(this.data))
      this.$store.dispatch("getDataTodo",this.data)
    });
  },
  computed: {
  
  },
  methods: {}
};
</script>

<style scoped>
</style>