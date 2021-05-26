<template>
  <Loading v-if="loading"></Loading>
  <div id="app" v-else-if="$auth.isAnonymous === false && loading === false">
    <sidebar />
    <div id="views">
      <router-view></router-view>
    </div>
  </div>
  <div
    id="app"
    class="unauthenticated"
    v-else-if="$auth.isAnonymous === true && loading === false"
  >
    <RegisterCard v-if="registerMode" @login="registerMode = false" />
    <LoginCard v-else @register="registerMode = true" />
  </div>
</template>

<script>
import Sidebar from "./components/organisms/Sidebar.vue";
import LoginCard from "./components/organisms/LoginCard.vue";
import RegisterCard from "./components/organisms/RegisterCard.vue";
import Loading from "./components/molecules/Loading.vue";
export default {
  name: "App",
  components: {
    Sidebar,
    LoginCard,
    RegisterCard,
    Loading,
  },
  data() {
    return {
      registerMode: false,
      loading: true,
    };
  },
  async mounted() {
    this.loading = true;
    await this.$auth.fetchUser();
    this.loading = false;
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
