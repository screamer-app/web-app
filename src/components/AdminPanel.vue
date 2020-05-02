<template>
  <b-tabs type="is-toggle" expanded>
    <b-tab-item label="Screamy" icon="library-music">
      <ScreamList />
    </b-tab-item>
    {{user}}
  </b-tabs>
</template>

<script>
import ScreamList from "./ScreamList";

export default {
  components: {
    ScreamList
  },
  computed:{
    user(){
      return this.$store.getters.userdata.isAdmin;
    }
  },
  beforeRouteEnter(to, from, next){
    if(from.matched[0].instances.default.$store.getters.userdata.isAdmin){
      next();
    }else{
      alert('Przykro mi nie masz uprawnień');
    }
  }
};
</script>
