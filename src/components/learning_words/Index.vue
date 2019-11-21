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
              <button type="submit" class="btn btn-success" @click="modalOpen=true">Create new Words</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="learning_words.data">
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
                <a class="btn btn-primary btn-xs">
                  <i class="fa fa-folder"></i> View
                </a>
                <a class="btn btn-info btn-xs">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getLearningWords"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ModalForm  @onClose="modalOpen=false" v-if="modalOpen==true"></ModalForm>
  </div>
</template>
<script>
import request from "@/utils/request";
import ModalForm from "@/components/learning_words/ModalForm";
export default {
  name: "ListLearningWords",
  components: {
    ModalForm
  },
  data() {
    return {
      learning_words: {
        data: [],
        last_page: 0
      },
      modalOpen: false
    };
  },
  created() {
    this.getLearningWords()
  },
  computed: {
    pageCount() {
      return this.learning_words.last_page;
    }
  },
  methods: {
    getLearningWords(page = 1) {
      request({
        url: "/backend/learning_words/list?page=" + page,
        method: "get"
      })
        .then(res => {
          this.learning_words = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    }
  }
};
</script>