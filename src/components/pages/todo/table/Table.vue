<template>
  <div class="container">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr class="row">
            <th class="col-1">#</th>
            <th class="col-3">Title</th>
            <th class="col-5">Content</th>
            <th class="col-3">Button</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(items, index) in data" :key="items._id" class="row">
            <th class="col-1">{{index+1}}</th>
            <td class="col-3">
              <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.title}}</router-link>
            </td>
            <td class="col-5">
              <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.content}}</router-link>
            </td>
            <td class="col-3 d-flex justify-content-center">
              <button class="m-2 btn btn-warning text-dark" type="button" @click="handleBtnEdit({_id:items._id,title:items.title,content:items.content})">Edit</button>
              <button class="m-2 btn btn-danger" type="button" @click="deleteData(items._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ["data","deleteData","isEditForm"],
  data() {
    return {
      fields: ["title", "content"]
    };
  },
  methods: {
    handleBtnEdit(payload){
      this.isEditForm()
      this.$store.dispatch('editDataTodo',payload)
    }
  }
};
</script>
<style scoped>
.container{
  height: 70vh;
  overflow-y: scroll;
}
</style>