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
            <h4 class="modal-title" id="myModalLabel">New Lesson</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">
              <form id="antoform" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="col-sm-3 control-label">Name</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="name" name="name" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Unit</label>
                  <div class="col-sm-9">
                    <select class="select2_group form-control">
                      <option value>Select unit</option>
                      <option v-for="unit in listUnits" v-if="unit.parent_id == 0">{{ unit.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="item form-group">
                  <label for="file-image" class="control-label col-md-3">Image</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <button type="button" class="btn btn-default" @click="chooseFile()">Upload Image</button>
                    <p style="margin-top: 10px">
                        <span v-if="lesson.image">{{ lesson.image.name}}</span>
                    </p>
                    <input
                      id="file-audio"
                      type="file"
                      name="image"
                      data-validate-length="6,8"
                      class="form-control col-md-7 col-xs-12"
                      required="required"
                      ref="lessonImage"
                      style="display: none"
                      accept="image/*"
                      @change="changeFile()"
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
      lesson: {
          title: "",
          unit_id: 0,
          image: ""
      },
      listUnits: []
    };
  },
  created() {
      this.getUnits()
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    chooseFile() {
      this.$refs.lessonImage.click();
    },
    changeFile() {
      this.lesson.image = this.$refs.lessonImage.files[0];
    },
    getUnits(page = 1) {
      request({
        url: "/backend/units/list?page=" + page,
        method: "get"
      })
        .then(res => {
          this.listUnits = res.data.result_data.data;
        })
        .catch();
    },
    create() {
      let data = this.lesson;
      let formData = new FormData();
      formData.append("unit_id", this.lesson.unit_id);
      formData.append("title", this.lesson.title);
      formData.append("image", this.lesson.image);
      console.log(data)
      request
        .post("/backend/lessons/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch();
    },
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>