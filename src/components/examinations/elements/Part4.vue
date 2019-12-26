<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 4</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br />
        <Question v-for="item in questions" :item="item" v-if="item.no != 0"></Question>
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
  name: "Part1",
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
        }
        ,
        {
          title: "Chỉnh sửa",
          link: "/"
        }
        ,
        {
          title: "Part 4",
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
    async addQuestion() {
      if (this.questionCount < 30) {
        this.questions.push(Object.assign({no: null, part: 4 }, this.questionDataSeed));
      }
    },
    addExample() {
      this.questions.push(Object.assign({ no: 0, part: 4 }, this.questionDataSeed));
    },
    getPart1() {
      request({
        url:
          "/backend/examinations/questions/" +
          this.$route.params.code +
          "/4",
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
        part: 4
      };
      request({
        url: "backend/examinations/update-part",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.modalHidden = true;
          this.successAlert();
        })
        .catch(err => {
          console.log(err.res);
          this.modalHidden = true;
          this.errorAlert();
        });
    },
    confirmModal() {
      this.modalHidden = false;
    },
    successAlert() {
      this.$swal.fire({
        position: "top",
        type: "success",
        title: "Data has been updated!",
        width: 600,
        padding: "3em"
      });
    },
    errorAlert() {
      this.$swal.fire({
        position: "top",
        type: "error",
        title: "Update data failed!",
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