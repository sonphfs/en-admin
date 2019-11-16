<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
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
          <small>Examinations</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link" href="/management/examinations/create">
              <button type="submit" class="btn btn-success">Create new Examination</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <p class="text-muted font-13 m-b-30"></p>
        <table id="datatable-buttons" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created at</th>
              <th>#Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(examination, index) in examinations">
              <td>{{index}}</td>
              <td>{{ examination.code }}</td>
              <td>{{examination.title}}</td>
              <td>{{examination.examination_type.name}}</td>
              <td>{{examination.description}}</td>
              <td>{{ getStatus(examination.status) }}</td>
              <td>{{examination.created_at}}</td>
              <td>
                <a :href="'/management/examinations/detail/' + examination.code" class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a :href="'/management/examinations/edit/' + examination.code" class="btn btn-info btn-xs">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a href="#" class="btn btn-success btn-xs" @click="updateStatus(1, examination.code)" v-if="examination.status == 0">
                  <i class="fa fa-arrow-circle-up"></i> Publish
                </a>
                <a href="#" class="btn btn-warning btn-xs" @click="updateStatus(0, examination.code)" v-if="examination.status == 1">
                  <i class="fa fa-arrow-circle-up"></i> UnActive
                </a>
                <a href="#" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "ListExaminations",
  components: {
    Breadcrumb
  },
  data() {
    return {
      examinations: [],
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
          title: "List examinations",
          link: "/"
        }
      ],
      status: {
        0: "SPENDING",
        1: "ACTIVE"
      }
    };
  },
  created() {
    request({
      url: "/backend/examinations/list",
      method: "get"
    })
      .then(res => {
        this.examinations = res.data.result_data;
      })
      .catch(err => {
        console.log(err.res);
      });
  },
  methods: {
    getStatus(status) {
      return status == 1 ? "ACTIVE": "SPENDING"
    },
    updateStatus(status, code) {
      let flag = confirm(" Are you sure change status examination!");
      if (flag == true) {
        this.update(status, code);
      }
    },
    update(status, code) {
      let data = {
        status: status
      };
      request({
        url: "backend/examinations/publish/" + code,
        method: "post",
        data
      })
        .then(res => {
          console.log(res)
          let data = res.data.result_data
          if(data.updated == true) {
            if(data.status == 1) {
                alert('Examination has been actived!')
            }else {
                alert('Examination has been unactived!')
            }
          }
        })
        .catch(err => {
          console.log(err.res);
        });
    }
  }
};
</script>