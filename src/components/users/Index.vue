<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb></Breadcrumb>
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
          <small>Users</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link" href="/management/users/create">
              <button type="submit" class="btn btn-success">Create new user</button>
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
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>#Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(user, index) in users">
              <td>{{ index }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.address }}</td>
              <td>{{ user.created_at }}</td>
              <td>{{user.updated_at }}</td>
              <td>
                <a href="/management/users/view" class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
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
  name: "ListUsers",
  components: {
    Breadcrumb
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    request({
      url: "/backend/users/list",
      method: "get"
    })
      .then(res => {
        this.users = res.data.result_data;
      })
      .catch(err => {
        console.log(err.res);
      });
  }
};
</script>