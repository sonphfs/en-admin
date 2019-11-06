<template>
  <div class="x_panel">
    <div class="x_title">
      <h2>
        Form validation
        <small>sub title</small>
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
      <form class="form-horizontal form-label-left" novalidate>
        <span class="section">Create new user</span>

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
            />
          </div>
        </div>
        <div class="item form-group">
          <label for="password" class="control-label col-md-3">Password</label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <input
              id="password"
              type="password"
              name="password"
              data-validate-length="6,8"
              class="form-control col-md-7 col-xs-12"
              required="required"
            />
          </div>
        </div>
        <div class="item form-group">
          <label for="password2" class="control-label col-md-3 col-sm-3 col-xs-12">Repeat Password</label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <input
              id="password2"
              type="password"
              name="password2"
              data-validate-linked="password"
              class="form-control col-md-7 col-xs-12"
              required="required"
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
            />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Gender</label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <div id="gender" data-toggle="buttons" class="btn-group">
              <label
                data-toggle-class="btn-primary"
                data-toggle-passive-class="btn-default"
                class="btn btn-default"
              >
                <input type="radio" name="gender" value="male" /> &nbsp; Male &nbsp;
              </label>
              <label
                data-toggle-class="btn-primary"
                data-toggle-passive-class="btn-default"
                class="btn btn-primary"
              >
                <input type="radio" name="gender" value="female" /> Female
              </label>
            </div>
          </div>
        </div>
        <div class="item form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">
            Date of Birth
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
            />
          </div>
        </div>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-6 col-md-offset-3">
            <button type="submit" class="btn btn-primary">Cancel</button>
            <button id="send" type="submit" class="btn btn-success">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>