<template>
  <vs-card>
    <template #title>
      <h3>Register Now</h3>
    </template>
    <template #img>
      <img src="/foto5.png" alt="" />
    </template>
    <template #text>
      <vs-input v-model="username" placeholder="Username" />
      <vs-input v-model="email" placeholder="Email" />

      <vs-input v-model="password" type="password" placeholder="Password" />
      <vs-button @click="$auth.register({ email, username, password })">
        Register
      </vs-button>
      <p>
        Already have an account? <br />
        <a href="#" @click="$emit('login')">Login now!</a>
      </p>
    </template>
    <template #interactions> </template>
  </vs-card>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
};
</script>

<style></style>
