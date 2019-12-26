<template>
  <!-- top navigation -->
  <div class="top_nav">
    <div class="nav_menu">
      <nav>
        <div class="nav toggle">
          <a id="menu_toggle">
            <i class="fa fa-bars"></i>
          </a>
        </div>

        <ul class="nav navbar-nav navbar-right">
          <li class>
            <a
              href="javascript:;"
              class="user-profile dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              @click="drawer=!drawer"
            >
              <img :src="serverUri + userInfos.avatar" alt />{{userInfos.username}}
              <span class="fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right show" v-if="drawer">
              <li>
                <a href="/my-profile">Profile</a>
              </li>
              <li>
                <a @click="logout">
                  <i class="fa fa-sign-out pull-right"></i> Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- /top navigation -->
</template>

<script>
import request from "@/utils/request";
import { removeToken } from "@/utils/auth";
export default {
  name: "MenuTop",
  props: ["adminInfos"],
  data() {
    return {
      drawer: false,
      userInfos: {},
      serverUri: process.env.VUE_APP_BASE_SERVER_URL
    }
  },
  methods: {
    logout() {
      request({
        url: "/logout",
        method: "post"
      }).then(res => {
        removeToken();
        this.$router.push('/login')
      });
    },
    mouseOver() {
      this.active = !this.active;
    }
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