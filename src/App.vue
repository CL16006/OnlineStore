<template>
  <div id="app">
    <barnav></barnav>
    <router-view />
    <Footer></Footer>

  </div>
</template>

<script>
import Barnav from './components/Barnav.vue'
import Footer from './components/Footer.vue'


export default {

  components: {
    Barnav,
    Footer,
  }
}
</script>


<style lang="scss">
@import "./styles/custom.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

</style>
