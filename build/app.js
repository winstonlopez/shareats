"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const recipes_1 = __importDefault(require("./routes/recipes"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', false);
console.log('connecting to mongodb');
mongoose_1.default.connect("mongodb+srv://tonkatsu:han3kawatsubasA@cluster0.7vpwdep.mongodb.net/Recipes?retryWrites=true&w=majority")
    .then(() => {
    console.log('connected to mongodb');
}).catch(error => console.log(error.message));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.use('/api/recipes', recipes_1.default);
exports.default = app;
