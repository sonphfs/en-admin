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
              <img :src="'http://localhost:8001/' + userInfos.avatar" alt />{{userInfos.username}}
              <span class="fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right show" v-if="drawer">
              <li>
                <a href="/my-profile">Profile</a>
              </li>
              <li>
                <a href="javascript:;">
                  <span class="badge bg-red pull-right">50%</span>
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">Help</a>
              </li>
              <li>
                <a @click="logout">
                  <i class="fa fa-sign-out pull-right"></i> Log Out
                </a>
              </li>
            </ul>
          </li>

          <li role="presentation" class="dropdown">
            <a
              href="javascript:;"
              class="dropdown-toggle info-number"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-envelope-o"></i>
              <span class="badge bg-green">6</span>
            </a>
            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
              <li>
                <a>
                  <span class="image">
                    <img src="images/img.jpg" alt="Profile Image" />
                  </span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span
                    class="message"
                  >Film festivals used to be do-or-die moments for movie makers. They were where...</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="image">
                    <img src="images/img.jpg" alt="Profile Image" />
                  </span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span
                    class="message"
                  >Film festivals used to be do-or-die moments for movie makers. They were where...</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="image">
                    <img src="images/img.jpg" alt="Profile Image" />
                  </span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span
                    class="message"
                  >Film festivals used to be do-or-die moments for movie makers. They were where...</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="image">
                    <img src="images/img.jpg" alt="Profile Image" />
                  </span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span
                    class="message"
                  >Film festivals used to be do-or-die moments for movie makers. They were where...</span>
                </a>
              </li>
              <li>
                <div class="text-center">
                  <a>
                    <strong>See All Alerts</strong>
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
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
      userInfos: {}
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