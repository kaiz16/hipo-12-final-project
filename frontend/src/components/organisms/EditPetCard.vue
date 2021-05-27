<template>
  <vs-dialog prevent-close v-model="active">
    <template #header>
      <h3>{{ pet.name }}</h3>
    </template>

    <vs-input v-model="pet.name" placeholder="Name" />
    <vs-input v-model="pet.type" placeholder="What type of pet? Eg: dog, cat" />
    <vs-input v-model="pet.breed" placeholder="Breed" />
    <vs-input v-model="pet.bio" placeholder="Bio" type="textarea" />
    <vs-select
      multiple
      :loading="loadingPersonalities"
      placeholder="Personalities"
      v-model="pet.personalities"
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
    <vs-button @click="savePet" :loading="savePetLoading">
      Save Changes
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
    pet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      savePetLoading: false,
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
    async savePet() {
      try {
        this.savePetLoading = true;
        const { data } = await axios({
          url: "https://tinder-for-pets-api.herokuapp.com/pets/update/" + this.pet._id,
          method: "POST",
          data: {
            name: this.pet.name,
            personalities: this.pet.personalities,
            type: this.pet.type,
            breed: this.pet.breed,
            bio: this.pet.bio,
          },
          withCredentials: true,
        });
        this.$emit("cancel", data);
      } catch (e) {
        console.error(e);
      } finally {
        this.savePetLoading = false;
      }
    },
  },
};
</script>

<style></style>
