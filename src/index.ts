import app from './app';

const PORT = 3000;


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});