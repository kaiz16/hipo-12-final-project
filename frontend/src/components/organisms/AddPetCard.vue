<template>
  <vs-dialog prevent-close v-model="active">
    <template #header>
      <h3>Fill in these details</h3>
    </template>

    <vs-input v-model="name" placeholder="Name" />
    <vs-input v-model="bio" placeholder="Bio" />
    <vs-select :loading="loadingTypes" placeholder="Type" v-model="type">
      <vs-option
        v-for="(type, i) in allTypes"
        :key="i"
        :label="type.type"
        :value="type.type"
      >
        {{ type.type }}
      </vs-option>
    </vs-select>
    <vs-select
      v-if="breeds.length"
      :loading="loadingTypes"
      placeholder="Breed"
      v-model="breed"
    >
      <vs-option
        v-for="(breed, i) in breeds"
        :key="i"
        :label="breed"
        :value="breed"
      >
        {{ breed }}
      </vs-option>
    </vs-select>

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
      loadingTypes: true,
      allPersonalities: [],
      allTypes: [],
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
    breeds() {
      if (!this.type) return [];
      return this.allTypes.filter((type) => type.type === this.type)[0].breeds;
    },
  },
  mounted() {
    this.getAllPersonalities();
    this.getTypes();
  },
  methods: {
    async getAllPersonalities() {
      this.loadingPersonalities = true;
      try {
        const { data } = await axios({
          url: this.$api + "/personalities",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...this.$auth.getAuthorizationHeader(),
          },
        });
        this.allPersonalities = data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingPersonalities = false;
      }
    },
    async getTypes() {
      this.loadingTypes = true;
      try {
        const { data } = await axios({
          url: this.$api + "/types",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...this.$auth.getAuthorizationHeader(),
          },
        });
        this.allTypes = data;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingTypes = false;
      }
    },
    async addPet() {
      try {
        this.addPetLoading = true;
        const { data } = await axios({
          url: this.$api + "/pets/create",
          method: "POST",
          data: {
            name: this.name,
            personalities: this.personalities,
            type: this.type,
            breed: this.breed,
            bio: this.bio,
            userId: this.$auth.user._id,
          },
          headers: {
            "Content-Type": "application/json",
            ...this.$auth.getAuthorizationHeader(),
          },
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
