import React from 'react';

const CategoryControls = (props) => {
	const changeHandler = (e) => {
		props.updateCategory(e.target.value)
	}

	return (
		<div className="main-controls">
			<button onClick={props.presentModal}>Add New Post</button>
			{props.categories.length > 0 && (
				<select onChange={changeHandler} defaultValue={props.selectedCategory ? props.selectedCategory : "All"}>
					<option value="All">All</option>
					{props.categories.map(category => (
						<option value={category.name} key={category.name}>{category.name.substr(0,1).toUpperCase() + category.name.substr(1)}</option>
					))}
				</select>
			)}
		</div>
	)
}

export default CategoryControls