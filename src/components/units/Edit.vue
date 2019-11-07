<template>
  <div class="col-md-6 col-xs-12">
    <Breadcrumb></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Edit Unit
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
        <form class="form-horizontal form-label-left" @submit.prevent="update">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Parent unit</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select class="select2_group form-control" :value="unit.parent_id">
                <option value>Select parent unit</option>
                <option
                  :value="pUnit.id"
                  v-for="pUnit in listUnits"
                  v-if="pUnit.parent_id == 0 && pUnit.id != unit.id"
                >{{pUnit.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Name</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder="attract" v-model="unit.name" />
            </div>
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button type="submit" class="btn btn-success">Update</button>
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
  name: "EditUnit",
  components: {
    Breadcrumb
  },
  data() {
    return {
      unit: {
        parent_id: null,
        name: ""
      },
      listUnits: []
    };
  },
  created() {
    request({
      url: "/backend/units/show/" + this.$route.params.id,
      method: "get"
    })
      .then(res => {
        this.unit = res.data.result_data;
      })
      .catch();

    // get list unit
    request({
      url: "/backend/units/list",
      method: "get"
    })
      .then(res => {
        console.log(res);
        this.listUnits = res.data.result_data;
      })
      .catch();
  },
  methods: {
    update() {
      let data = this.unit;
      request({
        url: "/backend/units/update/" + this.$route.params.id,
        method: "post",
        data
      })
        .then(res => {
          console.log(res.data);
        })
        .catch();
    }
  }
};
</script>