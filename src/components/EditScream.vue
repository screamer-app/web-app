<template>
  <div class="container">
    <form>
      <div class="form-group row">
        <div class="col-12">
          <textarea
            v-model="scream.scream"
            placeholder="Treść screama"
            cols="40"
            rows="5"
            class="form-control"
          ></textarea>
          <b-taginput
            v-model="scream.tags"
            ellipsis
            icon="label"
            placeholder="Tagi"
          >
          </b-taginput>
        </div>
      </div>
      <div class="form-group row">
        <div class="offset-6 col-11">
          <button @click="editScream" class="btn btn-primary" type="button">
            Edytuj
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    scream: function() {
      return this.$store.getters.getScreamById(this.$route.params.screamId);
    }
  },
  created: function() {
    this.fetchScreams();
  },
  methods: {
    editScream: function() {
      const scream = this.scream;
      this.$store.dispatch("editScream", scream);
    },
    fetchScreams: function() {
      this.$store.dispatch("fetchScreams");
    }
  }
};
</script>
