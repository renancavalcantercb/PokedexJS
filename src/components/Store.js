import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    pokemonList: [],
};

function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_POKEMON_LIST':
            return { ...state, pokemonList: action.payload };
        default:
            return state;
    }
}

const store = configureStore({
    reducer: pokemonReducer,
});

export default store;
