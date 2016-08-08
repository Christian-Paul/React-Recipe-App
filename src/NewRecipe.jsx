import React from 'react';

export const NewRecipe = React.createClass({
	getInitialState: function() {
		return {name: '', ingredients: ''}
	},
	handleNameChange: function(e) {
		this.setState({name: e.target.value})
	},
	handleIngredientsChange: function(e) {
		this.setState({ingredients: e.target.value})
	},
	addRecipe: function() {
		this.props.addRecipe(this.state.name, this.state.ingredients);
	},
	render: function() {
		return (
			<div className='modal-container'>
				<div className='modal-new-recipe'>
					<label>Recipe Name:</label>
					<input type='text' onChange={this.handleNameChange}></input>
					<label>Ingredients:</label>
					<textarea onChange={this.handleIngredientsChange}></textarea>
					<button onClick={this.addRecipe}>Submit</button>
					<button onClick={this.props.toggleAdding}>Cancel</button>
				</div>
			</div>
		)
	}
});