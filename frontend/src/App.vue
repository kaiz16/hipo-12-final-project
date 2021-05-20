<template>
  <div id="app" >
    <sidebar />
    <div id="views" >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/organisms/Sidebar.vue";
export default {
  name: "App",
  components: {
    Sidebar,
  },
};
</script>

<style>

</style>
