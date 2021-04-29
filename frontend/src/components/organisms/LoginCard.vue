<template>
  <vs-card>
    <template #title>
      <h3>Login Now</h3>
    </template>
    <template #img>
      <img src="/foto5.png" alt="" />
    </template>
    <template #text>
      <div class="center content-inputs">
        <vs-input v-model="email" placeholder="Email">
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
        </vs-input>

        <vs-input
          type="password"
          icon-after
          v-model="password"
          placeholder="Password"
        >
          <template #icon>
            <i class="bx bx-lock-open-alt"></i>
          </template>
        </vs-input>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
    </template>
    <template #interactions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <i class="bx bx-chat"></i>
        <span class="span">
          54
        </span>
      </vs-button>
    </template>
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
