<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <Breadcrumb :breads="breads"></Breadcrumb>

      <div class="x_panel">
        <div class="x_title">
          <h2>Thêm thành viên</h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <form class="form-horizontal form-label-left" novalidate>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">
                Username
                <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input
                  id="name"
                  class="form-control col-md-7 col-xs-12"
                  data-validate-length-range="6"
                  data-validate-words="2"
                  name="name"
                  placeholder
                  required="required"
                  type="text"
                  v-model="user.username"
                />
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="email">
                Email
                <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required="required"
                  class="form-control col-md-7 col-xs-12"
                  v-model="user.email"
                />
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="email">
                Confirm Email
                <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="email"
                  id="email2"
                  name="confirm_email"
                  data-validate-linked="email"
                  required="required"
                  class="form-control col-md-7 col-xs-12"
                  v-model="user.confirm_email"
                />
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">
                Phone
                <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="tel"
                  id="telephone"
                  name="phone"
                  required="required"
                  data-validate-length-range="8,20"
                  class="form-control col-md-7 col-xs-12"
                  v-model="user.phone"
                />
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">
                Address
                <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="tel"
                  id="telephone"
                  name="phone"
                  required="required"
                  data-validate-length-range="8,20"
                  class="form-control col-md-7 col-xs-12"
                  v-model="user.address"
                />
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">
                Date of Birth
                <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="date"
                  id="telephone"
                  name="phone"
                  required="required"
                  data-validate-length-range="8,20"
                  class="form-control col-md-7 col-xs-12"
                  v-model="user.birthday"
                />
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-6 col-md-offset-3">
                <a href="/management/users/list">
                  <button type="button" class="btn btn-primary">Cancel</button>
                </a>
                <button type="button" @click="confirmCreateUser" class="btn btn-success">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import Swal from "sweetalert2";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "FormCreateUser",
  components: {
    Breadcrumb
  },
  data() {
    return {
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
          title: "Thành viên mới",
          link: "/"
        }
      ],
      user: {
        email: "",
        username: "",
        phone: "",
        address: "",
        birthday: "",
        confirm_email: ""
      }
    };
  },
  methods: {
    createUser() {
      let data = this.user;
      request({
        url: "/backend/users/create",
        method: "post",
        data
      })
        .then(res => {
          this.$swal.fire("Created!", "Thành viên đã được tạo thành công!", "success");
          this.$router.push("/management/users/list");
        })
        .catch(err => {
          this.$swal.fire("Failed!", "Thành viên được tạo không thành công!.", "error");
        });
    },
    confirmCreateUser() {
      this.$swal
        .fire({
          title: "Thêm thành viên mới?",
          text: "Thêm thành viên mới với các thông tin dưới!",
          type: "warning",
          position: "top",
          showCancelButton: true,
          width: 600,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tạo mới"
        })
        .then(result => {
          if (result.value) {
            this.createUser();
          }
        })
        .catch(err => {});
    }
  }
};
</script>