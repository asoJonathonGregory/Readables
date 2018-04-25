const headers = {
	'Authorization': 'Things and Stuff',
	'Content-Type': 'application/json'
}

export const getPosts = () => {
	return fetch('http://localhost:3001/posts', {
		headers: headers,
		method: 'GET'
	})
	.then(data => data.json())
	.then(data => data)
}

export function getCategories() {
	return fetch('http://localhost:3001/categories', {
		headers: headers,
		method: 'GET'
	})
	.then(data => data.json())
	.then(data => data.categories)
}

export function getComments(id) {
	return fetch(`http://localhost:3001/posts/${id}/comments`, {
		headers: headers,
		method: "GET"
	})
	.then(data => data.json())
	.then(data => {
		return data
	})
}

export function changePostVote(id, typeOfVote) {
	return fetch(`http://localhost:3001/posts/${id}`, {
		headers: headers,
		method: 'POST',
		body: JSON.stringify({
			"option": typeOfVote === 'up' ? 'upVote' : 'downVote'
		})
	})
	.then((data) => data.json())
	.then(data => data)
}

export function changeCommentVote(id, typeOfVote) {
	console.log(id, typeOfVote)
	return fetch(`http://localhost:3001/comments/${id}`, {
		headers: headers,
		method: 'POST',
		body: JSON.stringify({
			"option": typeOfVote === 'up' ? 'upVote' : 'downVote'
		})
	})
	.then(data => data.json())
	.then((data) => data)
}

export function deletePost(id) {
	return fetch(`http://localhost:3001/posts/${id}`, {
		headers: headers,
		method: 'DELETE'
	})
	.then(data => data.json())
	.then(data => data)
}

export function deleteComment(comment) {
	return fetch(`http://localhost:3001/comments/${comment.id}`, {
		headers: headers,
		method: 'DELETE'
	})
	.then(data => data.json())
	.then(data => {
		console.log(data)
		return data
	})
}

export function newPost({title, body, author, category}) {
	return fetch('http://localhost:3001/posts', {
		headers: headers,
		method: 'POST',
		body: JSON.stringify({
			"id": Math.random().toString(36).substr(2, 9),
			"timestamp": Date.now(),
			"title": title,
			"body": body,
			"author": author,
			"category": category
		})
	})
	.then(data => data.json())
	.then(data => data)
}

export function newComment({body, author, parentId}) {
	return fetch('http://localhost:3001/comments', {
		headers: headers,
		method: 'POST',
		body: JSON.stringify({
			"id": Math.random().toString(36).substr(2, 9),
			"timestamp": Date.now(),
			"body": body,
			"author": author,
			"parentId": parentId
		})
	})
	.then(data => data.json())
	.then(data => data)
}

export function editPost({id, title, body}) {
	return fetch(`http://localhost:3001/posts/${id}`, {
		headers: headers,
		method: 'PUT',
		body: JSON.stringify({
			"title": title,
			"body": body,
			"timestamp": Date.now()
		})
	})
	.then(data => data.json())
	.then(data => data)
}

export function editComment({id, body}) {
	return fetch(`http://localhost:3001/comments/${id}`, {
		headers: headers,
		method: 'PUT',
		body: JSON.stringify({
			"body": body,
			"timestamp": Date.now()
		})
	})
	.then(data => data.json())
	.then(data => data)
}