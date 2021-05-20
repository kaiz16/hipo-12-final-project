<template>
<div>
      <vs-navbar v-model="activeItem" class="nabarx" position="absolute" align-items="flex-end" >
      <div slot="title">
        <vs-navbar-title>
          Hello world
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>
    </vs-navbar>
<vs-row vs-justify="center">
  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
    <vs-card>
      <div slot="header">
        <h3>
          Hello world !
        </h3>
      </div>
      <div>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button type="gradient" color="danger" icon="favorite"></vs-button>
          <vs-button color="primary" icon="turned_in_not"></vs-button>
          <vs-button color="rgb(230,230,230)" color-text="rgb(50,50,50)" icon="settings"></vs-button>
        </vs-row>
      </div>
    </vs-card>
  </vs-col>
</vs-row>
</div>
</template>

<script>
export default {
  name: 'HomePage',
  data:()=>({
    activeItem: 0
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
