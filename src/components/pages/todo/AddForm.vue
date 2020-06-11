<template>
  <div class>
    <form class="bg-light" onsubmit="{this.handleSubmit}">
      <div class="form-group">
        <label for="title" class="text-light">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          aria-describedby="emailHelp"
          placeholder="Title"
        />
      </div>
      <div class="form-group">
        <label for="content" class="text-light">Content</label>
        <input type="text" class="form-control" id="content" placeholder="Content" />
      </div>
      <div class="d-flex justify-content-end align-items-end py-2">
        <div class="px-2">
          <button type="button" class="btn btn-primary">Save</button>
        </div>
        <div>
          <button type="button" class="btn text-light btn-secondary" @click="handleAddnew">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props:["handleAddnew"]
};
</script>

<style scoped>
</style>