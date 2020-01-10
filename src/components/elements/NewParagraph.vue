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
              <div class="col-md-1 col-sm-1 col-md-offset-5 col-xs-12">
                <button type="button" class="btn btn-danger" @click="deleteParagraph">Xóa</button>
              </div>
            </div>
            <VueEditor v-model="bigQuestion.paragraph"></VueEditor>
            <hr />
            <Question
              v-if="qs"
              v-for="(item, index) in qs"
              :item="item"
              :key="index"
              @delete-row="deleteThisQuestion(item, index)"
            ></Question>
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
import request from "@/utils/request"
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
      },
      qs: []
    };
  },
  methods: {
    addQuestion() {
      this.qs.push(
        Object.assign({ no: null }, this.questionDataSeed)
      );
      this.$set(this.bigQuestion,'questions',this.qs);
    },
    deleteParagraph() {
      return this.$emit("delete-p");
    },
    deleteThisQuestion(item, index) {
      console.log(item)
      let question = item;
      if (question.id == undefined) {
        this.bigQuestion.questions.splice(index, 1);
      } else {
        this.$swal
          .fire({
            title: "Xác nhận?",
            text: "Câu hỏi này sẽ bị xóa?",
            type: "warning",
            position: "top",
            showCancelButton: true,
            width: 600,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa"
          })
          .then(res => {
            if (res.value) {
              this.deleteQuestion(question, index);
            }
          });
      }
    },
    deleteQuestion(question, index) {
      console.log(index);
      let data = {
        id: question.id
      };
      request({
        url: "/backend/questions/delete",
        method: "post",
        data
      })
        .then(res => {
          console.log(this.bigQuestion.questions);
          this.bigQuestion.questions.splice(index, 1);
          this.bigQuestion = this.item;
          this.successAlert("Xóa câu hỏi thành công!");
        })
        .catch(err => {
          console.log(err.res);
          this.errorAlert("Lỗi xóa câu hỏi!");
        });
    },
    successAlert(message) {
      this.$swal.fire({
        position: "top",
        type: "success",
        title: message,
        width: 600,
        padding: "3em"
      });
    },
    errorAlert(message) {
      this.$swal.fire({
        position: "top",
        type: "error",
        title: message,
        width: 600,
        padding: "3em"
      });
    }
  },
  created() {
    if (this.item !== undefined) {
      this.bigQuestion = this.item;
      this.qs = this.item.questions
    }
  }
};
</script>

<style scoped>
.x_title {
  border-bottom: 0px;
}
</style>