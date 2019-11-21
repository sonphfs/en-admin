<template>
  <div class="page-title">
    <div class="title_left">
      <h3>{{ Title }}</h3>
    </div>
    <div class="title_right">
      <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
        <div class="input-group">
          <input type="text" placeholder="Search for..." class="form-control" v-model="Keyword" />
          <span class="input-group-btn">
            <button type="button" class="btn btn-default">Go!</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFreeWord",
  props: ["title", "keyword"],
  data() {
    return {
      Title: "Welcome to Your Website!",
      Keyword: ""
    };
  }, created() {
      this.Title = this.title
      this.Keyword = this.keyword
  }
};
</script>