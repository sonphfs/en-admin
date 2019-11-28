<template>
  <div class="x_panel">
    <div class="x_title">
      <h2>
        Update
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
        <span class="section">Update examination</span>

        <div class="item form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">
            Title
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
              v-model="examination.title"
            />
          </div>
        </div>
        <div class="item form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Type</label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <select class="form-control" v-model="examination.type">
              <option
                v-for="item in examinationTypes"
                :value="item.id"
                :selected="{ 'selected' : item.id == examination.type }"
              >{{ item.name }}</option>
            </select>
          </div>
        </div>
        <div class="item form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="email">
            Description
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
              v-model="examination.description"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="file-image" class="control-label col-md-3 col-sm-3 col-xs-12">Audio</label>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <button type="button" class="btn btn-default" @click="chooseAudio()">Upload Audio</button>
            <p style="margin-top: 10px">
              <span v-if="examination.audio">{{ examination.audio}}</span>
            </p>
            <input
              id="file-audio"
              type="file"
              name="examinationAudio"
              data-validate-length="6,8"
              class="form-control col-md-7 col-xs-12"
              required="required"
              ref="examinationAudio"
              style="display: none"
              accept="audio/*"
              @change="changeAudio()"
            />
            <audio controls controlslist="nodownload" v-if="examination.audio">
              <source :src="'http://127.0.0.1:8001/'+ examination.audio" type="audio/mpeg" />
            </audio>
          </div>
        </div>
        <div class="item form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Status</label>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <select
              class="form-control"
              v-model="examination.status"
              :selected="examination.status"
            >
              <option value="0">SPENDING</option>
              <option value="1">ACTIVE</option>
            </select>
          </div>
        </div>
        <div class="ln_solid"></div>
        <div class="form-group">
          <div class="col-md-6 col-md-offset-3">
            <button
              id="send"
              type="button"
              class="btn btn-success"
              @click="updateExamination()"
            >Update</button>
          </div>
        </div>
      </form>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_content">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>Part 1</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/1'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
                </tr>
                <tr>
                  <th>Part 2</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/2'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
                </tr>
                <tr>
                  <th>Part 3</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/3'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
                </tr>
                <tr>
                  <th>Part 4</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/4'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
                </tr>
                <tr>
                  <th>Part 5</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/5'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
                </tr>
                <tr>
                  <th>Part 6</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/6'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
                </tr>
                <tr>
                  <th>Part 7</th>
                  <td>
                    <a
                      :href="'/management/examinations/part/' + this.$route.params.code + '/7'"
                      class="btn btn-primary"
                    >Edit</a>
                  </td>
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
import request from "@/utils/request";
export default {
  name: "CreateExamination",
  data() {
    return {
      examination: {
        title: null,
        audio: null,
        type: null,
        description: null
      },
      examinationTypes: [],
      fileUpload: ""
    };
  },
  methods: {
    chooseAudio() {
      this.$refs.examinationAudio.click();
    },
    changeAudio() {
      this.fileUpload = this.$refs.examinationAudio.files[0];
      this.uploadAudio();
    },
    uploadAudio(type = "AUDIO", object = "EXAMINATION") {
      let formData = new FormData();
      formData.append("file", this.fileUpload);
      formData.append("type", type);
      formData.append("object", object);
      if (this.examination.audio != "") {
        this.deleteFile(this.examination.audio);
      }
      request
        .post("/backend/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          let data = res.data.result_data;
          this.examination.audio = data.filePath;
        });
    },
    deleteFile(fileSrc) {
      let data = {
        filePath: fileSrc
      };
      console.log(data);
      request({
        url: "/backend/files/delete",
        method: "post",
        data
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateExamination() {
      let data = this.examination;
      let formData = new FormData();
      formData.append("title", this.examination.title);
      formData.append("audio", this.examination.audio);
      formData.append("type", this.examination.type);
      formData.append("description", this.examination.description);
      request
        .post("/backend/examinations/create-or-update", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data.result_data);
        });
    },
    getExaminationTypes() {
      request({
        url: "/backend/examinations/examination-types",
        method: "get"
      })
        .then(res => {
          this.examinationTypes = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    getExamination() {
      request({
        url: "/backend/examinations/show/" + this.$route.params.code,
        method: "get"
      })
        .then(res => {
          this.examination = res.data.result_data;
        })
        .catch(err => {
          return this.$router.push("/page-404");
        });
    }
  },
  created() {
    this.getExaminationTypes();
    this.getExamination();
  }
};
</script>