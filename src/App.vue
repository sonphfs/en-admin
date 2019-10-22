<template>
  <div id="app">
    <MainLayout/>
  </div>
</template>

<script>
import MainLayout from './components/MainLayout.vue'

import '@/assets/vendors/bootstrap/dist/css/bootstrap.min.css'
import '@/assets/vendors/font-awesome/css/font-awesome.min.css'
import '@/assets/vendors/nprogress/nprogress.css'
import '@/assets/vendors/iCheck/skins/flat/green.css'
import '@/assets/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css'
import '@/assets/vendors/jqvmap/dist/jqvmap.min.css'
import '@/assets/vendors/bootstrap-daterangepicker/daterangepicker.css'
import '@/assets/build/css/custom.min.css'

export default {
  name: 'app',
  components: {
    MainLayout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
