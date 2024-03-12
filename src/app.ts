import 'dotenv/config'
import express, { Application, json } from 'express';
import { connectDb } from './database';
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from './logic';
import { idExist, idExistPatch, nameExist, nameExistPatch } from './middlewares';

const app: Application = express();
app.use(express.json());


app.post('/movies', nameExist, createMovie)
app.get('/movies', getMovies)
app.get('/movies/:id', idExist, getMovieById)
app.patch('/movies/:id', idExist, nameExist, updateMovie)
app.delete('/movies/:id', idExist, deleteMovie)

app.listen(3000, async () => {
    await connectDb()
    console.log('Server is running on PORT 3000')
});