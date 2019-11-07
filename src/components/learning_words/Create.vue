<template>
  <div class="col-md-6 col-xs-12">
    <Breadcrumb></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Create new words
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
        <form class="form-horizontal form-label-left">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Subject</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select class="select2_group form-control">
                <option value="A">Contract</option>
                <option value="B">Marketing</option>
                <option value="C">Warranties</option>
                <option value="D">Business planning</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Word</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder="attract" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Image</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder />
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Type</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder="v, n, adj, adv" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Meaning</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder="thu hút" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Pronunciation</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Audio</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Example</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder />
            </div>
          </div>
          <div class="ln_solid"></div>
          <div class="form-group">
            <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
              <button type="submit" class="btn btn-success">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  components: {
    Breadcrumb
  }
};
</script>