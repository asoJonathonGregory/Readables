import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../ReadablesAPI'
import * as actions from '../actions'
import Post from './Post'
import Comment from './Comment'
import CommentModal from './CommentModal'

const defaultState = {
	modalContent: {
		body: '',
		author: '',
		id: ''
	},
	modalShowing: false
}

class PostDetail extends Component {
	state = defaultState

	componentDidMount() {
		// eslint-disable-next-line
		this.props.post 
			? api.getComments(this.props.post.id).then(comments => {
				this.props.loadComments(comments)
			})
			: null
	}

	handleSubmit = (id, body, author) => {
		id === ""
			? api.newComment(body, author, this.props.post.id).then(comment => this.props.addComment(comment))
			: api.editComment(id, body).then(comment => {
				this.props.editComment(comment)
			})
		this.closeCommentModal()
	}

	showCommentModal = () => {
		this.setState({
			modalShowing: true
		})
	}

	closeCommentModal = () => {
		this.setState(defaultState)
	}

	populateModal = ({id, body, author}) => {
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
				{this.props.post 
					? <div>
						<Post showPostLink={false} info={this.props.post} editPost={this.props.populateModal} />
						<div className="new-post-container">
							<button onClick={this.showCommentModal} className="new-post">Reply</button>
						</div>
						<div className="comment-container">
							{this.props.comments.map(comment => (
								<Comment editComment={this.populateModal} key={comment.id} comment={comment} />
							))}
						</div>
					</div>
					: <div className="not-found">This Post has been deleted.</div>
				}
				
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