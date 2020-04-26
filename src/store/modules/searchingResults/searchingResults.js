const state = {
	searchingResults:{
		users: null,
		screams: null
	}
};

const mutations = {
	setSearchingResults(state, searchingResults){
		state.searchingResults = searchingResults;
	}
};

const getters = {
	getSearchingResults(state){
		return state.searchingResults;
	}
};

export default{
	state, mutations, getters
};