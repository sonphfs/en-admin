<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>
    <div class="x_panel">
      <div class="x_title">
        <h2>Liên hệ</h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="contacts.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">#</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="first_name">First name</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="last_name">Last Name</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="email">Email</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="subject">Subject</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="body">Body</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="flag">Status</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="updated_at">Updated at</SortLink>
              </th>
              
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="">Action</SortLink>
              </th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(item, index) in sort.values" :key="index">
              <td>{{index}}</td>
              <td>{{item.first_name}}</td>
              <td>{{item.last_name}}</td>
              <td>{{item.email}}</td>
              <td>{{item.subject}}</td>
              <td>{{item.body}}</td>
              <td v-html="getStatus(item.flag)"></td>
              <td>{{item.updated_at}}</td>
              <td>
                <a @click="updateContact(item.id)" class="btn btn-primary btn-xs" v-if="item.flag != 1">
                  <i class="fa fa-edit"></i>Update status
                </a>
                <a @click="deleteContact(item.id)" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getContactList"
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
import {successAlert, errorAlert, deleteSuccess, deleteFailed} from "@/utils/alert"
export default {
  name: "ContactList",
  components: {
    FormSearch,
    Breadcrumb
  },
  data() {
    return {
      contacts: {
        data: [],
        last_page: 0
      },
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Quản lý liên hệ",
          link: "/"
        },
        {
          title: "Liên hệ",
          link: "/"
        }
      ],
      title: "Danh sách liên hệ",
      keyword: ""
    };
  },
  methods: {
    getContactList(page) {
      request({
        url: "/backend/contacts/list?page=" + page + "&keyword=" + this.keyword,
        method: "get"
      }).then(res => {
        this.contacts = res.data.result_data;
      });
    },
    deleteContact(id) {
      let data = {
        id: id
      };
      request({
        url: "/backend/contacts/delete",
        method: "post",
        data
      })
        .then(res => {
          if (res.data.result_data.deleted_at) {
            deleteSuccess()
            this.getContactList(1);
          }
        })
        .catch(err => {
          deleteFailed()
        });
    },
    updateContact(id) {
      request({
        url: "/backend/contacts/update/" + id,
        method: "post",
      })
        .then(res => {
          if (res.data.result_data.updated == 1) {
            successAlert("Contact status has been updated!")
            this.getContactList(1);
          }
        })
        .catch(err => {
          errorAlert()
        });
    },
    search(keyword) {
      this.keyword = keyword
      this.getContactList(1);
    },
    getStatus(flag) {
      if(flag === 1) {
          return '<button type="button" class="btn btn-success btn-xs">Replied</button>'
      }
      if(flag === 0){
        return '<button type="button" class="btn btn-danger btn-xs">New</button>'
      }
    }
  },
  created() {
    this.getContactList();
  },
  computed: {
    pageCount() {
      return this.contacts.last_page;
    }
  }
};
</script>