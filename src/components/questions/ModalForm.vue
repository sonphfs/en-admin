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
            <h4 class="modal-title" id="myModalLabel">{{ action }} câu hỏi mới</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">
              <form id="antoform" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Content</label>
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <input type="text" class="form-control" v-model="question.content" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 col-sm-3 col-xs-12 control-label">
                    Đáp án A
                    <br />
                  </label>
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <input
                      type="text"
                      class="form-control col-md-10"
                      autocomplete="off"
                      v-model="question.answer_A"
                    />
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="checkbox">
                      <div
                        class="icheckbox_flat-green"
                        :class="{ checked : question.correct_answer=='A'}"
                      >
                        <input type="radio" name="correct_answer" class="flat" value="A" />
                        <ins class="iCheck-helper" @click="chooseCorrectAnswer('A')"></ins>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 col-sm-3 col-xs-12 control-label">
                    Đáp án B
                    <br />
                  </label>
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <input
                      type="text"
                      class="form-control col-md-10"
                      autocomplete="off"
                      v-model="question.answer_B"
                    />
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="checkbox">
                      <div
                        class="icheckbox_flat-green"
                        :class="{ checked : question.correct_answer=='B'}"
                      >
                        <input
                          type="radio"
                          name="correct_answer"
                          class="flat"
                          value="B"
                          v-model="question.correct_answer"
                        />
                        <ins class="iCheck-helper" @click="chooseCorrectAnswer('B')"></ins>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 col-sm-3 col-xs-12 control-label">
                    Đáp án C
                    <br />
                  </label>
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <input
                      type="text"
                      class="form-control col-md-10"
                      autocomplete="off"
                      v-model="question.answer_C"
                    />
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="checkbox">
                      <div
                        class="icheckbox_flat-green"
                        :class="{ checked : question.correct_answer=='C'}"
                      >
                        <input type="radio" name="correct_answer" class="flat" value="C" />
                        <ins class="iCheck-helper" @click="chooseCorrectAnswer('C')"></ins>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group" v-if="question.part!=2">
                  <label class="col-md-3 col-sm-3 col-xs-12 control-label">
                    Đáp án D
                    <br />
                  </label>
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <input
                      type="text"
                      name="country"
                      class="form-control col-md-10"
                      autocomplete="off"
                      v-model="question.answer_D"
                    />
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="checkbox">
                      <div
                        class="icheckbox_flat-green"
                        :class="{ checked : question.correct_answer=='D'}"
                      >
                        <input type="radio" name="correct_answer" class="flat" value="D" />
                        <ins class="iCheck-helper" @click="chooseCorrectAnswer('D')"></ins>
                      </div>
                    </div>
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
                      <span v-model="question.image" v-if="question.image">{{ question.image}}</span>
                    </p>
                    <input
                      id="file-image"
                      type="file"
                      name="questionImage"
                      data-validate-length="6,8"
                      class="form-control col-md-7 col-xs-12"
                      required="required"
                      ref="questionImage"
                      style="display: none"
                      accept="image/*"
                      @change="changeImage()"
                    />
                    <img
                      v-if="question.image"
                      :src="'http://127.0.0.1:8001/'+ question.image"
                      width="300px"
                      height="300px"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="file-image" class="control-label col-md-3 col-sm-3 col-xs-12">Audio</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <button
                      type="button"
                      class="btn btn-default"
                      @click="chooseAudio()"
                    >Upload Audio</button>
                    <p style="margin-top: 10px">
                      <span v-if="question.audio">{{ question.audio}}</span>
                    </p>
                    <input
                      id="file-audio"
                      type="file"
                      name="questionAudio"
                      data-validate-length="6,8"
                      class="form-control col-md-7 col-xs-12"
                      required="required"
                      ref="questionAudio"
                      style="display: none"
                      accept="audio/*"
                      @change="changeAudio()"
                    />
                    <audio controls controlslist="nodownload" v-if="question.audio">
                      <source
                        :src="'http://127.0.0.1:8001/'+ question.audio"
                        type="audio/mpeg"
                      />
                    </audio>
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
            <button type="button" class="btn btn-danger antosubmit">{{ action }}</button>
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
  name: "CreateQuestion",
  components: {},
  props: ["item"],
  data() {
    return {
      question: {
        content: "",
        audio: null,
        image: null,
        answer_A: "",
        answer_B: "",
        answer_C: "",
        answer_D: "",
        correct_answer: ""
      },
      fileUpload: "",
      action: "Tạo"
    };
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    chooseImage() {
      this.$refs.questionImage.click();
    },
    changeImage() {
      this.fileUpload = this.$refs.questionImage.files[0];
      this.uploadImage();
    },
    chooseAudio() {
      this.$refs.questionAudio.click();
    },
    changeAudio() {
      this.fileUpload = this.$refs.questionAudio.files[0];
      this.uploadImage("AUDIO", "QUESTION");
    },
    uploadImage(type = "IMAGE", object = "QUESTION") {
      let formData = new FormData();
      formData.append("file", this.fileUpload);
      formData.append("type", type);
      formData.append("object", object);
      if(type == 'IMAGE' && this.question.image != "") {
        this.deleteFile(this.question.image)
      }
      if(type == 'AUDIO' && this.question.audio != "") {
        this.deleteFile(this.question.audio)
      }
      request
        .post("/backend/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          let data = res.data.result_data;
          if (data.typeFile == "IMAGE") {
            this.question.image = data.filePath;
          }
          if (data.typeFile == "AUDIO") {
            this.question.audio = data.filePath;
          }
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
    chooseCorrectAnswer(answer) {
      this.question.correct_answer = answer;
    }
  },
  created() {
    if (this.item !== undefined) {
      this.question = this.item;
    }
  }
};
</script>


<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
div.modal-body {
  height: 500px;
  overflow-y: auto;
}
ins {
  position: absolute;
  top: 0%;
  left: 0%;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background: rgb(255, 255, 255);
  border: 0px;
  opacity: 0;
}
div.checkbox div.icheckbox_flat-green input {
  position: absolute;
  opacity: 0;
}
div.checkbox div.icheckbox_flat-green {
  position: relative;
}
</style>