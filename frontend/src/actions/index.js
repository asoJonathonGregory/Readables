export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CHANGE_POST_VOTE = 'CHANGE_POST_VOTE'
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getPosts(posts) {
	return {
		type: GET_POSTS,
		posts
	}
}

export function getCategories(categories) {
	return {
		type: GET_CATEGORIES,
		categories
	}
}

export function getComments(comments) {
	return {
		type: GET_COMMENTS,
		comments
	}
}

export function addPost(post) {
	return {
		type: ADD_POST,
		post
	}
}

export function addComment(comment, addOrSubtract) {
	return {
		type: ADD_COMMENT,
		comment,
		addOrSubtract
	}
}

export function editPost(post) {
	return {
		type: EDIT_POST,
		post
	}
}

export function editComment(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export function updatePostVote(post) {
	return {
		type: CHANGE_POST_VOTE,
		post
	}
}

export function updateCommentVote(comment) {
	return {
		type: CHANGE_COMMENT_VOTE,
		comment
	}
}

export function deletePost(id) {
	return {
		type: DELETE_POST,
		id
	}
}

export function deleteComment(comment, addOrSubtract) {
	return {
		type: DELETE_COMMENT,
		comment,
		addOrSubtract
	}
}