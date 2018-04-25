import React, {	Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import * as actions from '../actions';
import MainHeader from './MainHeader';
import MainPage from './MainPage';
import CategoryControls from './CategoryControls';
import CategoryPage from './CategoryPage';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import '../App.css';

const history = createBrowserHistory();
const defaultState = {
	modalContent: {
		title: "",
		body: "",
		author: "",
		id: "",
		category: ""
	},
	modalShowing: false
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = defaultState
	}

	componentDidMount() {
		// eslint-disable-next-line
		history.location.pathname.split('/')[1] === "All" ? history.push('/') : null;
		this.props.loadPosts()
		this.props.loadCategories()
	}

	showModal = () => {
		this.setState({
			modalShowing: true
		})
	}

	closeModal = () => {
		this.setState(defaultState)
	}

	populateModal = ({id, title, body, author, category}) => {
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
							<MainPage posts={this.props.posts} populateModal={this.populateModal} />
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
					
					{this.state.modalShowing && <PostModal categories={this.props.categories} closeModal={this.closeModal} id={this.state.modalContent.id} title={this.state.modalContent.title} body={this.state.modalContent.body} author={this.state.modalContent.author} category={this.state.modalContent.category} />}
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
	loadPosts: () => dispatch(actions.loadPosts()),
	loadCategories: () => dispatch(actions.loadCategories()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)