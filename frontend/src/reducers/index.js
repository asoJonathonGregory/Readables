import { 
	GET_POSTS,
	GET_CATEGORIES,
	GET_COMMENTS,
	ADD_POST,
	ADD_COMMENT,
	EDIT_POST,
	EDIT_COMMENT,
	CHANGE_POST_VOTE,
	CHANGE_COMMENT_VOTE,
	DELETE_POST,
	DELETE_COMMENT
} from '../actions'

import { combineReducers } from 'redux'
import sortBy from 'sort-by'

function posts(state = [], action) {
	const { posts, post, id, comment, addOrSubtract } = action
	let parentPost
	if (comment) {
		parentPost = state.filter(p => p.id === comment.parentId)[0]
	}
	switch(action.type) {
		case GET_POSTS:
			return posts.sort(sortBy('timestamp'))

		case ADD_POST:
			return state.concat([post]).sort(sortBy('timestamp'))

		case EDIT_POST:
			return state.filter(p => p.id !== post.id).concat([post]).sort(sortBy('timestamp'))

		case CHANGE_POST_VOTE:
			return state.filter(p => p.id !== post.id).concat([post]).sort(sortBy('timestamp'))

		case DELETE_POST:
			return state.filter(p => p.id !== id)

		case ADD_COMMENT:
		case DELETE_COMMENT:
			addOrSubtract === "add" 
				? parentPost = Object.assign({ commentCount: parentPost.commentCount++ }, parentPost) 
				: parentPost = Object.assign({ commentCount: parentPost.commentCount-- }, parentPost)

			return state.filter(p => p.id !== comment.parentId).concat([parentPost]).sort(sortBy('timestamp'))

		default:
			return state
	}
}

function categories(state = [], action) {
	const { categories } = action
	switch(action.type) {
		case GET_CATEGORIES:
			return state.concat(categories)
		
		default:
			return state
	}
}

function comments(state = [], action) {
	const { comment, comments } = action
	switch(action.type) {
		case GET_COMMENTS:
			return comments.sort(sortBy('timestamp'))

		case ADD_COMMENT:
			return state.concat([comment]).sort(sortBy('timestamp'))

		case EDIT_COMMENT:
			return state.filter(c => c.id !== comment.id).concat([comment]).sort(sortBy('timestamp'))

		case CHANGE_COMMENT_VOTE:
			return state.filter(c => c.id !== comment.id).concat([comment]).sort(sortBy('timestamp'))

		case DELETE_COMMENT:
			return state.filter(c => c.id !== comment.id)

		default:
			return state
	}

}

export default combineReducers({
	posts,
	categories,
	comments
})