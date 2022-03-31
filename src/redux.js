import { configureStore, createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"storage",
    initialState:[window.localStorage.movies ? window.localStorage.movies.split(",") : []],
    reducers: {
        addStorage: (state, action) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
                window.localStorage.movies = state;
            } else {
            console.log("déjà fait");
            }
            return state;
        },
        deleteStorage: (state, action) =>  {
            let newData = state.filter((id) => id != action.payload);
            window.localStorage.movies = newData;
            state = newData;
            state = state.filter((id) => id != action.payload);
        },
    },
});
export const { addStorage, deleteStorage } = movieSlice.actions;

export const store = configureStore({
    reducer: {
        storage: movieSlice.reducer,
    }
});
