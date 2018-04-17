import React from 'react';
import Post from './Post';

const MainPage = (props) => (
	<div className="post-container">
		{props.posts.map(post => {
			return <Post showPostLink={true} editPost={props.populateModal} changeVote={props.changeVote} key={post.id} info={post} />
		})}
	</div>
)

export default MainPage