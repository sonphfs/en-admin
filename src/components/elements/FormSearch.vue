<template>
  <div class="page-title">
    <div class="title_left">
      <h3>{{ Title }}</h3>
    </div>
    <div class="title_right">
      <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
        <div class="input-group">
          <input type="text" placeholder="Search for..." class="form-control" v-model="Keyword" @keyup.enter="search"/>
          <span class="input-group-btn">
            <button type="button" class="btn btn-default" @click="search">Go!</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormSearch",
  props: ["title"],
  data() {
    return {
      Title: "Welcome to Your Website!",
      Keyword: ""
    };
  },
  created() {
    if (this.title) this.Title = this.title;
  },
  methods: {
    search() {
        this.$emit('listenSearch', this.Keyword)
    }
  },
};
</script>