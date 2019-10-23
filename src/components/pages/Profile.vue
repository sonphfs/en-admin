<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>
            My Profile
            <small></small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li>
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </li>
            <li class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <i class="fa fa-wrench"></i>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li>
                  <a href="#">Settings 1</a>
                </li>
                <li>
                  <a href="#">Settings 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a class="close-link">
                <i class="fa fa-close"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" @submit.prevent="updateProfile">
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="username">
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
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="email">
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
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="phone">
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
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="address">
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
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Gender</label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div id="gender" class="btn-group" data-toggle="buttons">
                  <label
                    class="btn btn-default"
                    data-toggle-class="btn-primary"
                    data-toggle-passive-class="btn-default"
                  >
                    <input type="radio" name="gender" value="male" /> &nbsp; Male &nbsp;
                  </label>
                  <label
                    class="btn btn-primary"
                    data-toggle-class="btn-primary"
                    data-toggle-passive-class="btn-default"
                  >
                    <input type="radio" name="gender" value="female" /> Female
                  </label>
                </div>
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                <button type="submit" class="btn btn-success">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: "profile",
  data() {
    return {
      userInfos: {
        email: "",
        username: "",
        phone: "",
        address: ""
      }
    };
  },
  methods: {
      updateProfile() {
      let data = this.userInfos;
      request({
        url: "/user/update-profile",
        method: "post",
        data
      })
        .then(res => {
          if (res.data.result_data == true) {
            alert("Lưu thành công!");
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err.res);
        });
    }
  }
  ,
  created() {
    request({
      url: "/user/infos",
      method: "get"
    })
      .then(res => {
        this.userInfos = res.data.result_data;
      })
      .catch({});
  }
};
</script>