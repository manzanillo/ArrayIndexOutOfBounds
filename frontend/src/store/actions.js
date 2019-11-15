export default {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => [],
    // ensure all active items are fetched
    ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => ({}),

    FETCH_ITEMS: ({ commit, state }, { ids }) =>
        // on the client, the store itself serves as a cache.
        // only fetch items that we do not already have, or has expired (3 minutes)
        [],

    FETCH_USER: ({ commit, state }, { id }) => ({})
};
