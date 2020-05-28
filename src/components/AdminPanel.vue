<template>
  <b-tabs type="is-toggle" expanded>
    <b-tab-item label="Screamy">
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
  beforeRouteEnter: function(to, from, next) {
    if (from.matched[0].instances.default.$store.getters.getAuthUser.isAdmin) {
      next();
    } else {
      alert("Przykro mi nie masz uprawnień");
    }
  }
};
</script>
