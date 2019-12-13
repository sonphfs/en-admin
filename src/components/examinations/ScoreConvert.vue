<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="x_panel">
      <div class="x_title">
        <h2>Bảng quy đổi điểm số</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <button type="button" class="btn btn-success dropdown-toggle" @click="exportCsv">
              <span class="glyphicon glyphicon-export"></span> Export
            </button>
          </li>
          <li>
            <button type="button" class="btn btn-success dropdown-toggle" @click="chooseFile">
              <span class="glyphicon glyphicon-import"></span> Import
            </button>
          </li>
          <input
            type="file"
            style="display: none;"
            name="csvFile"
            ref="csvFile"
            @change="importCsv"
            accept=".csv"
          />
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="row">
        <div class="col-md-6">
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
                <tr v-for="score in scoreTable" v-if="score.num<51">
                  <td>{{score.num}}</td>
                  <td>{{score.reading_score}}</td>
                  <td>{{score.listening_score}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6">
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
                <tr v-for="score in scoreTable" v-if="score.num>50">
                  <td>{{score.num}}</td>
                  <td>{{score.reading_score}}</td>
                  <td>{{score.listening_score}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/elements/Breadcrumb";
import request from "@/utils/request";
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
      ],
      scoreTable: {},
      file: {}
    };
  },
  created() {
    this.getScoreTable();
  },
  methods: {
    getScoreTable() {
      request({
        url: "/backend/score/score-table",
        method: "get"
      }).then(res => {
        this.scoreTable = res.data.result_data;
      });
    },
    exportCsv() {
      request({
        url: "/backend/score/export",
        method: "get",
        responseType: "blob" // important
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", "score.csv");
        document.body.appendChild(fileLink);
        console.log(fileLink);
        fileLink.click();
      });
    },
    chooseFile() {
      this.$refs.csvFile.click();
    },
    importCsv() {
      this.file = this.$refs.csvFile.files[0]
      let formData = new FormData();
      formData.append("csv_file", this.file);
      request
        .post("/backend/score/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
        this.file = {}
        this.getScoreTable()
    }
  }
};
</script>

<style scoped>
.x_title span {
  color: #fff;
}
</style>