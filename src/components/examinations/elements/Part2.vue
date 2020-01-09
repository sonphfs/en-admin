<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 2</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br />
        <Question
          v-for="(item, index) in questions"
          :item="item"
          v-if="item.no != 0"
          @delete-row="deleteThisQuestion(item, index)"
        ></Question>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button
              class="btn btn-success"
              :disabled="questionCount == maxQuestionCount"
              @click="addQuestion()"
            >Thêm câu hỏi</button>
            <button class="btn btn-primary" @click="confirmModal()">Update</button>
          </div>
        </div>
      </div>
    </div>
    <ModalConfirm
      v-if="!modalHidden"
      :modalData="modalData"
      @accept="updateData"
      @onClose="modalHidden=true"
    ></ModalConfirm>
  </div>
</template>

<script>
import request from "@/utils/request";
import Question from "@/components/elements/CreateQuestion.vue";
import ModalConfirm from "@/components/elements/ModalConfirm.vue";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "Part2",
  components: {
    Question,
    ModalConfirm,
    Breadcrumb
  },
  data() {
    return {
      paragraph: "",
      questionCount: 0,
      maxQuestionCount: 30,
      hasExample: false,
      questions: [],
      modalHidden: true,
      modalData: {
        title: "Confirming!",
        message: "Are you sure update data!"
      },
      questionDataSeed: {
        content: "",
        audio: null,
        image: null,
        answer_A: "",
        answer_B: "",
        answer_C: "",
        answer_D: "",
        correct_answer: "A"
      },
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Quản lý bài thi",
          link: "/"
        },
        {
          title: "Bài thi",
          link: "/"
        },
        {
          title: "Chỉnh sửa",
          link: "/"
        },
        {
          title: "Part 2",
          link: "/"
        }
      ]
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
    deleteThisQuestion(item, index) {
      let question = item;
      if (question.id == undefined) {
        this.questions.splice(index, 1);
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
      }).then(res => {
          console.log(res);
          this.questions.splice(index, 1);
          this.questions = this.getPart2();
          this.successAlert("Xóa câu hỏi thành công!");
        }).catch(err => {
          // console.log(err.res);
          this.errorAlert("Lỗi xóa câu hỏi!");
        });
    },
    async addQuestion() {
      if (this.questionCount < 30) {
        this.questions.push(
          Object.assign({ no: null, part: 2 }, this.questionDataSeed)
        );
      }
    },
    addExample() {
      this.questions.push(
        Object.assign({ no: 0, part: 2 }, this.questionDataSeed)
      );
    },
    getPart2() {
      request({
        url:
          "/backend/examinations/questions/" + this.$route.params.code + "/2",
        method: "get"
      })
        .then(res => {
          console.log(res.data.result_data);
          let data = res.data.result_data;
          this.questions = Object.keys(data).map(i => data[i]);
          this.maxQuestionCount -= this.questions.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateData() {
      let data = {
        questions: this.questions,
        code: this.$route.params.code,
        part: 2
      };
      request({
        url: "backend/examinations/update-part",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.modalHidden = true;
          this.successAlert("Data has been updated!");
        })
        .catch(err => {
          console.log(err.res);
          this.modalHidden = true;
          this.errorAlert("Update data failed!");
        });
    },
    confirmModal() {
      this.modalHidden = false;
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
    this.getPart2();
  }
};
</script>

<style scoped>
</style>