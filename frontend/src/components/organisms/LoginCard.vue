<template>
  <vs-card>
    <template #title>
      <h3>Login Now</h3>
    </template>
    <template #img>
      <img src="/foto5.png" alt="" />
    </template>
    <template #text>
      <vs-input v-model="email" placeholder="Email" />

      <vs-input v-model="password" type="password" placeholder="Password" />
      <vs-button @click="$auth.login({ email, password })">
        Login
      </vs-button>
      <p>
        Don't have an account? <br />
        <a href="#" @click="$emit('register')">Register now!</a>
      </p>
    </template>
    <template #interactions> </template>
  </vs-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style></style>
