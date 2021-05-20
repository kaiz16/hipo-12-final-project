<template>
  <vs-card type="3">
    <template #title>
      <h3>{{ pet.name }}</h3>
    </template>
    <template #img>
      <img :src="require('@/' + pet.picture )" alt="" />
    </template>
    <template #text>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
    </template>
    <template #interactions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <i class='bx bx-trash-alt' ></i>
        
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
    props: {
        pet: {
            type: Object,
            required: true
        },
        personality: {
            type: Object,
            required: true
        }
    }
};
</script>

<style></style>
