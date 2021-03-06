import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class PostModal extends Component {
	state = {
		id: this.props.id,
		title: this.props.title,
		body: this.props.body,
		author: this.props.author,
		category: this.props.category
	}

	changeHandler = (e) => {
		this.setState({
			category: e.target.value
		})
	}

	handleTitleInput = (e) => {
		this.setState({
			title: e.target.value
		})
	}
	
	handleBodyinput = (e) => {
		this.setState({
			body: e.target.value
		})
	}

	handleAuthorInput = (e) => {
		this.setState({
			author: e.target.value
		})
	}

	savePost = () => {
		this.props.submitPost(this.state);
		this.props.closeModal();
	}

	render() {
		return (
			<div id="postModalContainer">
				<div id="postModalOverlay"></div>
				<div id="postModal">
					<div className="input-group">
						<label htmlFor="postTitle">Title</label>
						<input onChange={this.handleTitleInput} type="text" id="postTitle" value={this.state.title} />
					</div>
					<div className="input-group">
						<label htmlFor="postBody">Body</label>
						<input onChange={this.handleBodyinput} type="text" id="postBody" value={this.state.body} />
					</div>
					<div className="input-group">
						<label htmlFor="postAuthor">Author</label>
						<input disabled={this.props.id === "" ? false : true} onChange={this.handleAuthorInput} type="text" id="postAuthor" value={this.state.author} />
					</div>
					{this.props.categories.length > 0 && (
						<select onChange={this.changeHandler} defaultValue={this.state.category}>
							<option disabled value="">Select a Category</option>
							{this.props.categories.map(category => (
								<option value={category.name} key={category.name}>{category.name.substr(0, 1).toUpperCase() + category.name.substr(1)}</option>
							))}
						</select>
					)}
					<button onClick={this.savePost} id="postSave">Save</button>
					<button onClick={this.props.closeModal} id="modalClose">X</button>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	submitPost: post => dispatch(actions.submitPost(post))
})

export default connect(
	null,
	mapDispatchToProps
)(PostModal);