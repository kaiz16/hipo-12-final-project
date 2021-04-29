<template>
  <section>
    <login-card />
  </section>
</template>

<script>
import LoginCard from "../components/organisms/LoginCard.vue";
export default {
  components: {
    LoginCard,
  },
};
</script>

<style scoped>
section {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
