<template>
  <vs-card type="3">
    <template #title>
      <h3>{{ pet.name }}</h3>
    </template>

    <template #text>
      <vs-avatar style="height: 100px; width: 100px">
        <template #text>
          {{ pet.name }}
        </template>
      </vs-avatar>
      <p>
        {{
          pet.bio ||
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur error aut, dicta vitae minus perferendis eveniet a iusto quo doloribus culpa maiores magnam pariatur molestias accusantium illo exercitationem quas amet."
        }}
      </p>
    </template>
    <template #interactions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <i class="bx bx-trash-alt"></i>
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
};
</script>

<style></style>
