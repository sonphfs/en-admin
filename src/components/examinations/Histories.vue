<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Danh sách
          <small>Kết quả</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="examHistories.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="username">Username</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="email">Email</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="code">Code</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="type">Type</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="title">Title</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="status">Score</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(item, index) in sort.values" :key="item.id">
              <td>{{++index}}</td>
              <td>{{item.user.username}}</td>
              <td>{{item.user.email}}</td>
              <td>{{item.examination.code}}</td>
              <td>{{item.examination.examination_type.name}}</td>

              <td>{{getTitleExam(item)}}</td>
              <td>{{getScore(item)}}</td>
              <td>{{item.created_at}}</td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getExamHistories"
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
  name: "ListExaminations",
  components: {
    Breadcrumb,
    FormSearch
  },
  data() {
    return {
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
          title: "Lịch sử bài thi",
          link: "/"
        }
      ],
      title: "Lịch sử bài thi",
      examHistories: {
        data: [],
        last_page: 0
      }
    };
  },
  created() {
    this.getExamHistories();
  },
  methods: {
    getExamHistories(page = 1) {
      request({
        url:
          "/backend/examinations/histories?page=" +
          page +
          "&keyword=" +
          this.keyword,
        method: "get"
      })
        .then(res => {
          this.examHistories = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    search(keyword) {
      this.keyword = keyword;
      this.getExaminations();
    },
    getTitleExam(exam) {
      if (exam.examination.subject_id != null) {
        return exam.examination.subject.name;
      }
      if (exam.lesson_id != null) {
        return exam.examination.lesson.name;
      }
      return exam.examination.title;
    },
    getExamTypeName(exam) {},
    getScore(exam){
        if(exam.examination.type == 2 || exam.examination.type == 3) {
            return exam.total_score
        }else {
            return exam.total_score + "%"
        }
    }
  },
  computed: {
    pageCount() {
      return this.examHistories.last_page;
    }
  }
};
</script>