import * as API from '../ReadablesAPI'

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
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'

function getPosts(posts) {
	return {
		type: GET_POSTS,
		posts
	}
}

function addPost(post) {
	return {
		type: ADD_POST,
		post
	}
}

function editPost(post) {
	return {
		type: EDIT_POST,
		post
	}
}

function deletePost(id) {
	return {
		type: DELETE_POST,
		id
	}
}

function updatePostVote(post) {
	return {
		type: CHANGE_POST_VOTE,
		post
	}
}

export const loadPosts = () => dispatch => {
	API.getPosts().then(posts => dispatch(getPosts(posts)))
}

export const submitPost = (post) => dispatch => {
	const { id, category, author, title, body } = post
	id === ""
		? API.newPost({ author, category, title, body }).then(post => dispatch(addPost(post)))
		: API.editPost({ id, title, body }).then(post => dispatch(editPost(post)))
}

export const removePost = (id) => dispatch => {
	API.deletePost(id).then(dispatch(deletePost(id)))
}

export const changePostVote = (id, typeOfVote) => dispatch => {
	API.changePostVote(id, typeOfVote).then(post => dispatch(updatePostVote(post)))
}





function getCategories(categories) {
	return {
		type: GET_CATEGORIES,
		categories
	}
}

export const loadCategories = () => dispatch => {
	API.getCategories().then(categories => dispatch(getCategories(categories)))
}





function getComments(comments) {
	return {
		type: GET_COMMENTS,
		comments
	}
}

export function clearComments() {
	return {
		type: CLEAR_COMMENTS
	}
}

function addComment(comment, addOrSubtract) {
	return {
		type: ADD_COMMENT,
		comment,
		addOrSubtract
	}
}

function editComment(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

function deleteComment(comment, addOrSubtract) {
	return {
		type: DELETE_COMMENT,
		comment,
		addOrSubtract
	}
}

function updateCommentVote(comment) {
	return {
		type: CHANGE_COMMENT_VOTE,
		comment
	}
}

export const loadComments = id => dispatch => {
	API.getComments(id).then(comments => dispatch(getComments(comments)))
}

export const submitComment = comment => dispatch => {
	const { id, body, author, parentId } = comment
	id === ""
		? API.newComment({body, author, parentId}).then(comment => dispatch(addComment(comment, 'add')))
		: API.editComment({id, body}).then(comment => dispatch(editComment(comment)))
}

export const removeComment = comment => dispatch => {
	API.deleteComment(comment).then(dispatch(deleteComment(comment, 'delete')))
}

export const changeCommentVote = (id, typeOfVote) => dispatch => {
	API.changeCommentVote(id, typeOfVote).then(comment => dispatch(updateCommentVote(comment)))
}