<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 1</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link">
              <i class="fa fa-chevron-up"></i>
            </a>
          </li>
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false"
            >
              <i class="fa fa-wrench"></i>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <a href="#">Settings 1</a>
              </li>
              <li>
                <a href="#">Settings 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a class="close-link">
              <i class="fa fa-close"></i>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br />
        <Question v-for="item in questions" :item="item"></Question>
        <Question v-for="i in questionCount"></Question>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button class="btn btn-success" :disabled="hasExample">Add Example</button>
            <button
              class="btn btn-success"
              :disabled="questionCount == maxQuestionCount"
              @click="addQuestion()"
            >Add Question</button>
            <button class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Question from "@/components/elements/CreateQuestion.vue";
export default {
  name: "Part1",
  components: {
    Question
  },
  data() {
    return {
      paragraph: "",
      questionCount: 0,
      maxQuestionCount: 10,
      hasExample: false,
      questions: []
    };
  },
  methods: {
    chooseImage() {
      this.$refs.questionImage.click();
    },
    changeImage() {},
    chooseAudio() {
      this.$refs.questionAudio.click();
    },
    changeAudio() {},
    addQuestion() {
      if (this.questionCount < this.maxQuestionCount) {
        this.questionCount++;
      }
    },
    getPart1() {
      request({
        url:
          "/backend/examinations/questions/" +
          this.$route.params.code +
          "/" +
          this.$route.params.part,
        method: "get"
      })
        .then(res => {
          console.log(res);
          this.questions = res.data.result_data;
          this.maxQuestionCount -= this.questions.length
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getPart1();
  }
};
</script>

<style scoped>
</style>