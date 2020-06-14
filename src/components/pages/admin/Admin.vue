<template>
  <div class="container">
    <h1>Manage user</h1>
    <SearchUser @giveTextSearch="handleSearch"/>
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
          <th class="col-1">{{index+1}}</th>
          <td class="col-3">
            <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.email}}</router-link>
          </td>
          <td class="col-2">
            <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.status}}</router-link>
          </td>
          <td class="col-1">
            <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.verified}}</router-link>
          </td>
          <td class="col-5 d-flex justify-content-center">
            <button
              class="m-2 btn btn-warning text-dark"
              type="button"
              @click="changeStatusUser(items._id,'block')"
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
</template>

<script>
import axios from "axios";
import host from "../../../../config/host";
import SearchUser from "./SearchUser"
export default {
  components:{
    SearchUser
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      data: "",
      textSearch:"",
    };
  },
  methods: {
    getUsers() {
      axios({
        method: "GET",
        url: host + "/api/admin?search="+this.textSearch,
        headers: {
          Authorization: `Bearer token=${$cookies.get("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            return (this.data = res.data.data);
          }
          if (res.data.code == 404) {
            this.$router.push("/error");
          }
        })
        .catch(err => this.$router.push("/error"));
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
    handleSearch(text){
      this.textSearch=text
      this.getUsers()
    }
  }
};
</script>

<style scoped>
</style>