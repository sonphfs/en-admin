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
          <div class="col-md-3 col-sm-3 col-xs-12 profile_left">
            <div class="profile_img">
              <div id="crop-avatar">
                <!-- Current avatar -->
                <img
                  class="img-responsive avatar-view"
                  src="/img/user.ee262c61.png"
                  alt="Avatar"
                  title="Change the avatar"
                />
              </div>
            </div>
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <br />
            <form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">
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
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="gender">
                  Gender
                  <span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 col-xs-12">
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    required="gender"
                    class="form-control col-md-7 col-xs-12"
                  />
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
