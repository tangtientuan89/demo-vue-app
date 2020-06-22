<template>
  <div class="container">
    <h1>Manage users</h1>
    <SearchUser @giveTextSearch="handleSearch" />
    <div class="container table-admin">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr class="row">
            <th class="col-1">#</th>
            <th class="col-3">email</th>
            <th class="col-2">status</th>
            <th class="col-1">verified</th>
            <th class="col-5">Button</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(items, index) in data" :key="items._id" class="row">
            <th class="col-1 d-flex justify-content-center align-items-center">{{index+1}}</th>
            <td class="col-3 d-flex justify-content-center align-items-center">
              <router-link :to="`/admin/${items.email+'-user'+items._id+'.html'}`">{{items.email}}</router-link>
            </td>
            <td class="col-2 d-flex justify-content-center align-items-center">
              <router-link
                :to="`/admin/${items.email+'-user'+items._id+'.html'}`"
                :style="changeStyle(items.status)"
              >{{items.status}}</router-link>
            </td>
            <td class="col-1 d-flex justify-content-center align-items-center">
              <router-link
                :to="`/admin/${items.email+'-user'+items._id+'.html'}`"
                :style="changeStyle(items.verified)"
              >{{items.verified}}</router-link>
            </td>
            <td class="col-5 d-flex justify-content-center">
              <button
                class="m-2 btn btn-warning text-dark"
                type="button"
                @click="changeStatusUser(items._id,'blocked')"
              >Block</button>
              <button
                class="m-2 btn btn-primary"
                type="button"
                @click="changeStatusUser(items._id,'actived')"
              >Actived</button>
              <button class="m-2 btn btn-danger" type="button" @click="deleteUser(items._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import host from "../../../../config/host";
import SearchUser from "./SearchUser";
export default {
  components: {
    SearchUser
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      data: "",
      textSearch: ""
    };
  },
  methods: {
    getUsers() {
      axios({
        method: "GET",
        url: host + "/api/admin?search=" + this.textSearch,
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.data = res.data.data;
            localStorage.setItem("dataUsers", JSON.stringify(this.data));
            return;
          }
          if (res.data.code == 404) {
            this.$store.dispatch("getDataError", res.data.message);
            this.$router.push("/error");
          }
        })
        .catch(err => {
          this.$store.dispatch("getDataError", err);
          this.$router.push("/error");
        });
    },
    changeStatusUser(_id, status) {
      axios({
        method: "PUT",
        url: host + "/api/admin?id=" + _id + "&status=" + status,
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.getUsers();
      });
    },
    deleteUser(_id) {
      axios({
        method: "DELETE",
        url: host + "/api/admin?id=" + _id,
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.getUsers();
      });
    },
    handleSearch(text) {
      this.textSearch = text;
      this.getUsers();
    },
    changeStyle(text) {
      if (text == "blocked" || text == false) {
        return `color:red`;
      }
    }
  }
};
</script>

<style scoped>
.table-admin {
  overflow-y: scroll;
  height: 70vh;
}
</style>