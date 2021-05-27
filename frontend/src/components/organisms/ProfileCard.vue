<template>
  <div id="profile-card">
    <vs-avatar size="100">
     <template #text>
        {{ $auth.user.name || $auth.user.username }}
      </template>
    </vs-avatar>
    
    <div class="center">
      <p class="text">{{ $auth.user.email }}</p>
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