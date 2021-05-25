<template>
  <div id="profile-card">
    
    <vs-avatar style="height: 100px; width: 100px">
      <template #text>
        Lily
      </template>
    </vs-avatar>
    <h3>{{ $auth.user.username }}</h3>
    <div class="center">
      <p>{{ $auth.user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
#profile-card{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>