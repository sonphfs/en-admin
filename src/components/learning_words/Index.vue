<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Learning Words</small>
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
              <th>Word</th>
              <th>Type</th>
              <th>Pronunciation</th>
              <th>Meaning</th>
              <th>Image</th>
              <th>Example</th>
              <th>Created at</th>
              <th>#Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(word, index) in learning_words">
              <td>{{index}}</td>
              <td>{{word.word}}</td>
              <td>{{word.type}}</td>
              <td>{{word.pronunciation}}</td>
              <td>{{word.meaning}}</td>
              <td>{{word.image}}</td>
              <td>{{word.example}}</td>
              <td>{{word.created_at}}</td>
              <td>
                <a href="/management/learning_words/detail" class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a href="/management/learning_words/edit" class="btn btn-info btn-xs">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a href="#" class="btn btn-danger btn-xs">
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
export default {
  name: "ListLearningWords",
  data() {
    return {
      learning_words: []
    };
  },
  created() {
    request({
      url: "/backend/learning_words/list",
      method: "get"
    })
      .then(res => {
        this.learning_words = res.data.result_data;
      })
      .catch(err => {
        console.log(err.res);
      });
  }
};
</script>