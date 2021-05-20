<template>
  <section>
    <signup-card />
  </section>
</template>

<script>
import SignupCard from "../components/organisms/SignupCard.vue";
export default {
  components: {
    SignupCard,
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
