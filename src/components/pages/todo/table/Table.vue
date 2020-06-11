<template>
  <div class="container">
    <!-- <router-link to="/to-do/data[0]._id">
      <b-table striped hover :items="data" :fields="fields"></b-table>
    </router-link>-->
    <!-- <div class="table-test" v-for="items in data" :key="items._id">
      <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">
        <div>{{items.title}}</div>
      </router-link>
    </div>-->
    <div>
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
          <tr v-for="(items, index) in data" :key="index" class="row">
            <th class="col-1">{{index+1}}</th>
            <td class="col-3">
              <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.title}}</router-link>
            </td>
            <td class="col-5">
              <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">{{items.content}}</router-link>
            </td>
            <td class="col-3 d-flex justify-content-center">
              <button class="m-2 btn btn-warning text-dark" type="button">Edit</button>
              <button class="m-2 btn btn-danger" type="button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      fields: ["title", "content"]
    };
  },
  methods: {
    getProps() {
      console.log(" this.$router ", this.data);
      return this.data;
    }
  }
};
</script>
<style scoped>
.table-test {
  display: flex;
  justify-content: center;
}
</style>