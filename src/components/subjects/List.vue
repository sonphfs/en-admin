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
            <a href="/management/examinations/create" class="collapse-link">
              <button type="submit" class="btn btn-success">Create new Subjects</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="subjects">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="name">Subject</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Image</th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="unit_id">Unit ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(subject, index) in sort.values" :key="subject.id">
              <td>{{subject.id}}</td>
              <td>{{subject.name}}</td>
              <td>{{subject.image}}</td>
              <td>{{subject.created_at}}</td>
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
          :page-count="5"
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
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      subjects: []
    };
  }
};
</script>
