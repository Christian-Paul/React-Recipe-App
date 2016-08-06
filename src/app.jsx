import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';

var Recipe = React.createClass({
	getInitialState: function() {
		return {editing: false};
	},
	edit: function() {
		this.setState({editing: true});
	},
	remove: function() {
		this.props.removeRecipe(this.props.index);
	},
	save: function() {
		this.setState({editing: false});
		this.props.changeRecipe(this.refs.newText.value, this.refs.newIngredients.value, this.props.index);
	},
	cancel: function() {
		this.setState({editing: false});
	},
	renderDefault: function() {
		return (
			<div className='recipe-container'>
				<div className='recipe-name'>{this.props.children.name}</div>
				<div>{this.props.children.ingredients}</div>
				<button onClick={this.edit}>Edit</button>
				<button onClick={this.remove}>Delete</button>
			</div>
		);
	},
	renderEditing: function() {
		return (
			<div className='recipe-container'>
				<textarea ref='newText' defaultValue={this.props.children.name} className='edit-recipe-details'></textarea>
				<textarea ref='newIngredients' defaultValue={this.props.children.ingredients}></textarea>
				<button onClick={this.save}>Save</button>
				<button onClick={this.cancel}>Cancel</button>
			</div>
		);
	},
	render: function() {
		if(this.state.editing) {
			return this.renderEditing();
		} else {
			return this.renderDefault();
		}
	}
});

var RecipeBoard = React.createClass({
	getInitialState: function() {
		localStorage.clear();
		if(!localStorage.recipes) {
			localStorage.recipes = JSON.stringify([
				{name: 'Macaroni Pie', ingredients: 'Macaroni'}, 
				{name: 'Roti', ingredients: 'Flour'}
				]);
		}
		var myRecipes = JSON.parse(localStorage.recipes);
		return {
			recipes: myRecipes
		}
	},
	addRecipe: function() {
		var tempRecipes = JSON.parse(localStorage.recipes);
		tempRecipes.push({name: 'Recipe Name', ingredients: 'Recipe Ingredients'});
		this.setState({recipes: tempRecipes});
		localStorage.recipes = JSON.stringify(tempRecipes);
	},
	changeRecipe: function(newRecipe, newIngredients, i) {
		var tempRecipes = JSON.parse(localStorage.recipes);
		tempRecipes.splice(i, 1, {name: newRecipe, ingredients: newIngredients});
		this.setState({recipes: tempRecipes});
		localStorage.recipes = JSON.stringify(tempRecipes);
	},
	removeRecipe: function(i) {
		var tempRecipes = JSON.parse(localStorage.recipes);
		tempRecipes.splice(i, 1);
		this.setState({recipes: tempRecipes});
		localStorage.recipes = JSON.stringify(tempRecipes);
	},
	eachRecipe: function(item, i) {
		return (
			<Recipe key={i} index={i} changeRecipe={this.changeRecipe} removeRecipe={this.removeRecipe}>
				{item}
			</Recipe>
		);
	},
	render: function() {
		return (
			<div className='recipe-board'>
				<h1>My Recipes</h1>
				<button onClick={this.addRecipe}>Add Recipe</button>
				{
					this.state.recipes.map(this.eachRecipe)
				}
			</div>
		);
	}
});

ReactDOM.render(<RecipeBoard />, document.getElementById('main'));