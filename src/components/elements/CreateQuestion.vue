<template>
  <div class="row">
    <div class="form-horizontal form-label-left col-md-8">
      <div class="form-group" v-if="item.no !== 0">
        <label class="control-label col-md-3 col-sm-3 col-xs-12">No</label>
        <div class="col-md-5 col-sm-5 col-xs-12">
          <input
            type="number"
            class="form-control"
            v-model="question.no"
            min="0"
            max="200"
            required
          />
        </div>
      </div>
      <div class="form-group" v-if="item.no === 0">
        <label class="control-label col-md-3 col-sm-3 col-xs-12">Example</label>
        <div class="col-md-5 col-sm-5 col-xs-12"></div>
      </div>
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
      <hr />
    </div>
    <div class="col-md-4">
      <div class="item form-group" v-if="question.part == 1">
        <div class="x_content">
          <span>Click here to upload image</span>
          <form
            action="form_upload.html"
            class="dropzone dz-clickable"
            @click="chooseImage()"
            style="min-height: 200px;"
          >
            <div class="dz-default dz-message">
              <img
                src="http://www.flyhigh.edu.vn/uploads/imgBaiViet/061-1477292327.jpg"
                alt="click to upload"
                width="300px" height="auto"
              />
            </div>
          </form>
        </div>
      </div>
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
</template>

<script>
export default {
  name: "CreateQuestion",
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
    chooseCorrectAnswer(answer) {
      console.log(answer);
      this.question.correct_answer = answer;
    }
  },
  created() {
    if (this.item) {
      this.question = this.item;
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