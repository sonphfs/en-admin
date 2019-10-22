<template>
  <div class="container body">
    <div class="main_container">
      <Sidebar></Sidebar> 
      <MenuTop></MenuTop> 
      <Main></Main> 
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

import MenuTop from '@/components/layouts/MenuTop'
import Sidebar from '@/components/layouts/SidebarLeft'
import Main from '@/components/layouts/Main'
import Footer from '@/components/layouts/Footer'
export default {
  name: "HelloWorld",
  components: {
    MenuTop,
    Sidebar,
    Main,
    Footer
  }
};
</script>
