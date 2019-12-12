<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Bảng quy đổi điểm số</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <button type="button" class="btn btn-success dropdown-toggle">
              <span class="glyphicon glyphicon-export"></span> Export
            </button>
          </li>
          <li>
            <button type="button" class="btn btn-success dropdown-toggle">
              <span class="glyphicon glyphicon-import"></span> Import
            </button>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Số câu đúng</th>
              <th>Điểm nghe</th>
              <th>Điểm đọc</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>2</td>
              <td>5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>3</td>
              <td>5</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "ScoreTable",
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
          title: "Examinations management",
          link: "/"
        },
        {
          title: "Create examination",
          link: "/"
        }
      ]
    };
  }
};
</script>

<style scoped>
.x_title span {
  color: #fff;
}
</style>