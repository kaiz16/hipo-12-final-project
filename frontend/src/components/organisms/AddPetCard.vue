<template>
  <vs-dialog prevent-close v-model="active">
    <template #header>
      <h3>Fill in these details</h3>
    </template>

    <vs-input v-model="name" placeholder="Name" />
    <vs-input v-model="type" placeholder="Type" />
    <vs-input v-model="breed" placeholder="Breed" />
    <vs-input v-model="bio" placeholder="Bio" />
    <vs-select
      multiple
      :loading="loadingPersonalities"
      placeholder="Personalities"
      v-model="personalities"
    >
      <vs-option
        v-for="(personality, i) in allPersonalities"
        :key="i"
        :label="personality.personality"
        :value="personality.personality"
      >
        {{ personality.personality }}
      </vs-option>
    </vs-select>
    <vs-button @click="addPet" :loading="addPetLoading">
      Add
    </vs-button>
    <vs-button @click="$emit('cancel')">
      Cancel
    </vs-button>
  </vs-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      type: "",
      breed: "",
      bio: "",
      personalities: [],
      addPetLoading: false,
      loadingPersonalities: true,
      allPersonalities: [],
    };
  },
  computed: {
    active: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    this.getAllPersonalities();
  },
  methods: {
    async getAllPersonalities() {
      this.loadingPersonalities = true;
      try {
        const { data } = await axios({
          url: "https://tinder-for-pets-api.herokuapp.com/personalities",
          method: "GET",
          withCredentials: true,
        });
        this.allPersonalities = data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingPersonalities = false;
      }
    },
    async addPet() {
      try {
        this.addPetLoading = true;
        const { data } = await axios({
          url: "https://tinder-for-pets-api.herokuapp.com/pets/create",
          method: "POST",
          data: {
            name: this.name,
            personalities: this.personalities,
            type: this.type,
            breed: this.breed,
            bio: this.bio,
            userId: this.$auth.user._id,
          },
          withCredentials: true,
        });
        this.$emit("cancel", data);
      } catch (e) {
        console.error(e);
      } finally {
        this.addPetLoading = false;
      }
    },
  },
};
</script>

<style></style>
