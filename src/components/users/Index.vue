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
        <SortedTable :values="users">
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
                <SortLink name="phone">Phone</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="address">Address</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="updated_at">Updated at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(user, index) in sort.values" :key="user.id">
              <td>{{user.id}}</td>
              <td>{{user.username}}</td>
              <td>{{user.email}}</td>
              <td>{{user.phone}}</td>
              <td>{{user.address}}</td>
              <td>{{user.created_at}}</td>
              <td>{{user.updated_at}}</td>
              <td>
                <a href="/management/learning_words/detail" class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a href="/management/learning_words/edit" class="btn btn-info btn-xs">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a href="#" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="5"
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
export default {
  name: "ListUsers",
  components: {
    Breadcrumb
  },
  data() {
    return {
      users: [],
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Users management",
          link: "/"
        },
        {
          title: "List users",
          link: "/"
        }
      ]
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