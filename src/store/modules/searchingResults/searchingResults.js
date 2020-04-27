const state = {
  searchingResults: {
    users: null,
    screams: null
  }
};

const mutations = {
  SET_SEARCHING_RESULTS(state, searchingResults) {
    state.searchingResults = searchingResults;
  },
  RESET_SEARCHING_RESULTS(state) {
    state.searchingResults.users = null;
    state.searchingResults.screams = null;
  }
};

const getters = {
  getSearchingResults(state) {
    return state.searchingResults;
  }
};

export default {
  state,
  mutations,
  getters
};
