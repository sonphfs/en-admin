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
                    <select class="select2_group form-control" v-model="learning_word.subject_id">
                      <option v-for="subject in listSubject" :value="subject.id">{{subject.name}}</option>
                    </select>
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
                <div class="item form-group">
                  <label for="file-image" class="control-label col-md-3">Image</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <button
                      type="button"
                      class="btn btn-default"
                      @click="chooseImage()"
                    >Upload Image</button>
                    <p style="margin-top: 10px">
                      <span v-if="learning_word.image">{{ learning_word.image.name}}</span>
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
                  </div>
                </div>
                <div class="item form-group">
                  <label for="file-image" class="control-label col-md-3">Audio</label>
                  <div class="col-md-9 col-sm-9 col-xs-12">
                    <button
                      type="button"
                      class="btn btn-default"
                      @click="chooseAudio()"
                    >Upload Audio</button>
                    <p style="margin-top: 10px">
                      <span v-if="learning_word.audio">{{ learning_word.audio.name}}</span>
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
      learning_word: {
        image: "",
        audio: ""
      },
      listSubject: []
    };
  },
  created() {
    this.getSubjects()
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
      this.learning_word.image = this.$refs.imageWord.files[0];
    },
    chooseAudio() {
      this.$refs.wordAudio.click();
    },
    changeAudio() {
      this.learning_word.audio = this.$refs.wordAudio.files[0];
    },
    getSubjects(page) {
      request({
        url: '/backend/subjects/list?page=' + page,
        methods: "get"
      }).then(res => {
        this.listSubject = res.data.result_data.data
      }).catch(err => {
        console.log(err.res)
      })
    }
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>