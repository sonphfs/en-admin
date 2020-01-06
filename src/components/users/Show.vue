<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <Breadcrumb :breads="breads"></Breadcrumb>
      <div class="x_panel">
        <div class="x_title">
          <h2>
            Thông tin thành viên
            <small></small>
          </h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div class="col-md-2 col-sm-2 col-xs-12 profile_left">
            <div class="profile_img">
              <div id="crop-avatar">
                <!-- Current avatar -->
                <img
                  class="img-responsive avatar-view"
                  :src="serverUri + userInfos.avatar"
                  alt="Avatar"
                  title="Change the avatar"
                  width="300"
                  height="300"
                />
              </div>
            </div>
          </div>
          <div class="col-md-8 col-sm-8 col-xs-12">
            <br />
            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">
              <div class="form-group">
                <label class="control-label col-md-2 col-sm-2 col-xs-12" for="username">
                  Username
                  <span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input
                    type="text"
                    id="username"
                    required="required"
                    class="form-control col-md-7 col-xs-12"
                    v-model="userInfos.username"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-sm-2 col-xs-12" for="email">
                  Email
                  <span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required="required"
                    class="form-control col-md-7 col-xs-12"
                    v-model="userInfos.email"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-sm-2 col-xs-12" for="phone">
                  Phone
                  <span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required="required"
                    class="form-control col-md-7 col-xs-12"
                    v-model="userInfos.phone"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-sm-2 col-xs-12" for="address">
                  Address
                  <span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required="required"
                    class="form-control col-md-7 col-xs-12"
                    v-model="userInfos.address"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-sm-2 col-xs-12" for="dateofbirth">
                  Date of Birth
                  <span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input
                    type="text"
                    id="dateofbirth"
                    name="dateofbirth"
                    required="required"
                    class="form-control col-md-7 col-xs-12"
                    v-model="userInfos.birthday"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "profile",
  components: {
    Breadcrumb
  },
  data() {
    return {
      userInfos: {
        email: "",
        username: "",
        phone: "",
        address: "",
        birthday: "",
        gender: 1,
        avatar: ""
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
          title: "Thông tin thành viên",
          link: "/"
        }
      ],
      serverUri: process.env.VUE_APP_BASE_SERVER_URL
    };
  },
  created() {
    request({
      url: "/backend/users/show/" + this.$route.params.id,
      method: "get"
    })
      .then(res => {
        this.userInfos = res.data.result_data;
      })
      .catch({});
  }
};
</script>

<style scoped>
input.form-control {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
</style>