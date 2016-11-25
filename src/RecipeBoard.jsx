import React from 'react';
import {Recipe} from './Recipe.jsx';
import {NewRecipe} from './NewRecipe.jsx';

export const RecipeBoard = React.createClass({
	getInitialState: function() {
		if(!localStorage.recipes) {
			localStorage.recipes = JSON.stringify([
				{name: 'Apple Pie', ingredients: 'Apples, Flour, Water, Heat'}, 
				{name: 'Beef Stew', ingredients: 'Beef, Carrots, Stock'}
				]);
		}
		var myRecipes = JSON.parse(localStorage.recipes);
		return {
			recipes: myRecipes,
			adding: false
		}
	},
	addRecipe: function(recipeName, recipeIngredients) {
		var tempRecipes = JSON.parse(localStorage.recipes);
		tempRecipes.push({name: recipeName || 'Recipe Name', ingredients: recipeIngredients || 'Ingredients'});
		this.setState({recipes: tempRecipes});
		localStorage.recipes = JSON.stringify(tempRecipes);
		this.toggleAdding();
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
	toggleAdding: function() {
		this.setState({adding: !this.state.adding});
	},
	renderAdding: function() {
		return (
			<div className='recipe-board'>
				<div className='title-holder'>
					<h2 className='board-title'>My Recipes</h2>
				</div>
				{
					this.state.recipes.map(this.eachRecipe)
				}
				<NewRecipe addRecipe={this.addRecipe} toggleAdding={this.toggleAdding} />
			</div>
		)
	},
	renderDefault: function() {
		return (
			<div className='recipe-board'>
				<div className='title-holder'>
					<h2 className='board-title'>My Recipes</h2>
				</div>
				{
					this.state.recipes.map(this.eachRecipe)
				}
				<div className='add-button' onClick={this.toggleAdding}>Add Recipe</div>
			</div>
		);
	},
	render: function() {
		if(this.state.adding) {
			return this.renderAdding();
		} else {
			return this.renderDefault();
		}
	}
});