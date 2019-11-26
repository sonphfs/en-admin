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
            <h4 class="modal-title" id="myModalLabel">New Word</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">
              <form id="antoform" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Subject</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <multiselect
                      v-model="subjectSelected"
                      :options="listSubject"
                      :custom-label="nameWithLang"
                      placeholder="Select one"
                      label="name"
                      track-by="name"
                    ></multiselect>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Word</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <input type="text" class="form-control" v-model="learning_word.word" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Type</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="(v, n, adj, adv...)"
                      v-model="learning_word.type"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Meaning</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <input type="text" class="form-control" v-model="learning_word.meaning" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Pronunciation</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <input type="text" class="form-control" v-model="learning_word.pronunciation" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12">Example</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <textarea
                      v-model="learning_word.example"
                      required="required"
                      class="form-control"
                    ></textarea>
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
                      <span v-if="learning_word.image">{{ learning_word.image}}</span>
                    </p>
                    <input
                      id="file-image"
                      type="file"
                      name="imageWord"
                      data-validate-length="6,8"
                      class="form-control col-md-7 col-xs-12"
                      required="required"
                      ref="imageWord"
                      style="display: none"
                      accept="image/*"
                      @change="changeImage()"
                    />
                    <img
                      v-if="learning_word.image"
                      :src="'http://127.0.0.1:8001/'+ learning_word.image"
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
                      <span v-if="learning_word.audio">{{ learning_word.audio}}</span>
                    </p>
                    <input
                      id="file-audio"
                      type="file"
                      name="wordAudio"
                      data-validate-length="6,8"
                      class="form-control col-md-7 col-xs-12"
                      required="required"
                      ref="wordAudio"
                      style="display: none"
                      accept="audio/*"
                      @change="changeAudio()"
                    />
                    <audio controls controlslist="nodownload" v-if="learning_word.audio">
                      <source
                        :src="'http://127.0.0.1:8001/'+ learning_word.audio"
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
            <button type="button" class="btn btn-danger antosubmit" @click="createWord()">Create</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Multiselect from "vue-multiselect";

export default {
  name: "ModalForm",
  components: {
    Multiselect
  },
  props: ["item"],
  data() {
    return {
      learning_word: {
        image: "",
        audio: ""
      },
      fileUpload: "",
      listSubject: [],
      subjectSelected: { name: "Select one" }
    };
  },
  created() {
    this.getSubjects();
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    create() {},
    chooseImage() {
      this.$refs.imageWord.click();
    },
    changeImage() {
      this.fileUpload = this.$refs.imageWord.files[0];
      this.uploadImage("IMAGE", "LEARNING_WORD");
    },
    chooseAudio() {
      this.$refs.wordAudio.click();
    },
    changeAudio() {
      this.fileUpload = this.$refs.wordAudio.files[0];
      this.uploadImage("AUDIO", "LEARNING_WORD");
    },
    getSubjects(page) {
      request({
        url: "/backend/subjects/list?page=" + page,
        methods: "get"
      })
        .then(res => {
          this.listSubject = res.data.result_data.data;
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    nameWithLang({ name }) {
      return `${name}`;
    },
    uploadImage(type = "IMAGE", object = "LEARNING_WORD") {
      let formData = new FormData();
      formData.append("file", this.fileUpload);
      formData.append("type", type);
      formData.append("object", object);
      if(type == 'IMAGE' && this.learning_word.image != "") {
        this.deleteFile(this.learning_word.image)
      }
      if(type == 'AUDIO' && this.learning_word.audio != "") {
        this.deleteFile(this.learning_word.audio)
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
            this.learning_word.image = data.filePath;
          }
          if (data.typeFile == "AUDIO") {
            this.learning_word.audio = data.filePath;
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
    createWord(){
      let data = this.learning_word
      request({
        url: "/backend/learning_words/create",
        method: "post",
        data
      }).then(res => {
          console.log(res)
      }).catch(err => {
        console.log(err.res)
      })
    }
  },
  watch: {
    subjectSelected() {
      this.learning_word.subject_id = this.subjectSelected.id;
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
</style>