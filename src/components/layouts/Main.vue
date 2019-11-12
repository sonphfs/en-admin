<template>
  <!-- page content -->
  <div class="right_col clearfix" role="main">
    <router-view></router-view>
  </div>
  <!-- /page content -->
</template>

<script>
export default {
  name: "Main"
};
</script>
<style scoped>
div.right_col {
  min-height: 100vh;
}
</style>