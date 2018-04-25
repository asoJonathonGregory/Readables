import React, { Component } from 'react'
import { connect } from 'react-redux'
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
		const { post, loadComments } = this.props
		// eslint-disable-next-line
		post 
			? loadComments(post.id)
			: null
	}

	componentWillUnmount() {
		this.props.clearComments()
	}

	handleSubmit = (comment) => {
		const { post, submitComment } = this.props
		comment.parentId = post.id
		submitComment(comment)
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
	loadComments: id => dispatch(actions.loadComments(id)),
	submitComment: (comment) => dispatch(actions.submitComment(comment)),
	clearComments: () => dispatch(actions.clearComments())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetail)