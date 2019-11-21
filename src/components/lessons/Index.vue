<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/">Examinations management</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/">List examinations</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="page-title">
      <div class="title_left">
        <h3>Welcome to Your Website!</h3>
      </div>
      <div class="title_right">
        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
          <div class="input-group">
            <input type="text" placeholder="Search for..." class="form-control" />
            <span class="input-group-btn">
              <button type="button" class="btn btn-default">Go!</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Lessons</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link">
              <button type="submit" class="btn btn-success" @click="modalOpen=true">Create new Lesson</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="lessons.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="title">Title</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="image">Image</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="unit.name">Unit</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(lesson, index) in sort.values" :key="lesson.id">
              <td>{{lesson.id}}</td>
              <td>{{lesson.title}}</td>
              <td>{{lesson.image}}</td>
              <td>{{lesson.unit.name}}</td>
              <td>{{lesson.created_at}}</td>
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
          :click-handler="getLessons"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ModalForm  @onClose="modalOpen=false" v-if="modalOpen==true"></ModalForm>
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
import ModalForm from "@/components/lessons/ModalForm";
export default {
  name: "ListLessons",
  components: {
    Breadcrumb,
    ModalForm
  },
  data() {
    return {
      lessons: {
        data: [],
        last_page: 0
      },
      modalOpen: false
    };
  },
  created() {
    this.getLessons()
  },
  methods: {
    getLessons(page=1) {
      request({
      url: "/backend/lessons/list?page=" + page,
      method: "get"
    })
      .then(res => {
        this.lessons = res.data.result_data;
      })
      .catch(err => {
        console.log(err.res);
      });
    }
  },
  computed: {
     pageCount() {
       return this.lessons.last_page
     }
  }
};
</script>