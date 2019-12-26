<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Danh sách
          <small>Thành viên</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link" href="/management/users/create">
              <button type="submit" class="btn btn-success">Thêm thành viên</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="users.data">
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
                <a :href="'/management/users/detail/' + user.id" class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a @click="deleteUser(user.id)" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getUsers"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ConfirmDelete v-if="modalOpen==true" @onClose="modalOpen=false" @accept="deleteApi"></ConfirmDelete>
  </div>
</template>

<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
import FormSearch from "@/components/elements/FormSearch";
import ConfirmDelete from "@/components/elements/ConfirmDelete";
export default {
  name: "ListUsers",
  components: {
    Breadcrumb,
    FormSearch,
    ConfirmDelete
  },
  data() {
    return {
      users: {
        data: [],
        last_page: 0
      },
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Quản lý thành viên",
          link: "/"
        },
        {
          title: "Danh sách thành viên",
          link: "/"
        }
      ],
      title: "Quản lý thành viên",
      keyword: "",
      modalOpen: false,
      selectedUser: 0
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers(page = 1) {
      request({
        url: "/backend/users/list?page=" + page+ '&keyword=' +this.keyword,
        method: "get"
      })
        .then(res => {
          this.users = res.data.result_data;
          console.log(res);
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    search(keyword) {
      this.keyword = keyword
      this.getUsers(1);
    },
    deleteUser(userId) {
      this.modalOpen = true;
      this.selectedUser = userId;
    },
    closeModal() {
      this.modalOpen = false;
    },
    deleteApi() {
      this.closeModal()
      let data = {
        id: this.selectedUser
      };
      request({
        url: "/backend/users/delete",
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data.result_data);
          this.successAlert();
          this.getUsers()
        })
        .catch(err => {
          console.log(err.res);
          this.errorAlert();
        });
    },
    successAlert() {
      this.$swal.fire({
        position: "top",
        type: "success",
        title: "User has been deteled!",
        width: 600,
        padding: "3em"
      });
    },
    errorAlert() {
      this.$swal.fire({
        position: "top",
        type: "error",
        title: "Delete failed!",
        width: 600,
        padding: "3em"
      });
    }
  },
  computed: {
    pageCount() {
      return this.users.last_page;
    }
  }
};
</script>