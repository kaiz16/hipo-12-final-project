<template>
  <section >
    <profile-card :pet="me" />
  </section>
</template>

<script>
import me from "@/mockdata/me.json";
import ProfileCard from "../components/organisms/ProfileCard.vue";
export default {
  data() {
    return {
      me: me,
    };
  },
  components: {
    ProfileCard,
  },
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
