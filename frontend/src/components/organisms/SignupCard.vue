<template>
  <vs-card>
    <template #title>
      <h3>Signup Now</h3>
    </template>
    <template #img>
      <img src="/foto5.png" alt="" />
    </template>
    <template #text>
      <vs-input v-model="name" placeholder="Name" />

      <vs-input v-model="email" placeholder="Evan You" />

      <vs-input v-model="password" type="password" placeholder="Evan You" />
      <vs-button @click="signup()">
        Signup
      </vs-button>

      
    </template>
    <template #interactions> </template>
  </vs-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      console.log("Sign up now");
    },
  },
};
</script>

<style></style>
