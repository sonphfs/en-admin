<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 6</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <NewParagraph v-for="item in questions" :item="item"></NewParagraph>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button class="btn btn-success" @click="addParagraph">Add Paragraph</button>
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
import request from "@/utils/request"
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
          title: "Examinations management",
          link: "/"
        },
        {
          title: "Edit examinations",
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
      this.questions.push({ isParent: true, part: 6, paragraph: "", content: "" , questions: []});
    },
    updateData() {
      let data = {
        questions: this.questions,
        code: this.$route.params.code,
        part: 6
      };
      request({
        url: "backend/examinations/update-part",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.this.getPartData()
          this.successAlert();
        })
        .catch(err => {
          console.log(err.res);
          this.errorAlert();
        });
    },
    getPartData() {
      request({
        url:
          "/backend/examinations/questions/" +
          this.$route.params.code +
          "/6",
        method: "get"
      })
        .then(res => {
          console.log(res.data.result_data);
          let data = res.data.result_data 
          this.part = Object.keys(data).map(i => data[i]);
          this.formatData()
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatData() {
      let tmp = this.part
        let formatData = tmp.filter(e => {
            if(e.paragraph != null) {
              e.questions = []
              return e
            } 
        })
        console.log(formatData)

        formatData.forEach(parent => {
          tmp.filter(e => {
            if(e.parent_id == parent.id) {
              parent.questions.push(e)
            }
          })
        })
        this.questions = formatData
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
  created(){
    this.getPartData()
  }
};
</script>

<style scoped>
</style>