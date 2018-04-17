import React, { Component } from 'react';

class CommentModal extends Component {
	state = {
		id: this.props.id,
		body: this.props.body,
		author: this.props.author
	}

	handleTitleInput = (e) => {
		this.setState({
			title: e.target.value
		})
	}

	handleBodyInput = (e) => {
		this.setState({
			body: e.target.value
		})
	}

	handleAuthorInput = (e) => {
		this.setState({
			author: e.target.value
		})
	}

	closeModal = () => {
		this.props.closeModal();
	}

	saveComment = () => {
		const { id, body, author } = this.state;
		this.props.handleSubmit(id, body, author);
	}

	render() {
		return (
			<div id="commentModalContainer">
				<div id="commentModalOverlay"></div>
				<div id="commentModal">
					<div className="input-group">
						<label htmlFor="commentBody">Body</label>
						<input onChange={this.handleBodyInput} type="text" id="commentBody" value={this.state.body} />
					</div>
					<div className="input-group">
						<label htmlFor="commentAuthor">Author</label>
						<input disabled={this.props.id === "" ? false : true} onChange={this.handleAuthorInput} type="text" id="commentAuthor" value={this.state.author} />
					</div>
					<button onClick={this.saveComment} id="commentSave">Save</button>
					<button onClick={this.closeModal} id="modalClose">X</button>
				</div>
			</div>
		)
	}
}

export default CommentModal;