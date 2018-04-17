import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../ReadablesAPI'
import * as actions from '../actions'
import Post from './Post'
import Comment from './Comment'
import CommentModal from './CommentModal'
import sortBy from 'sort-by'

class PostDetail extends Component {
	state = {
		modalContent: {
			body: '',
			author: '',
			id: ''
		},
		modalShowing: false
	}

	componentDidMount() {
		api.getComments(this.props.post.id).then(comments => {
			this.props.loadComments(comments)
		})
	}

	deleteComment = (id) => {
		fetch(`http://localhost:3001/comments/${id}`, {
			headers: {
				'Authorization': 'Things and Stuff',
			},
			method: 'DELETE'
		}).then(data => {
			this.setState(prevState => ({
				comments: prevState.comments.filter(comments => comments.id !== id),
			}))
			this.props.updateCommentCount("delete", this.props.post.id)
		})
	}

	handleSubmit = (id, body, author) => {
		id === ""
			? api.newComment(body, author, this.props.post.id).then(comment => this.props.addComment(comment))
			: api.editComment(id, body).then(comment => {
				this.props.editComment(comment)
			})
		this.closeCommentModal()
	}

	submitEditedComment = (id, body) => {
		fetch(`http://localhost:3001/comments/${id}`, {
			headers: {
				'Authorization': 'Things and Stuff',
				'Content-Type': 'application/json'
			},
			method: 'PUT',
			body: JSON.stringify({
				"body": body,
				"timestamp": Date.now()
			})
		})
			.then(data => data.json())
			.then(data => {
				this.setState(prevState => ({
					comments: prevState.comments.filter(comment => comment.id !== id).concat([data]).sort(sortBy('timestamp')),
					modalContent: {
						body: '',
						author: '',
						id: ''
					},
					modalShowing: false
				}))
			})
	}

	submitNewComment = (body, author) => {
		fetch('http://localhost:3001/comments', {
			headers: {
				'Authorization': 'Things and Stuff',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				"id": Math.random().toString(36).substr(2, 9),
				"timestamp": Date.now(),
				"body": body,
				"author": author,
				"parentId": this.props.post.id
			})
		})
			.then(data => data.json())
			.then(data => {
				this.setState(prevState => ({
					comments: prevState.comments.concat([data]).sort(sortBy('timestamp')),
					modalContent: {
						body: '',
						author: '',
						id: ''
					},
					modalShowing: false
				}))
				this.props.updateCommentCount("add", this.props.post.id)
			})
	}

	showCommentModal = () => {
		this.setState({
			modalShowing: true
		})
	}

	closeCommentModal = () => {
		this.setState({
			modalContent: {
				body: "",
				author: "",
				id: ""
			},
			modalShowing: false
		})
	}

	populateModal = (id, body, author) => {
		this.setState({
			modalContent: {
				body,
				author,
				id,
			},
			modalShowing: true
		})
	}

	render() {
		return (
			<div className="single-post">
				<Post showPostLink={false} info={this.props.post} populateModal={this.props.populateModal} changeVote={this.props.changeVote} deletePost={this.props.deletePost} />
				<div className="new-post-container">
					<button onClick={this.showCommentModal} className="new-post">Reply</button>
				</div>
				<div className="comment-container">
					{this.props.comments.map(comment => (
						<Comment editComment={this.populateModal} key={comment.id} changeCommentVote={this.changeCommentVote} comment={comment} />
					))}
				</div>
				{this.state.modalShowing && <CommentModal handleSubmit={this.handleSubmit} closeModal={this.closeCommentModal} id={this.state.modalContent.id} body={this.state.modalContent.body} author={this.state.modalContent.author} />}
			</div>
		)
	}
}

const mapStateToProps = ({ comments }) => {
	return {
		comments
	}
}

const mapDispatchToProps = dispatch => ({
	loadComments: comments => dispatch(actions.getComments(comments)),
	editComment: comment => dispatch(actions.editComment(comment)),
	addComment: comment => dispatch(actions.addComment(comment, 'add'))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetail)