<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 3</h2>
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
        <Question
          v-for="item in questions"
          :item="item"
          v-if="item.no == 0"
          :example="hasExample = true"
        ></Question>
        <Question v-for="item in questions" :item="item" v-if="item.no != 0"></Question>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button class="btn btn-success" :disabled="hasExample" @click="addExample()">Add Example</button>
            <button
              class="btn btn-success"
              :disabled="questionCount == maxQuestionCount"
              @click="addQuestion()"
            >Add Question</button>
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
      maxQuestionCount: 10,
      hasExample: false,
      questions: [],
      modalHidden: true,
      modalData: {
        title: "Confirming!",
        message: "Are you sure update data!"
      },
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
    changeAudio() {},
    async addQuestion() {
      this.questionCount = this.questions.length - this.hasExample;
      if (this.questionCount < 10) {
        this.questions.push(Object.assign({no: null, part: 3 }, this.questionDataSeed));
      }
    },
    addExample() {
      this.questions.push(Object.assign({ no: 0, part: 3 }, this.questionDataSeed));
    },
    getPart1() {
      request({
        url:
          "/backend/examinations/questions/" +
          this.$route.params.code +
          "/3",
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
        part: 3
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