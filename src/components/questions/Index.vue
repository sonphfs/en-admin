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
                <select class="form-control">
                  <option>Choose option</option>
                  <option>Option one</option>
                </select>
              </div>
            </a>
          </li>
          <li>Lesson</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <select class="form-control">
                  <option>Choose option</option>
                  <option>Option one</option>
                </select>
              </div>
            </a>
          </li>
          <li>Subject</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <select class="form-control">
                  <option>Choose option</option>
                  <option>Option one</option>
                </select>
              </div>
            </a>
          </li>
          <li>Word</li>
          <li>
            <a class="collapse-link">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <select class="form-control">
                  <option>Choose option</option>
                  <option>Option one</option>
                </select>
              </div>
            </a>
          </li>
          <li>
            <a class="collapse-link">
              <button type="submit" class="btn btn-success">Create new Question</button>
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
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
import FormSearch from "@/components/elements/FormSearch";
export default {
  name: "ListQuestions",
  components: {
    Breadcrumb,
    FormSearch
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
      keyword: ""
    };
  },
  methods: {
    search(keyword) {
      this.keyword = keyword;
      this.getQuestions();
    },
    getQuestions(page = 1) {
      request({
        url:
          "/backend/questions/list?page=" + page + "&keyword=" + this.keyword,
        method: "get"
      })
        .then(res => {
          this.questions = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    }
  },
  created() {
    this.getQuestions();
  },
  computed: {
    pageCount() {
      return this.questions.last_page;
    }
  }
};
</script>