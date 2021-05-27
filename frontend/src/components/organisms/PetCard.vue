<template>
  <vs-card type="1">
    <template #title>
      <h3>{{ pet.name }}</h3>
    </template>
    <template #img>
     <vs-avatar size="500">
      <template #text>
        {{ pet.name }}
      </template>
    </vs-avatar>
    </template>
    <template #text>
      <p>
        {{ pet.bio || "" }}
      </p>
    </template>
    <template #interactions>
      <vs-button
        :primary="isFavourited === true"
        :shadow="isFavourited === false"
        icon
        @click="isFavourited ? unfavouritePet() : favouritePet()"
        :loading="loading"
      >
        <i class="bx bx-heart"></i>
      </vs-button>
      <vs-button v-if="canEdit" @click="editingPet = true">
        <i class="bx bx-pencil"></i>
      </vs-button>

      <EditPetCard
        v-model="editingPet"
        @cancel="editingPet = false"
        :pet="pet"
      />
    </template>
  </vs-card>
</template>

<script>
import axios from "axios";
import EditPetCard from "./EditPetCard.vue";
export default {
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  components: {
    EditPetCard,
  },
  data() {
    return {
      loading: false,
      favourite: null,
      editingPet: false,
    };
  },
  computed: {
    isFavourited() {
      return Boolean(this.favourite?._id);
    },
    canEdit(){
      return this.pet.userId === this.$auth.user._id
    }
  },
  mounted() {
    this.isPetFavourited();
  },
  methods: {
    async isPetFavourited() {
      try {
        this.loading = true;
        const { data } = await axios({
          url: "http://localhost:8080/favourites/" + this.pet._id,
          method: "GET",
          withCredentials: true,
        });
        this.favourite = data[0];
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    async favouritePet() {
      try {
        this.loading = true;
        // eslint-disable-next-line
        const { data } = await axios({
          url: "http://localhost:8080/favourites/create",
          method: "POST",
          data: {
            petId: this.pet._id,
            userId: this.$auth.user._id,
          },
          withCredentials: true,
        });
        this.isPetFavourited();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async unfavouritePet() {
      try {
        await axios({
          url: "http://localhost:8080/favourites/delete",
          method: "POST",
          data: {
            id: this.favourite._id,
          },
          withCredentials: true,
        });

        this.isPetFavourited();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
