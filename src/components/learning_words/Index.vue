<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/">Examinations management</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/">List examinations</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="page-title">
      <div class="title_left">
        <h3>Welcome to Your Website!</h3>
      </div>
      <div class="title_right">
        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
          <div class="input-group">
            <input type="text" placeholder="Search for..." class="form-control" />
            <span class="input-group-btn">
              <button type="button" class="btn btn-default">Go!</button>
            </span>
          </div>
        </div>
      </div>
    </div>

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
        <SortedTable :values="learning_words">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">#</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="word">Word</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="type">Type</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="pronunciation">Pronunciation</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="meaning">Meaning</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="image">Image</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="example">Example</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(word, index) in sort.values" :key="word.id">
              <td>{{word.id}}</td>
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
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getItems"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
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
  },
  computed: {
    pageCount() {
      return Math.ceil(this.learning_words.length / 10);
    }
  },
  methods: {
    getItems() {}
  }
};
</script>