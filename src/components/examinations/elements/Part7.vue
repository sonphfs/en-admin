<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 7</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br />
        <Question v-for="i in questionCount"></Question>
        <VueEditor v-model="paragraph"></VueEditor>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button class="btn btn-primary" @click="addQuestion">Add Question</button>
            <button class="btn btn-success">Add Paragraph</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "@/components/elements/CreateQuestion.vue";
import { VueEditor } from "vue2-editor";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "Part1",
  components: {
    Question,
    VueEditor,
    Breadcrumb
  },
  data() {
    return {
      paragraph: "",
      questionCount: 0,
      maxQuestionCount: 10,
      hasExample: false,
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Examinations management",
          link: "/"
        },
        {
          title: "Edit examinations",
          link: "/"
        }
      ],
      questions: [],
      questionDataSeed: {
        content: "Dít is noi dung question?",
        audio: null,
        image: null,
        answer_A: "Đáp án A",
        answer_B: "Đáp án D",
        answer_C: "Đáp án C",
        answer_D: "Đáp án B",
        correct_answer: "A"
      }
    };
  },
  methods: {
    addQuestion() {
      this.questionCount = this.questions.length - this.hasExample;
      if (this.questionCount < 10) {
        this.questions.push(
          Object.assign({ no: null, part: 1 }, this.questionDataSeed)
        );
      }
    }
  }
};
</script>

<style scoped>
</style>