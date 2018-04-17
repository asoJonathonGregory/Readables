import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../ReadablesAPI'
import * as actions from '../actions'
import { FaEdit, FaEraser, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa'

class Comment extends Component {
	addVote = () => {
		api.changeCommentVote(this.props.comment.id, 'up').then(comment => this.props.updateVotes(comment))
	}

	subtractVote = () => {
		api.changeCommentVote(this.props.comment.id, 'down').then(comment => this.props.updateVotes(comment))
	}

	deleteComment = () => {
		api.deleteComment(this.props.comment).then(comment => this.props.deleteComment(comment))
		
	}

	editComment = () => {
		this.props.editComment(this.props.comment.id, this.props.comment.body, this.props.comment.author, this.props.parentId)
	}

	render() {
		return (
			<div className="comment">
				<div className="comment-content">
					<p className="comment-body">{this.props.comment.body}</p>
				</div>
				<div className="comment-footer">
					<div className="comment-footer-top-row">
						<p className="comment-author">-{this.props.comment.author}</p>
						<span>
							<button onClick={this.addVote} title="Vote Up">
								<FaThumbsOUp />
							</button>
							<span className="comment-vote-score">{this.props.comment.voteScore}</span>
							<button onClick={this.subtractVote} title="Vote Down">
								<FaThumbsODown />
							</button>
						</span>
					</div>
					<div className="comment-footer-bottom-row">
						
						<div className="comment-controls">
							<button onClick={this.editComment} title="Edit">
								<FaEdit />
							</button>
							<button onClick={this.deleteComment} title="Erase">
								<FaEraser />
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = dispatch => ({
	deleteComment: comment => dispatch(actions.deleteComment(comment, comment.parentId, 'delete')),
	updateVotes: comment => dispatch(actions.updateCommentVote(comment, comment.parentId))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comment)