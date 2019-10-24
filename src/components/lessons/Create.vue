<template>
  <div class="col-md-6 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Create new Lesson
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
        <form class="form-horizontal form-label-left" @submit.prevent="create()">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Unit</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select class="select2_group form-control" v-model="lesson.unit_id">
                <option v-for="unit in units" :value="unit.id">{{ unit.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Title</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" v-model="lesson.title" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Image</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input
                type="file"
                class="form-control"
                id="file"
                ref="file"
                @change="onChangeFileUpload()"
              />
            </div>
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button type="submit" class="btn btn-success">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "CreateLesson",
  data() {
    return {
      units: [],
      lesson: {
        unit_id: null,
        title: "",
        image: ""
      }
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
    create() {
      let data = this.lesson;
      let formData = new FormData();
      formData.append("file", this.lesson.file);
      formData.append("unit_id", this.lesson.unit_id);
      formData.append("title", this.lesson.title);
      formData.append("image", this.lesson.image);
      request
        .post("/backend/lessons/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch();
    },
    onChangeFileUpload() {
      this.lesson.image = this.$refs.file.files[0];
    }
  }
};
</script>