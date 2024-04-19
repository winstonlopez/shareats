import express from 'express';
const app = express();
import cors from 'cors';
import recipeRouter from './routes/recipes';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

console.log('connecting to mongodb');

mongoose.connect("mongodb+srv://tonkatsu:han3kawatsubasA@cluster0.7vpwdep.mongodb.net/Recipes?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to mongodb');
    }).catch(error => console.log(error.message));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use(express.static('dist'));
app.use('/api/recipes', recipeRouter);

export default app;