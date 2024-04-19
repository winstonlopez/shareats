import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: String,
        }
    ],
    snap: {
        type: String
    },
    procedure: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

recipeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const recipe = mongoose.model('Recipe', recipeSchema);

export default recipe;