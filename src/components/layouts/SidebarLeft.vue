<template>
  <div class="col-md-3 left_col">
    <div class="left_col scroll-view">
      <div class="navbar nav_title" style="border: 0;">
        <a href="/" class="site_title">
          <i class="fa fa-paw"></i>
          <span style="padding-left: 10px;">EN-C System</span>
        </a>
      </div>

      <div class="clearfix"></div>

      <!-- menu profile quick info -->
      <div class="profile clearfix">
        <div class="profile_pic">
          <img v-if="userInfos.avatar" :src="serverUri + userInfos.avatar" alt="..." class="img-circle profile_img" />
          <img v-if="!userInfos.avatar" :src="serverUri + 'enc/uploads/users/avatars/default-userAvatar.png'" alt="..." class="img-circle profile_img" />
        </div>
        <div class="profile_info">
          <span>Welcome,</span>
          <h2>{{ userInfos.username }}</h2>
        </div>
        <div class="clearfix"></div>
      </div>
      <!-- /menu profile quick info -->

      <br />

      <!-- sidebar menu -->
      <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
          <h3>General</h3>
          <ul class="nav side-menu">
            <li class @click="userMenu = !userMenu" v-bind:class="{ active : userMenu}">
              <a>
                <i class="fa fa-home"></i> Quản lý thành viên
                <span class="fa fa-chevron-down"></span>
              </a>
              <ul class="nav child_menu user_menu" style="display: block" v-show="userMenu">
                <li>
                  <a href="/management/users/list">Thành viên</a>
                </li>
                <li>
                  <a href="/management/users/login-histories">Lịch sử truy cập</a>
                </li>
              </ul>
            </li>
            <li @click="examMenu = !examMenu" v-bind:class="{ active : examMenu}">
              <a>
                <i class="fa fa-edit"></i> Quản lý bài thi
                <span class="fa fa-chevron-down"></span>
              </a>
              <ul class="nav child_menu" style="display: block" v-show="examMenu">
                <li>
                  <a href="/management/examinations/list">Bài thi</a>
                </li>
              </ul>
              <ul class="nav child_menu" style="display: block" v-show="examMenu">
                <li>
                  <a href="/management/examinations/histories">Kết quả</a>
                </li>
              </ul>
              <ul class="nav child_menu" style="display: block" v-show="examMenu">
                <li>
                  <a href="/management/examinations/score-table">Thang điểm</a>
                </li>
              </ul>
            </li>
            <li @click="wordMenu = !wordMenu" v-bind:class="{ active : wordMenu}">
              <a>
                <i class="fa fa-desktop"></i> Learning Words
                <span class="fa fa-chevron-down"></span>
              </a>
              <ul class="nav child_menu" style="display: block" v-show="wordMenu">
                <li>
                  <a href="/management/learning_words/list">List Learning Words</a>
                </li>
                <li>
                  <a href="/management/learning_words/questions">Questions</a>
                </li>
                <li>
                  <a href="/management/learning_words/subjects/list">List Subject</a>
                </li>
              </ul>
            </li>
            <li @click="lessonMenu = !lessonMenu" v-bind:class="{ active : lessonMenu}">
              <a>
                <i class="fa fa-table"></i> Lessons Management
                <span class="fa fa-chevron-down"></span>
              </a>
              <ul class="nav child_menu" style="display: block" v-show="lessonMenu">
                <li>
                  <a href="/management/lessons/list">List Lessons</a>
                </li>
                <li>
                  <a href="/management/lessons/questions">Questions</a>
                </li>
                <li>
                  <a href="/management/units/list">Units</a>
                </li>
              </ul>
            </li>
            <li @click="questionMenu = !questionMenu" v-bind:class="{ active : questionMenu}">
              <a>
                <i class="fa fa-bar-chart-o"></i> Quản lý câu hỏi
                <span class="fa fa-chevron-down"></span>
              </a>
              <ul class="nav child_menu" style="display: block" v-show="questionMenu">
                <li>
                  <a href="/management/questions/list">Câu hỏi</a>
                </li>
              </ul>
            </li>
            <li @click="contactMenu = !contactMenu" v-bind:class="{ active : contactMenu}">
              <a>
                <i class="fa fa-bar-chart-o"></i> Quản lý liên hệ
                <span class="fa fa-chevron-down"></span>
              </a>
              <ul class="nav child_menu" style="display: block" v-show="contactMenu">
                <li>
                  <a href="/management/contacts/list">Liên hệ</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- /sidebar menu -->

      <!-- /menu footer buttons -->
      <div class="sidebar-footer hidden-small">
        <a data-toggle="tooltip" data-placement="top" title="Settings">
          <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="FullScreen">
          <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Lock">
          <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Logout" href="/login">
          <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
        </a>
      </div>
      <!-- /menu footer buttons -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["adminInfos"],
  data() {
    return {
      userMenu: true,
      examMenu: true,
      lessonMenu: !true,
      wordMenu: !true,
      questionMenu: !true,
      contactMenu: !true,
      userInfos: {},
      serverUri: process.env.VUE_APP_BASE_SERVER_URL
    };
  },
  methods: {},
  watch: {
    userMenu() {}
  },
  created() {
    this.userInfos = this.adminInfos;
  },
  watch: {
    adminInfos() {
      this.userInfos = this.adminInfos;
    }
  }
};
</script>
<style scoped>
.display_block {
  display: block;
}
</style>