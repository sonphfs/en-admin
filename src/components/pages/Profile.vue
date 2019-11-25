<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <Breadcrumb></Breadcrumb>
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
          <div class="col-md-2 col-sm-2 col-xs-12 profile_left">
            <div class="profile_img">
              <div id="crop-avatar">
                <!-- Current avatar -->
                <img
                  class="img-responsive avatar-view"
                  :src="'http://localhost:8001/' + userInfos.avatar"
                  alt="Avatar"
                  title="Change the avatar"
                />
              </div>
            </div>
            <h3></h3>
            <a class="btn btn-success">
              <i class="fa fa-upload"></i>&nbsp;&nbsp; Upload avatar
            </a>
            <br />
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <br />
            <form
              id="demo-form2"
              data-parsley-validate
              class="form-horizontal form-label-left"
              @submit.prevent="updateProfile"
            >
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
                  <select class="form-control" v-model="userInfos.gender">
                    <option value="1">MALE</option>
                    <option value="2">FEMALE</option>
                    <option value="3">OTHER</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="dateofbirth">
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
        avatar: "",
        gender: ""
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
  },
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

<style scoped>
  .profile_left {
    text-align: center
  }
</style>