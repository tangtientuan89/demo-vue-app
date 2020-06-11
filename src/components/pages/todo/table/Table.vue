<template>
  <div>
    <!-- <router-link to="/to-do/data[0]._id">
      <b-table striped hover :items="data" :fields="fields"></b-table>
    </router-link>-->
    <div class="table" v-for="items in data" :key="items.title">
      <router-link :to="`/to-do/${items.title+'-post'+items._id+'.html'}`">
        <div>{{items.title}}</div>
      </router-link>>
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
.table {
  display: flex;
  justify-content: center;
}
</style>