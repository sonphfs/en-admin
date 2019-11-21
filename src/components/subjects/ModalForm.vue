<template>
  <div>
    <div
      class="modal fade in"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: block; padding-right: 15px;"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="close()"
            >×</button>
            <h4 class="modal-title" id="myModalLabel">New Subject</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">
              <form id="antoform" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Name</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <input type="text" class="form-control" v-model="subject.name" />
                  </div>
                </div>
                <div class="item form-group">
                  <label for="file-image" class="control-label col-md-3">Image</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <button
                      type="button"
                      class="btn btn-default"
                      @click="chooseImage()"
                    >Upload Image</button>
                    <p style="margin-top: 10px">
                      <span v-if="subject.image">{{ subject.image.name}}</span>
                    </p>
                    <input
                      id="file-image"
                      type="file"
                      name="subjectImage"
                      data-validate-length="6,8"
                      class="form-control col-md-7 col-xs-12"
                      required="required"
                      ref="subjectImage"
                      style="display: none"
                      accept="image/*"
                      @change="changeImage()"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default antoclose"
              data-dismiss="modal"
              @click="close()"
            >Cancel</button>
            <button type="button" class="btn btn-danger antosubmit" @click="create()">Create</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "ModalForm",
  props: ["item"],
  data() {
    return {
      subject: {
        name: "",
        image: ""
      }
    };
  },
  created() {
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    create() {},
    chooseImage() {
      this.$refs.subjectImage.click();
    },
    changeImage() {
      this.subject.image = this.$refs.subjectImage.files[0];
    },
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>