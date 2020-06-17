<template>
  <div class="search py-3 row d-flex justify-content-center">
    <input
      class="form-control col-4"
      type="text"
      v-model="textSearch"
      @keyup="giveTextSearch"
      @keyup.13="giveTextSearch"
    />
    <div class="px-2">
      <button class="btn btn-primary" @click="giveTextSearch">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textSearch: ""
    };
  },
  methods: {
    giveTextSearch() {
      this.$emit("giveTextSearch", this.textSearch);
    }
  }
};
</script>

<style scoped>
</style>