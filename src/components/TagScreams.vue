<template>
  <div>
    <ScreamList :propScreams="propScreams" />
  </div>
</template>

<script>
import ScreamList from "./ScreamList";

export default {
  components: {
    ScreamList
  },
  data: function() {
    return {
      screams: [],
      propScreams: ""
    };
  },
  computed: {
    allScreams: function() {
      return this.$store.getters.getScreams;
    }
  },
  methods: {
    getScreams: function() {
      const allScreams = this.allScreams;
      const screams = [];
      const tag = this.$route.params.tag;

      for (let i = 0; i < allScreams.length; i++) {
        if (
          allScreams[i].tags.indexOf(tag) > -1 &&
          allScreams[i].tags != null
        ) {
          screams.push(allScreams[i]);
        }
      }
      this.propScreams = screams;
    }
  },
  created: function() {
    this.getScreams();
  },
  watch: {
    "$route.params.tag": function() {
      this.getScreams();
    }
  }
};
</script>
