import { posts } from "./postReducer";
import { categories } from "./categoryReducer";
import { comments } from "./commentReducer";
import { combineReducers } from "redux";

export default combineReducers({
    posts,
    categories,
    comments
});
