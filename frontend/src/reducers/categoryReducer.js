import { GET_CATEGORIES } from "../actions/types";

const initialState = [];

export function categories(state = initialState, action) {
    const { categories } = action;
    switch (action.type) {
        case GET_CATEGORIES:
            return state.concat(categories);

        default:
            return state;
    }
}
