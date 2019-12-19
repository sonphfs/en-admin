<template>
  <div class="container body">
    <div class="main_container">
      <Sidebar :adminInfos="adminInfos"></Sidebar>
      <MenuTop :adminInfos="adminInfos"></MenuTop>
      <Main></Main>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import MenuTop from "@/components/layouts/MenuTop";
import Sidebar from "@/components/layouts/SidebarLeft";
import Main from "@/components/layouts/Main";
import Footer from "@/components/layouts/Footer";
import { getToken } from "@/utils/auth";
import request from "@/utils/request";

export default {
  name: "MainLayout",
  components: {
    MenuTop,
    Sidebar,
    Main,
    Footer
  },
  data() {
    return {
      adminInfos: {
        email: "",
        username: "",
        phone: "",
        address: "",
        birthday: "",
        avatar: "",
        gender: ""
      }
    };
  },
  created() {
    this.getUserInfos();
  },
  methods: {
    getUserInfos() {
      request({
        url: "/user/infos",
        method: "get"
      })
        .then(res => {
          this.adminInfos = res.data.result_data;
          console.log(res.data.result_data);
        })
        .catch(err => {
          console.log(err.res);
          return this.$router.push('/login')
        });
    }
  }
};
</script>
<style scoped>
div.main_container {
  padding-bottom: 48px;
  position: relative;
}
</style>