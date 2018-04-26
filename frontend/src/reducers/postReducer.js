import {
    GET_POSTS,
    ADD_POST,
    EDIT_POST,
    CHANGE_POST_VOTE,
    DELETE_POST,
    ADD_COMMENT,
    DELETE_COMMENT
} from "../actions/types";
import sortBy from "sort-by";

const initialState = [];

export function posts(state = initialState, action) {
    const { posts, post, id, comment, addOrSubtract } = action;
    let parentPost;
    if (comment) {
        parentPost = state.filter(p => p.id === comment.parentId)[0];
    }

    switch (action.type) {
        case GET_POSTS:
            return posts.sort(sortBy("timestamp"));

        case ADD_POST:
            return state.concat([post]).sort(sortBy("timestamp"));

        case EDIT_POST:
            return state
                .filter(p => p.id !== post.id)
                .concat([post])
                .sort(sortBy("timestamp"));

        case CHANGE_POST_VOTE:
            return state
                .filter(p => p.id !== post.id)
                .concat([post])
                .sort(sortBy("timestamp"));

        case DELETE_POST:
            return state.filter(p => p.id !== id);

        case ADD_COMMENT:
        case DELETE_COMMENT:
            addOrSubtract === "add"
                ? (parentPost = Object.assign(
                      { commentCount: parentPost.commentCount++ },
                      parentPost
                  ))
                : (parentPost = Object.assign(
                      { commentCount: parentPost.commentCount-- },
                      parentPost
                  ));

            return state
                .filter(p => p.id !== comment.parentId)
                .concat([parentPost])
                .sort(sortBy("timestamp"));

        default:
            return state;
    }
}
