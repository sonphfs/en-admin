<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>

    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Questions</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>Unit</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <multiselect
                  v-model="unitSelected"
                  :options="units"
                  placeholder="Select one"
                  label="name"
                  track-by="name"
                  @select="changeUnitSelected"
                ></multiselect>
              </div>
            </a>
          </li>
          <li>Lesson</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <multiselect
                  v-model="lessonSelected"
                  :options="lessons"
                  placeholder="Select one"
                  label="title"
                  track-by="title"
                  @select="changeLessonSelected"
                ></multiselect>
              </div>
            </a>
          </li>
          <li>Subject</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <multiselect
                  v-model="subjectSelected"
                  :options="subjects"
                  placeholder="Select one"
                  label="name"
                  track-by="name"
                  @select="changeSubjectSelected"
                ></multiselect>
              </div>
            </a>
          </li>
          <li>Word</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <multiselect
                  v-model="learningWordSelected"
                  :options="learning_words"
                  placeholder="Select one"
                  label="word"
                  track-by="word"
                  @select="changeWordSelected"
                ></multiselect>
              </div>
            </a>
          </li>
          <li>
            <a class="collapse-link">
              <button
                type="submit"
                class="btn btn-success"
                @click="modalOpen=true"
              >Create new Question</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <p class="text-muted font-13 m-b-30"></p>
        <SortedTable :values="questions.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="code">Code</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="content">Content</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="answer_A">Answer A</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="answer_B">Answer B</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="answer_C">Answer C</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="answer_D">Answer D</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="correct_answer">Correct Answer</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(question, index) in sort.values" :key="question.id">
              <td>{{question.id}}</td>
              <td>{{question.code}}</td>
              <td>{{question.content}}</td>
              <td>{{question.answer_A}}</td>
              <td>{{question.answer_B}}</td>
              <td>{{question.answer_C}}</td>
              <td>{{question.answer_D}}</td>
              <td>{{question.correct_answer}}</td>
              <td>{{question.created_at}}</td>
              <td>
                <a class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a class="btn btn-info btn-xs">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getQuestions"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ModalForm v-if="modalOpen==true" @onClose="modalOpen=false"></ModalForm>
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
import FormSearch from "@/components/elements/FormSearch";
import ModalForm from "@/components/questions/ModalForm";
import Multiselect from "vue-multiselect";
export default {
  name: "ListQuestions",
  components: {
    Breadcrumb,
    FormSearch,
    ModalForm,
    Multiselect
  },
  data() {
    return {
      questions: {
        last_page: 0,
        data: []
      },
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Questions management",
          link: "/"
        },
        {
          title: "List questions",
          link: "/"
        }
      ],
      title: "",
      keyword: "",
      modalOpen: false,
      units: [],
      lessons: [],
      subjects: [],
      learning_words: [],
      unitSelected: null,
      lessonSelected: null,
      subjectSelected: null,
      learningWordSelected: null
    };
  },
  methods: {
    search(keyword) {
      this.keyword = keyword;
      this.getQuestions();
    },
    getQuestions(page = 1) {
      let baseUrl = "/backend/questions/list?page=" + page + "&keyword=" + this.keyword
      if(this.learningWordSelected != null) {
        baseUrl += "&word_id=" + this.learningWordSelected.id
      }
      if(this.lessonSelected != null) {
        baseUrl += "&lesson_id="+ this.lessonSelected.id
      }
      request({
        url: baseUrl,
        method: "get"
      })
        .then(res => {
          this.questions = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    getUnits() {
      request({
        url: "/backend/units/all",
        method: "get"
      })
        .then(res => {
          let data = res.data.result_data;
          this.units = data.filter(e => e.parent_id == 0);
        })
        .catch(err => {});
    },
    getLessons() {
      request({
        url: "/backend/lessons/list-by-unit-id/" + this.unitSelected.id,
        method: "get"
      })
        .then(res => {
          this.lessons = res.data.result_data;
        })
        .catch(err => {});
    },
    getSubjects() {
      request({
        url: "/backend/subjects/all",
        method: "get"
      })
        .then(res => {
          this.subjects = res.data.result_data;
        })
        .catch(err => {});
    },
    getLearningWords() {
      request({
        url:
          "/backend/learning_words/list-by-subject-id/" +
          this.subjectSelected.id,
        method: "get"
      })
        .then(res => {
          console.log(res)
          this.learning_words = res.data.result_data;
        })
        .catch(err => {});
    },
    changeUnitSelected() {
      this.subjectSelected = null;
      this.learningWordSelected = null;
      this.getLessons();
    },
    changeLessonSelected() {
      this.getQuestions()
    },
    changeSubjectSelected() {
      this.unitSelected = null;
      this.lessonSelected = null;
      this.getLearningWords();
    },
    changeWordSelected() {
      this.getQuestions()
    }
  },
  created() {
    this.getQuestions();
    this.getUnits();
    this.getSubjects();
  },
  computed: {
    pageCount() {
      return this.questions.last_page;
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
li.multiselect__element span span {
  color: #000 !important;
}
</style>