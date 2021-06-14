<template>
  <Loading v-if="loading"></Loading>
  <section v-else-if="loading === false && matches.length">
    <div v-for="pet in matches" :key="pet.id" style="margin: 10px">
      <PetCard :pet="pet" />
    </div>
  </section>
  <section v-else-if="loading === false && matches.length === 0">
    <p>It's empty</p>
  </section>
</template>

<script>
import axios from "axios";
import PetCard from "@/components/organisms/PetCard.vue";
import Loading from "@/components/molecules/Loading.vue";
export default {
  data() {
    return {
      matches: [],
      loading: true,
    };
  },
  components: {
    PetCard,
    Loading,
  },
  mounted() {
    this.getMatches();
  },
  methods: {
    async getMatches() {
      this.loading = true;
      // First get all user pets
      const { data } = await axios({
        url: this.$api + "/pets/" + this.$auth.user._id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.$auth.getAuthorizationHeader(),
        },
      });

      // loop through each pet & get their matches
      for (let x = 0; x < data.length; x++) {
        let pet = data[x];
        const matches = await axios({
          url: this.$api + "/matches/" + pet._id,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...this.$auth.getAuthorizationHeader(),
          },
        });

        this.matches = [...this.matches, ...matches.data];
      }
      // remove duplicates
      this.matches = this.matches.filter(function({ _id }) {
        return !this[_id] && (this[_id] = _id);
      }, {});
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
