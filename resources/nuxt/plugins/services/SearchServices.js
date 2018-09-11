class SearchServices {

    constructor(){
    }

    changeSearchRoute(route, router, query){
        if (route.name === 'stories') {
            router.push({path: '/stories?'+query});
        } else {
            router.push({path: '/videos?'+query});
        }
    }

    populateSearchStore(store, route){
        if(route.query.page && route.query.page > 1){
            store.commit('setSearchPage', route.query.page);
        }

        if(route.query.search && route.query.search !== ''){
            store.commit('setSearchByTitle',route.query.search)
        }

        if(route.query.minLength && route.query.minLength > 0){
            store.commit('setSearchByMiniLength', route.query.minLength);
        }

        if(route.query.maxLength && route.query.maxLength > 0){
            store.commit('setSearchByMaxLength', route.query.maxLength);
        }

        if(route.query.tags && route.query.tags !== ''){
            let tags = route.query.tags.split(',');
            store.commit('setSearchByTags', tags)
        }

        if(route.query.sortBy && route.query.sortBy !== ''){
            store.commit('setSortBy', route.query.sortBy)
        }
    }
}

export default SearchServices = new SearchServices();
