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
                <div class="form-group">
                  <label for="file-image" class="control-label col-md-3 col-sm-3 col-xs-12">Image</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <button
                      type="button"
                      class="btn btn-default"
                      @click="chooseImage()"
                    >Upload Image</button>
                    <p style="margin-top: 10px">
                      <span v-if="subject.image">{{ subject.image}}</span>
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
                    <img
                      v-if="subject.image"
                      :src="'http://127.0.0.1:8001/'+ subject.image"
                      width="300px"
                      height="300px"
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
            <button type="button" class="btn btn-danger antosubmit" @click="createSubject()">Create</button>
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
      },
      fileUpload: ""
    };
  },
  created() {},
  methods: {
    close() {
      this.$emit("onClose");
    },
    chooseImage() {
      this.$refs.subjectImage.click();
    },
    changeImage() {
      this.fileUpload = this.$refs.subjectImage.files[0];
      this.uploadImage();
    },
    uploadImage(type = "IMAGE", object = "SUBJECT") {
      let formData = new FormData();
      formData.append("file", this.fileUpload);
      formData.append("type", type);
      formData.append("object", object);
      if (this.subject.image != "") {
        this.deleteFile(this.subject.image);
      }
      request
        .post("/backend/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          let data = res.data.result_data;
          this.subject.image = data.filePath;
        });
    },
    deleteFile(fileSrc) {
      let data = {
        filePath: fileSrc
      };
      console.log(data);
      request({
        url: "/backend/files/delete",
        method: "post",
        data
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createSubject() {
      let data = this.subject;
      request({
        url: "/backend/subjects/create",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.close()
          this.successAlert();
        })
        .catch(err => {
          console.log(err.res);
          this.close()
          this.errorAlert();
        });
    },
    successAlert() {
      this.$swal.fire({
        position: "top",
        type: "success",
        title: "Subject has been created",
        showConfirmButton: false,
        timer: 3000
      });
    },
    errorAlert() {
      this.$swal.fire({
        position: "top",
        type: "error",
        title: "Oops...",
        text: "Create subject failed!",
      });
    }
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>