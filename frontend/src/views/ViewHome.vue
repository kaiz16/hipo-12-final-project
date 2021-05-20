<template>
  <section v-if="petsByMatches.length">
    <div v-for="pet in petsByMatches" :key="pet.id" style="margin: 10px">
      <pet-match-card :pet="pet"></pet-match-card>
    </div>
  </section>
</template>

<script>
import me from "@/mockdata/me.json";
import allMatches from "@/mockdata/matches.json";
import allPets from "@/mockdata/pets.json";
import PetMatchCard from "../components/organisms/PetMatchCard.vue";
export default {
  data() {
    return {
      me: me,
      allMatches: allMatches,
      allPets: allPets,
      myMatches: [],
      petsByMatches: [],
    };
  },
  components: {
    PetMatchCard,
  },
  mounted() {
    this.myMatches = this.allMatches.filter(
      (match) => match.pet1Id === me.id || match.pet2Id === me.id
    );
    this.petsByMatches = this.allPets.filter((pet) => {
      let match = this.myMatches.filter(
        (match) =>
          pet.id !== me.id &&
          (pet.id === match.pet1Id || pet.id === match.pet2Id)
      )[0];
      if (match) return match;
    });
  },
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
