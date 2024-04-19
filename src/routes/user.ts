import bcrypt from 'bcrypt';
import usersRouter from 'express';
import User from '../models/user';

interface UserInfo {
    name: string;
    username: string;
    password: string;
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.Router().post('/', async (request, response) => {
    let { username} = request.body as UserInfo;
    const { name, password } = request.body as UserInfo;

    username = username.toLowerCase();
    
    const dupli = await User.findOne({ username });

    if(dupli){
        console.log('duplicate username', dupli);
        response.status(400).json({ error: 'duplicate username'});
        throw new Error('duplicate username');
    }

    console.log(request.body);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

// usersRouter.get('/*', (request, response) => {
//     console.log('caught here')
//     response.sendFile(path.join(__dirname, '../dist/index.html'), (error) => {
//         if(error){
//             console.log(error)
//             response.status(500).send(error)
//         }
//     })
// })


// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.Router().get('/', async (_request, response) => {
    const users = await User
        .find({})
        .populate('notes', {content: 1, likes: 1, user: 1});

    response.json(users);
});





module.exports = usersRouter;