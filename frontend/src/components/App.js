import React, {	Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import * as actions from '../actions';
import * as api from '../ReadablesAPI';
import MainHeader from './MainHeader';
import MainPage from './MainPage';
import CategoryControls from './CategoryControls';
import CategoryPage from './CategoryPage';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import '../App.css';

const history = createBrowserHistory();

class App extends Component {
	constructor(props) {
		super(props);
		// eslint-disable-next-line
		history.location.pathname.split('/')[1] === "All" ? history.push('/') : null;

		this.state = {
			modalContent: {
				title: "",
				body: "",
				author: "",
				id: "",
				category: ""
			},
			modalShowing: false
		}
	}

	componentDidMount() {
		api.getPosts()
			.then(posts => {
				this.props.loadPosts(posts)
			})
		api.getCategories()
			.then(categories => {
				this.props.loadCategories(categories)
			})
	}

	handleSubmit = (id, title, body, author, category) => {
		id === "" 
			? api.newPost(title, body, author, category).then(post => this.props.addPost(post))
			: api.editPost(id, title, body).then(post => {
				console.log(post)
				this.props.editPost(post)}
			)
		this.closeModal()
	}

	showModal = () => {
		this.setState({
			modalShowing: true
		})
	}

	closeModal = () => {
		this.setState({
			modalContent: {
				title: "",
				body: "",
				author: "",
				id: "",
				category: ""
			},
			modalShowing: false
		})
	}

	populateModal = (id, title, body, author, category) => {
		this.setState({
			modalContent: {
				title,
				body,
				author,
				id,
				category,
			},
			modalShowing: true
		})
	}

	updateCategory = (category) => {
		category === "All" ? history.push('/') : history.push(`/${category}`)
	}

	updateCommentCount = (action, id) => {
		let postToModify = this.state.posts.filter(post => post.id === id)[0]
		action === "add" ? postToModify.commentCount++ : postToModify.commentCount--
		this.setState(prevState => ({
			posts: prevState.posts.filter(post => post.id !== id).concat([postToModify])
		}))
	}

	render() {
		return (
			<Router history={history}> 
				<div className="App">
					<div className="head-section">
						<Route exact path="/" render={({match}) => (
							<div>
								<MainHeader />
								<CategoryControls selectedCategory={match.params.category} updateCategory={this.updateCategory} categories={this.props.categories} presentModal={this.showModal} />
							</div>
						)} />
						<Route exact path="/:category" render={({ match }) => (
							<div>
								<h1>Category: <span className="category-name">{match.params.category}</span></h1>
								<CategoryControls selectedCategory={match.params.category} updateCategory={this.updateCategory} categories={this.props.categories} presentModal={this.showModal}  />
							</div>
						)} />
						<Route exact path="/:category/:id" render={({ match }) => {
							const post = this.props.posts.filter(post => post.id === match.params.id)[0] || {};
							
							return (
								<div className="main-controls">
									<h1>{post.title}</h1>
									<Link to="/">Back to Main</Link>
								</div>
							)
						}} />
					</div>
					<div className="body-section">
						<Route exact path="/" render={() => (
							<MainPage posts={this.props.posts} populateModal={this.populateModal} changeVote={this.changeVote} />
						)} />
						<Route exact path="/:category" render={({match}) => (
							<CategoryPage posts={this.props.posts.filter(post => post.category === match.params.category)} />
						)} />
						<Route exact path="/:category/:id" render={({ match }) => {
							return this.props.posts.length > 0 
										? <PostDetail post={this.props.posts.filter(post => post.id === match.params.id)[0]} populateModal={this.populateModal} updateCommentCount={this.updateCommentCount} changeVote={this.changeVote} /> 
										: null
						}} />
					</div>
					
					{this.state.modalShowing && <PostModal categories={this.props.categories} handleSubmit={this.handleSubmit} closeModal={this.closeModal} id={this.state.modalContent.id} title={this.state.modalContent.title} body={this.state.modalContent.body} author={this.state.modalContent.author} category={this.state.modalContent.category} />}
				</div>
			</Router>
		);
	}
}

const mapStateToProps = ({ posts, categories }) => {
	return {
		posts,
		categories,
	}
}

const mapDispatchToProps = dispatch => ({
	loadPosts: posts => dispatch(actions.getPosts(posts)),
	loadCategories: categories => dispatch(actions.getCategories(categories)),
	editPost: post => dispatch(actions.editPost(post)),
	addPost: post => dispatch(actions.addPost(post))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)