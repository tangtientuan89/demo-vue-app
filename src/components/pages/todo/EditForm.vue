<template>
  <div class>
    <form class="bg-light" onsubmit="{this.handleSubmit}">
      <div class="form-group">
        <label for="title" class="text-light">Title</label>

        <!--use v-if Check status to handle tag input -->
        <input
          type="text"
          class="form-control"
          id="title"
          aria-describedby="emailHelp"
          placeholder="Title"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <label for="content" class="text-light">Content</label>
        <input
          type="text"
          class="form-control"
          id="content"
          placeholder="Content"
          v-model="content"
        />
        <!-- ////// -->
      </div>
      <div class="d-flex justify-content-end align-items-end py-2">
        <div class="px-2">
          <button type="button" class="btn text-light btn-secondary" @click="isHideForm">Cancel</button>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            @click="handlebBtnSave(storeEditData()._id)"
          >Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import host from "../../../../config/host";
export default {
  props: ["isEditForm", "isHideForm", "editData"],
  mounted() {
    this.title = this.$store.state.dataTodo.editData.title;
    this.content = this.$store.state.dataTodo.editData.content;
  },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    ...mapState({
      storeEditData: state => state.dataTodo.editData
    }),
    handlebBtnSave(_id) {
        console.log('object',this.title)
      this.editData(_id, this.title, this.content);
      console.log('id ',_id)
      this.isHideForm();
    }
  }
};
</script>

<style scoped>
</style>