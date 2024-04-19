"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const recipe_1 = __importDefault(require("../models/recipe"));
const recipeRouter = express_1.default.Router();
recipeRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipe_1.default.find({});
    console.log(recipes);
    console.log(req.method);
    res.json(recipes);
}));
recipeRouter.post('/', (req, res) => {
    console.log(req.method, req.body);
    const { recipeName, ingredients, snap, procedure } = req.body;
    const recipe = new recipe_1.default({
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
exports.default = recipeRouter;
