<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Lịch sử truy cập
        </h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="loginHistories.data">
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
                <SortLink name="phone">Ip address</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="address">Device</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Time</SortLink>
              </th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(item, index) in sort.values" :key="index">
              <td>{{++index}}</td>
              <td>{{item.username}}</td>
              <td>{{item.email}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.ip_address}}</td>
              <td>{{item.device}}</td>
              <td>{{item.created_at}}</td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getLoginHistories"
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
  name: "ListUsers",
  components: {
    Breadcrumb,
    FormSearch
  },
  data() {
    return {
      loginHistories: {
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
          title: "Lịch sử truy cập",
          link: "/"
        }
      ],
      title: "Quản lý thành viên",
      keyword: "",
    };
  },
  created() {
    this.getLoginHistories();
  },
  methods: {
    getLoginHistories(page = 1) {
      request({
        url: "/backend/users/login-histories?page=" + page+ '&keyword=' +this.keyword,
        method: "get"
      })
        .then(res => {
          this.loginHistories = res.data.result_data;
          console.log(res);
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    search(keyword) {
      this.keyword = keyword
      this.getLoginHistories(1);
    }
  },
  computed: {
    pageCount() {
      return this.loginHistories.last_page;
    }
  }
};
</script>