<template>
<div>
  <h1>Tinder For Pets</h1>
    <vs-row><vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <div class="centerx default-input">
        <vs-input class="inputx" placeholder="Username" v-model="value1"/>
        <vs-input class="inputx" placeholder="Email" v-model="value2"/>
        <vs-input class="inputx" placeholder="Password" v-model="value3"/>
        <vs-input class="inputx" placeholder="Re-Enter Password" v-model="value4"/>
      </div>
   </vs-col></vs-row>
  <vs-row><vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12"><vs-button color="primary" type="filled">Sign Up</vs-button></vs-col></vs-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value1:'',
      value2:'',
      value3:'',
      value4:'',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
