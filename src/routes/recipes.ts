/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import Recipe from '../models/recipe';

const recipeRouter = express.Router();


recipeRouter.get('/', async (req, res) => {
    const recipes = await Recipe.find({});
    console.log(recipes);
    console.log(req.method);
    res.json(recipes);
});

recipeRouter.post('/', (req, res) => {
    console.log(req.method, req.body);
    const {recipeName, ingredients, snap, procedure } = req.body;
    
    const recipe = new Recipe({
        recipeName,
        ingredients,
        snap,
        procedure
    });

    recipe.save().then(data => {
        console.log(data);
        res.status(201).json(data);
    }).catch(error => console.log(error));
});

export default recipeRouter;