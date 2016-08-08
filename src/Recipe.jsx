import React from 'react';

export const Recipe = React.createClass({
	getInitialState: function() {
		// name and ingredients initially set to props so that those same values are sent back if they're never changed
		return {editing: false, show: false, name: this.props.children.name, ingredients: this.props.children.ingredients};
	},
	edit: function() {
		this.setState({editing: true});
	},
	remove: function() {
		this.props.removeRecipe(this.props.index);
	},
	save: function() {
		this.setState({editing: false});
		this.props.changeRecipe(this.state.name, this.state.ingredients, this.props.index);
	},
	cancel: function() {
		this.setState({editing: false});
	},
	toggleShowIngredients: function() {
		this.setState({show: !this.state.show});
	},
	handleNameChange: function(e) {
		this.setState({name: e.target.value});
	},
	handleIngredientsChange: function(e) {
		this.setState({ingredients: e.target.value});
	},
	renderDefault: function() {
		return (
			<div className='recipe-container'>
				<div onClick={this.toggleShowIngredients} className='recipe-name'>{this.props.children.name}</div>
			</div>
		);
	},
	renderDefaultShow: function() {
		return (
			<div className='recipe-container'>
				<div onClick={this.toggleShowIngredients} className='recipe-name'>{this.props.children.name}</div>
				<div>{this.props.children.ingredients}</div>
				<button onClick={this.edit}>Edit</button>
				<button onClick={this.remove}>Delete</button>
			</div>
		);
	},
	renderEditing: function() {
		return (
			<div className='recipe-container'>
				<input type='text' onChange={this.handleNameChange} defaultValue={this.props.children.name} className='edit-recipe-details'></input>
				<textarea onChange={this.handleIngredientsChange} defaultValue={this.props.children.ingredients}></textarea>
				<button onClick={this.save}>Save</button>
				<button onClick={this.cancel}>Cancel</button>
			</div>
		);
	},
	render: function() {
		if(this.state.editing) {
			return this.renderEditing();
		} else {
			if(this.state.show) {
				return this.renderDefaultShow();
			} else {
				return this.renderDefault();
			}
		}
	}
});