<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 7</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <NewParagraph
          v-for="(item, index) in questions"
          :key="index"
          :item="item"
          @delete-p="deleteParagraph(item, index)"
        ></NewParagraph>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button class="btn btn-success" @click="addParagraph">Thêm đoạn văn</button>
            <button class="btn btn-primary" @click="updateData">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewParagraph from "@/components/elements/NewParagraph.vue";
import { VueEditor } from "vue2-editor";
import Breadcrumb from "@/components/elements/Breadcrumb";
import request from "@/utils/request";
export default {
  name: "Part6",
  components: {
    NewParagraph,
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
          title: "Part 7",
          link: "/"
        }
      ],
      questions: [],
      test: [],
      part: []
    };
  },
  methods: {
    addParagraph() {
      this.questions.push({
        isParent: true,
        part: 7,
        paragraph: "",
        content: "",
        questions: []
      });
    },
    deleteParagraph(item, index) {
      console.log(item);
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
          this.questions.splice(index, 1);
          this.question = this.getPartData();
          this.successAlert("Xóa câu hỏi thành công!");
        })
        .catch(err => {
          console.log(err.res);
          this.errorAlert("Lỗi xóa câu hỏi!");
        });
    },
    updateData() {
      let data = {
        questions: this.questions,
        code: this.$route.params.code,
        part: 7
      };
      request({
        url: "backend/examinations/update-part",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.getPartData();
          this.successAlert("Cập nhật dữ liệu thành công!");
        })
        .catch(err => {
          console.log(err.res);
          this.errorAlert("Cập nhật dữ liệu thất bại!");
        });
    },
    getPartData() {
      request({
        url:
          "/backend/examinations/questions/" + this.$route.params.code + "/7",
        method: "get"
      })
        .then(res => {
          console.log(res.data.result_data);
          let data = res.data.result_data;
          this.part = Object.keys(data).map(i => data[i]);
          this.formatData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatData() {
      let tmp = this.part;
      let formatData = tmp.filter(e => {
        if (e.paragraph != null) {
          e.questions = []
          e.isParent= true
          return e;
        }
      });
      console.log(formatData);

      formatData.forEach(parent => {
        tmp.filter(e => {
          if (e.parent_id == parent.id) {
            parent.questions.push(e);
          }
        });
      });
      this.questions = formatData;
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
    this.getPartData();
  }
};
</script>

<style scoped>
</style>