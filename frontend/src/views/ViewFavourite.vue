<template>
  <Loading v-if="loading"></Loading>
  <section v-else-if="loading === false && favourites.length">
    <div
      v-for="favourite in favourites"
      :key="favourite._id"
      style="margin: 10px"
    >
      <PetCard :pet="favourite.pet" />
    </div>
  </section>
  <section v-else-if="loading === false && favourites.length === 0">
    <p>It's empty</p>
  </section>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
import PetCard from "@/components/organisms/PetCard.vue";

import Loading from "@/components/molecules/Loading.vue";

export default {
  data() {
    return {
      favourites: [],
      loading: false,
    };
  },
  components: {
    Loading,
    PetCard,
  },
  mounted() {
    this.getFavs();
  },
  methods: {
    async getFavs() {
      this.loading = true;
      const { data } = await axios({
        url: this.$api + "/favourites",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.$auth.getAuthorizationHeader(),
        },
      });
      this.favourites = data;
      this.loading = false;
    },
  },
};
</script>
<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
</style>
