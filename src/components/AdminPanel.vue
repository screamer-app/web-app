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
  }
};
</script>
