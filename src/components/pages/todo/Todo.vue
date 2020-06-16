<template>
  <div class="container">
    <SearchTodo @giveTextSearch="handleSearch" />
    <div class="addNew" @click="isAddForm">
      <div class="modal-add" id="modal-add">
        <img class="icon" src="../../../assets/Apps-Dialog-Add-icon.png" alt />
      </div>
      <label for="modal-add">Add New</label>
    </div>
    <AddForm
      v-if="statusForm=='add'"
      :isAddForm="isAddForm"
      :isHideForm="isHideForm"
      :addData="addData"
    />
    <EditForm
      v-if="statusForm=='edit'"
      :isEditForm="isEditForm"
      :isHideForm="isHideForm"
      :editData="editData"
    />
    <Table :data="data" :deleteData="deleteData" :isEditForm="isEditForm" :statusForm="statusForm" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SearchTodo from "./SearchTodo";
import Table from "./table/Table";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import axios from "axios";
import host from "../../../../config/host";
export default {
  components: {
    SearchTodo,
    Table,
    AddForm,
    EditForm
  },
  data() {
    return {
      data: "",
      textSearch: "",
      statusForm: "hide"
    };
  },
  mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    isAddForm() {
      return (this.statusForm = "add");
    },
    isEditForm() {
      return (this.statusForm = "edit");
    },
    isHideForm() {
      return (this.statusForm = "hide");
    },
    handleSearch(text) {
      this.textSearch = text;
      this.getData();
    },

    getData() {
      axios({
        method: "GET",
        url: host + "/api/to-do-list?search=" + this.textSearch,
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.data = res.data.data;
            localStorage.setItem("dataTodo", JSON.stringify(this.data));
            return this.$store.dispatch("getDataTodo", this.data);
          }
          if (res.data.code == 404) {
            this.$store.dispatch("getDataError", res.data.message);
            this.$router.push("/error");
          }
        })
        .catch(err => this.$router.push("/error"));
    },
    addData(title, content) {
      axios({
        method: "POST",
        url: host + "/api/to-do-list",
        data: { title: title, content: content },
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log("res", res);
          this.getData();
        })
        .catch(err => console.log(err));
    },
    editData(_id, title, content) {
      console.log("dataedit", title);
      axios({
        method: "PUT",
        url: host + "/api/to-do-list?id=" + _id,
        data: { title: title, content: content },
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log("res", res);
          this.getData();
        })
        .catch(err => console.log(err));
    },
    deleteData(id) {
      axios({
        method: "DELETE",
        url: host + "/api/to-do-list?id=" + id,
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log("delete success");
          this.getData();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
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