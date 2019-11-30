<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Part 7</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <NewParagraph v-for="item in part7"></NewParagraph>
        <div class="form-group">
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button class="btn btn-success" @click="addParagraph">Add Paragraph</button>
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
export default {
  name: "Part7",
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
      part7: []
    };
  },
  methods: {
    addParagraph() {
      this.part7.push(Object.assign({ part: 7, paragraph: "", content: "" }, {}));
    }
  }
};
</script>

<style scoped>
</style>