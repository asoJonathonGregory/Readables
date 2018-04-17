import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as api from '../ReadablesAPI';
import { FaEdit, FaEraser, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';

const Post = (props) => {
	const info = props.info
	const addVote = function() {
		api.changePostVote(info.id, 'up').then(post => {
			props.updateVotes(post)
		})
	}

	const subtractVote = function () {
		api.changePostVote(info.id, 'down').then(post => {
			props.updateVotes(post)
		})
	}

	const deletePost = function() {
		api.deletePost(info.id).then(post => {
			props.deletePost(post.id)
		})
	}

	const editPost = function() {
		props.editPost(info.id, info.title, info.body, info.author)
	}

	return (
		<div className="post">
			<div className="post-content">
				<p className="post-title">{info.title}</p>
				<p className="post-body">{info.body}</p>
			</div>
			<div className="post-footer">
				<div className="post-footer-top-row">
					<span className="post-comment-count"># of Comments: {info.commentCount}</span>
					<span>
						<button onClick={addVote} title="Vote Up">
							<FaThumbsOUp />
						</button>
						<span className="post-vote-score">{info.voteScore}</span>
						<button onClick={subtractVote} title="Vote Down">
							<FaThumbsODown />
						</button>
					</span>
				</div>
				<div className="post-footer-bottom-row">
					<p className="post-author">-{info.author}</p>
					<div className="post-controls">
						<button onClick={editPost} title="Edit">
							<FaEdit />
						</button>
						{props.showPostLink && <Link to={`/${info.category}/${info.id}`}>View Post</Link>}
						<button onClick={deletePost} title="Erase">
							<FaEraser />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = () => {
	return { }
}

const mapDispatchToProps = dispatch => ({
	deletePost: id => dispatch(actions.deletePost(id)),
	updateVotes: post => dispatch(actions.updatePostVote(post))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Post)