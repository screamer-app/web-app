<template>
  <b-tabs type="is-toggle" expanded>
    <b-tab-item label="Screamy" icon="library-music">
      <ScreamList />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import ScreamList from "./ScreamList";

export default {
  components: {
    ScreamList
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
