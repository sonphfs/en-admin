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
    <ModalConfirm v-if="!modalHidden" :modalData="modalData" @accept="updateData" @onClose="modalHidden=true"></ModalConfirm>
  </div>
</template>

<script>
import request from "@/utils/request";
import Question from "@/components/elements/CreateQuestion.vue";
import ModalConfirm from "@/components/elements/ModalConfirm.vue";
export default {
  name: "Part1",
  components: {
    Question,
    ModalConfirm
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
      }
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
        this.questions.push({ part: 1 });
      }
    },
    addExample() {
      this.questions.push({ no: 0, part: 1 });
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
          console.log(res.data.result_data);
          let data = res.data.result_data;
          this.questions = Object.keys(data).map(i => data[i])
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
        part: this.$route.params.part
      };
      request({
        url: "backend/examinations/update-part",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    confirmModal() {
      this.modalHidden = false
    },
  },
  created() {
    this.getPart1();
  }
};
</script>

<style scoped>
</style>