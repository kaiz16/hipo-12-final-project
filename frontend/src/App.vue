<template>
  <div id="app" v-if="$auth.isAnonymous === false">
    <sidebar />
    <div id="views">
      <router-view></router-view>
    </div>
  </div>
  <div id="app" class="unauthenticated" v-else>
    <RegisterCard v-if="registerMode" @login="registerMode = false" />
    <LoginCard v-else @register="registerMode = true" />
  </div>
</template>

<script>
import Sidebar from "./components/organisms/Sidebar.vue";
import LoginCard from "./components/organisms/LoginCard.vue";
import RegisterCard from "./components/organisms/RegisterCard.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    LoginCard,
    RegisterCard,
  },
  data() {
    return {
      registerMode: false,
    };
  },
  mounted() {
    this.$auth.fetchUser();
  },
};
</script>

<style scoped>
.unauthenticated {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
