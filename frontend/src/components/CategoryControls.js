import React from 'react';

const CategoryControls = ({ categories, selectedCategory, updateCategory, presentModal }) => {
	const changeHandler = (e) => {
		updateCategory(e.target.value)
	}

	return (
		<div className="main-controls">
			<button onClick={presentModal}>Add New Post</button>
			{categories.length > 0 && (
				<select onChange={changeHandler} defaultValue={selectedCategory ? selectedCategory : "All"}>
					<option value="All">All</option>
					{categories.map(category => (
						<option value={category.name} key={category.name}>{category.name.substr(0,1).toUpperCase() + category.name.substr(1)}</option>
					))}
				</select>
			)}
		</div>
	)
}

export default CategoryControls