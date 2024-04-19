/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import jwt from 'jsonwebtoken';
import bcrpt from 'bcrypt';
import express from 'express';
import User from '../models/user';

interface userInfo {
    username: string;
    password: string
}

const logingRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
logingRouter.post('/', async (req, res) => {

    const { username, password }: userInfo = req.body as userInfo;

    const user = await User.findOne({ username });
    const passwordCorrect = user === null
        ? false
        : await bcrpt.compare(password, user.passwordHash);

    if (!user && !passwordCorrect){
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }else {

        const userForToken = {
            username: user?.username,
            id: user?._id
        };
    
        const token = jwt.sign(userForToken, 'thesecret');
        
        return res.status(200).send({ token, username: user?.username, userId: user?.id });

    }

});