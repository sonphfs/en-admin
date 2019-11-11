<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Unit</small>
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
        <p class="text-muted font-13 m-b-30"></p>
        <table id="datatable-buttons" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created_at</th>
              <th>#Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in units">
              <td>{{index + 1}}</td>
              <td>{{unit.name}}</td>
              <td>{{unit.created_at}}</td>
              <td>
                <a :href="'/management/units/detail/'+ unit.id" class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a :href="'/management/units/edit/'+ unit.id" class="btn btn-info btn-xs">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a @click="deleteUnit(unit.id)" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "ListUnit",
  components: {
    Breadcrumb
  },
  data() {
    return {
      units: []
    };
  },
  created() {
    request({
      url: "/backend/units/list",
      method: "get"
    })
      .then(res => {
        this.units = res.data.result_data;
      })
      .catch();
  },
  methods: {
    deleteUnit(id) {
      let isDelete = confirm("Delete Unit  ???");
      if (isDelete) {
        request({
          url: "/backend/units/delete/" + id,
          method: "get"
        })
          .then()
          .catch();
      }
    }
  }
};
</script>