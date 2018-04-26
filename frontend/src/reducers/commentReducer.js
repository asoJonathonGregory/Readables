import {
    GET_COMMENTS,
    CLEAR_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    CHANGE_COMMENT_VOTE,
    DELETE_COMMENT
} from "../actions/types";
import sortBy from "sort-by";

const initialState = [];

export function comments(state = initialState, action) {
    const { comment, comments } = action;
    switch (action.type) {
        case GET_COMMENTS:
            return comments.sort(sortBy("timestamp"));

        case CLEAR_COMMENTS:
            return initialState;

        case ADD_COMMENT:
            return state.concat([comment]).sort(sortBy("timestamp"));

        case EDIT_COMMENT:
            return state
                .filter(c => c.id !== comment.id)
                .concat([comment])
                .sort(sortBy("timestamp"));

        case CHANGE_COMMENT_VOTE:
            return state
                .filter(c => c.id !== comment.id)
                .concat([comment])
                .sort(sortBy("timestamp"));

        case DELETE_COMMENT:
            return state.filter(c => c.id !== comment.id);

        default:
            return state;
    }
}
