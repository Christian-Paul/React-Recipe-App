import React from 'react';

export const NewRecipe = React.createClass({
	addRecipe: function() {
		this.props.addRecipe(this.refs.newRecipeName.value, this.refs.newRecipeIngredients.value);
	},
	render: function() {
		return (
			<div className='modal-container'>
				<div className='modal-new-recipe'>
					<label>Recipe Name:</label>
					<input type='text' ref='newRecipeName'></input>
					<label>Ingredients:</label>
					<textarea ref='newRecipeIngredients'></textarea>
					<button onClick={this.addRecipe}>Submit</button>
					<button onClick={this.props.toggleAdding}>Cancel</button>
				</div>
			</div>
		)
	}
});