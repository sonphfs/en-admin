<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 5</h2>
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
              :disabled="questionCount >=30"
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
  name: "Part5",
  components: {
    Question,
    ModalConfirm,
    Breadcrumb
  },
  data() {
    return {
      paragraph: "",
      questionCount: 0,
      maxQuestionCount: 10,
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
          title: "Examinations management",
          link: "/"
        },
        {
          title: "Edit examinations",
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
      })
        .then(res => {
          console.log(res.data.result_data);
          this.questions.splice(index, 1);
          this.questions = this.getPart1()
          this.successAlert("Xóa câu hỏi thành công!");
        })
        .catch(err => {
          console.log(err.res);
          this.successAlert("Lỗi xóa câu hỏi!");
        });
    },
    changeAudio() {},
    async addQuestion() {
      if (this.questionCount < 30) {
        this.questions.push(
          Object.assign({ no: null, part: 5 }, this.questionDataSeed)
        );
      }
    },
    addExample() {
      this.questions.push(
        Object.assign({ no: 0, part: 5 }, this.questionDataSeed)
      );
    },
    getPart1() {
      request({
        url:
          "/backend/examinations/questions/" + this.$route.params.code + "/5",
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
        part: 5
      };
      request({
        url: "backend/examinations/update-part",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.modalHidden = true;
          this.successAlert("Dữ liệu đã được cập nhật!");
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
    this.getPart1();
  }
};
</script>

<style scoped>
</style>