<template>
  <vs-card>
    <template #title>
      <h3>{{ pet.name }}</h3>
    </template>
    <template #img>
      <img :src="require('@/' + pet.picture)" alt="" />
    </template>
    <template #text>
      <div class="center" v-show="editing">
        <vs-input
          label="Name"
          v-model="pet.name"
          placeholder="Name"
          style="margin: 20px"
        />

        <vs-input
          label="Bio"
          v-model="pet.bio"
          placeholder="Bio"
          style="margin: 20px"
        />
        <vs-input
          label="Location"
          v-model="pet.location"
          placeholder="Location"
          style="margin: 20px"
        />
        <vs-input
          label="Age"
          v-model="pet.age"
          placeholder="Age"
          style="margin: 20px"
        />
        <vs-input
          label="Breed"
          v-model="pet.breed"
          placeholder="Breed"
          style="margin: 20px"
        />
        <vs-input
          label="Name"
          v-model="pet.name"
          placeholder="Evan You"
          style="margin: 20px"
        />
      </div>


      <p>{{ pet.bio }}</p>
    </template>
    <template #interactions>
      <vs-button primary icon @click="editing = !editing">
        <i class="bx bx-pencil" v-if="editing === false"></i>
        <i class="bx bx-check" v-else></i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
};
</script>

<style></style>
