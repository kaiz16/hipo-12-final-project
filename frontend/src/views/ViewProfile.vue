<template>
  <section>
    <ProfileCard style="margin-top: 10px" />
    <vs-button @click="showAddPetCard = true">
      <i class="bx bx-plus"></i>Add Pet
    </vs-button>
    <AddPetCard
      v-model="showAddPetCard"
      @cancel="showAddPetCard = false"
      @petCreated="createPet"
    />
    <div class="user-pets">
      <PetCard
        v-for="pet in userPets"
        :pet="pet"
        :key="pet._id"
        style="margin: 5px;"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ProfileCard from "../components/organisms/ProfileCard.vue";
import AddPetCard from "../components/organisms/AddPetCard.vue";
import PetCard from "../components/organisms/PetCard.vue";
export default {
  data() {
    return {
      showAddPetCard: false,
      userPets: [],
    };
  },
  components: {
    ProfileCard,
    AddPetCard,
    PetCard,
  },
  mounted() {
    this.fetchUserPets();
  },
  methods: {
    createPet(pet) {
      this.userPets.shift(pet);
    },
    async fetchUserPets() {
      const { data } = await axios({
        url: this.$api + "/pets/" + this.$auth.user._id,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.$auth.getAuthorizationHeader(),
        },
      });
      this.userPets = data;
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-pets {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
</style>
