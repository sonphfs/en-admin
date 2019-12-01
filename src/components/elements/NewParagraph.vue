<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <div class="row">
          <div class="form-horizontal form-label-left col-md-8">
            <div class="form-group">
              <label class="control-label col-md-1 col-sm-1 col-xs-12">Content</label>
              <div class="col-md-5 col-sm-5 col-xs-12">
                <input
                  class="form-control"
                  v-model="bigQuestion.content"
                  placeholder="Questions 153-154 refer to the following e-mail."
                  required
                />
              </div>
            </div>
            <VueEditor v-model="bigQuestion.paragraph"></VueEditor>
            <hr />
            <Question v-for="item in bigQuestion.questions" :item="item"></Question>
            <div class="form-group">
              <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                <button class="btn btn-primary" @click="addQuestion">Add Question for this paragraph</button>
              </div>
            </div>
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
  name: "NewParagraph",
  components: {
    Question,
    VueEditor,
    Breadcrumb
  },
  props: ["item"],
  data() {
    return {
      hasExample: false,
      questionCount: 0,
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
      questionDataSeed: {
        content: "Dít is noi dung question?",
        audio: null,
        image: null,
        answer_A: "Đáp án A",
        answer_B: "Đáp án D",
        answer_C: "Đáp án C",
        answer_D: "Đáp án B",
        correct_answer: "A"
      },
      bigQuestion: {
        content: "",
        paragraph: "",
        questions: []
      }
    };
  },
  methods: {
    addQuestion() {
      if (this.questionCount < 5) {
        this.questionCount++;
        this.bigQuestion.questions.push(
          Object.assign({ no: null}, this.questionDataSeed)
        );
      }
    }
  },
  created(){
    if (this.item !== undefined) {
      this.bigQuestion = this.item;
    }
  }
};
</script>

<style scoped>
.x_title{
  border-bottom: 0px;
}
</style>