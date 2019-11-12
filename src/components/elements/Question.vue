<template>
  <div class="form-horizontal form-label-left">
    <div class="form-group">
      <label class="control-label col-md-3 col-sm-3 col-xs-12">No</label>
      <div class="col-md-5 col-sm-5 col-xs-12">
        <input type="text" class="form-control" v-model="question.no" />
      </div>
    </div>
     <div class="form-group">
      <label class="control-label col-md-3 col-sm-3 col-xs-12">Content</label>
      <div class="col-md-5 col-sm-5 col-xs-12">
        <input type="text" class="form-control" v-model="question.content" />
      </div>
    </div>
    <div class="item form-group">
      <label for="file-audio" class="control-label col-md-3">Audio</label>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <button type="button" class="btn btn-default" @click="chooseAudio()">Upload Audio</button>
        <span v-if="question.audio">{{ question.audio.name }}</span>
        <input
          type="file"
          data-validate-length="6,8"
          class="form-control col-md-7 col-xs-12"
          ref="questionAudio"
          style="display: none"
          accept="audio/*"
          @change="changeAudio()"
        />
      </div>
    </div>
    <div class="item form-group">
      <label for="file-audio" class="control-label col-md-3">Image</label>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <button type="button" class="btn btn-default" @click="chooseImage()">Upload Image</button>
        <span v-if="question.image">{{ question.image.name }}</span>
        <input
          type="file"
          data-validate-length="6,8"
          class="form-control col-md-7 col-xs-12"
          required="required"
          ref="questionImage"
          style="display: none"
          accept="image/*"
          @change="changeImage()"
        />
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
          <div class="icheckbox_flat-green" :class="{ checked : question.correct_answer=='A'}">
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
          <div class="icheckbox_flat-green" :class="{ checked : question.correct_answer=='B'}">
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
          <div class="icheckbox_flat-green" :class="{ checked : question.correct_answer=='C'}">
            <input type="radio" name="correct_answer" class="flat" value="C" />
            <ins class="iCheck-helper" @click="chooseCorrectAnswer('C')"></ins>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
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
          <div class="icheckbox_flat-green" :class="{ checked : question.correct_answer=='D'}">
            <input type="radio" name="correct_answer" class="flat" value="D" />
            <ins class="iCheck-helper" @click="chooseCorrectAnswer('D')"></ins>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "Question",
  components: {},
  props: ["item"],
  data() {
    return {
      question: {
        no: "",
        content: "",
        audio: null,
        image: null,
        answer_A: "",
        answer_B: "",
        answer_C: "",
        answer_D: "",
        correct_answer: ""
      }
    };
  },
  methods: {
    chooseImage() {
      this.$refs.questionImage.click();
    },
    changeImage() {
      this.question.image = this.$refs.questionImage.files[0];
    },
    chooseAudio() {
      this.$refs.questionAudio.click();
    },
    changeAudio() {
      this.question.audio = this.$refs.questionAudio.files[0];
    },
    chooseCorrectAnswer(answer) {
      this.question.correct_answer = answer;
    }
  }
};
</script>

<style scoped>
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