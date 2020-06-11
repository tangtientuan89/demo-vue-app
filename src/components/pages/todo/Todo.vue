<template>
  <div class="container">
    <Search />
    <div class="addNew" @click="handleAddnew">
      <div class="modal-add" id="modal-add" >
        <img class="icon" src="../../../assets/Apps-Dialog-Add-icon.png" alt />
      </div>
      <label for="modal-add">Add New</label>
    </div>
    <AddForm v-if="showAddnew==true" :handleAddnew="handleAddnew"/>
    <Table :data="data" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Search from "./Search";
import Table from "./table/Table";
import AddForm from "./AddForm";
import axios from "axios";
import host from "../../../../config/host";
export default {
  components: {
    Search,
    Table,
    AddForm
  },
  data() {
    return {
      data: "",
      showAddnew: false
    };
  },
  mounted() {
    axios({
      method: "get",
      url: host + "/api/to-do-list",
      headers: {
        Authorization: `Bearer token=${$cookies.get("token")}`,
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.data = res.data.data;
      localStorage.setItem("dataTodo", JSON.stringify(this.data));
      this.$store.dispatch("getDataTodo", this.data);
    });
  },
  computed: {},
  methods: {
    handleAddnew() {
      return this.showAddnew=!this.showAddnew;
    }
  }
};
</script>

<style scoped>
.addNew {
  display: flex;
  justify-content: start;
  align-items: center;
  background: gray;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
}
label {
  font-size: 2rem;
  padding-left: 1rem;
  cursor: pointer;
}
.icon {
  height: 40px;
  width: 40px;
  margin-left: 0.5rem;
}
</style>