<template>
  <vs-card>
    <template #title>
      <h3>Fill in these details</h3>
    </template>

    <template #text>
      <vs-input v-model="name" placeholder="Name" />
      <vs-input v-model="type" placeholder="Type" />
      <vs-input v-model="breed" placeholder="Breed" />
      <vs-input v-model="bio" placeholder="Bio" />
      <vs-button @click="addPet">
        Add
      </vs-button>
      <vs-button @click="$emit('cancel')">
        Cancel
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      type: "",
      breed: "",
      bio: "",
    };
  },
  methods: {
    async addPet() {
      const { data } = await axios({
        url: "http://localhost:8080/create",
        method: "POST",
        data: {
          name: this.name,
          userId: this.$auth.user._id,
        },
        withCredentials: true,
      });
      this.$emit("petCreated", data);
    },
  },
};
</script>

<style></style>
