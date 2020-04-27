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
  data() {
    return {
      screams: [],
      propScreams: ""
    };
  },
  computed: {
    allScreams() {
      return this.$store.getters.getScreams;
    }
  },
  methods: {
    getScreams() {
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
  created() {
    this.getScreams();
    
  },
  watch: {
    "$route.params.tag"() {
      this.getScreams();
    }
  }
};
</script>
