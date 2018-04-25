import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { FaEdit, FaEraser, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa'

class Comment extends Component {

	addVote = () => {
		this.props.updateVotes(this.props.comment.id, 'up')
	}

	subtractVote = () => {
		this.props.updateVotes(this.props.comment.id, 'down')
	}

	deleteComment = () => {
		this.props.deleteComment(this.props.comment)
	}

	editComment = () => {
		this.props.editComment(this.props.comment)
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

const mapDispatchToProps = dispatch => ({
	deleteComment: comment => dispatch(actions.removeComment(comment)),
	updateVotes: (id, typeOfVote) => dispatch(actions.changeCommentVote(id, typeOfVote))
})

export default connect(
	null,
	mapDispatchToProps
)(Comment)