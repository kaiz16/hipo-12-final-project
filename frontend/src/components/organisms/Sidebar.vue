<template>
  <vs-sidebar fixed v-model="active" open id="sidebar">
    <template #logo>
      <!-- ...img logo -->
    </template>
    <vs-sidebar-item id="home" to="/">
      <template #icon>
        <i class="bx bx-home"></i>
      </template>
      Home
    </vs-sidebar-item>
    <vs-sidebar-item id="chat">
      <template #icon>
        <i class="bx bxs-chat"></i>
      </template>
      Chats
    </vs-sidebar-item>
    <template #footer>
      <vs-row justify="space-between">
        <vs-avatar @click="gotoProfile">
          <template #text>
            {{ $auth.user ? $auth.user.username : "A" }}
          </template>
        </vs-avatar>
        <vs-button shadow primary @click="toggleTheme">
          <i class="bx bx-moon"></i>
        </vs-button>
        <vs-button shadow primary @click="$auth.logout()">
          <i class="bx bx-exit"></i>
        </vs-button>
      </vs-row>
    </template>
  </vs-sidebar>
</template>

<script>
import me from "@/mockdata/me.json";
export default {
  data() {
    return {
      active: "chat",
      me: me,
    };
  },
  methods: {
    gotoProfile() {
      this.$router.push({
        name: "Profile",
      });
    },
    toggleTheme() {
      let body = document.getElementsByTagName("body")[0];
      let hasDark = body.className;

      if (hasDark) {
        body.classList.remove("dark");
        body.setAttribute("vs-theme", "white");
      } else {
        body.classList.add("dark");
        body.setAttribute("vs-theme", "dark");
      }
    },
  },
};
</script>

<style></style>
