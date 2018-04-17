import React from 'react';
import Post from './Post';

const CategoryPage = (props) => (
	<div className="post-container">
		{props.posts.map(post => {
			return <Post showPostLink={true} deletePost={props.deletePost} editPost={props.populateModal} changeVote={props.changeVote} key={post.id} info={post} />
		})}
	</div>
)

export default CategoryPage