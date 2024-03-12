import { Request, Response } from "express"
import { IMovies, TMoviesRequest, TMoviesResult } from "./interfaces"
import format from "pg-format";
import { client } from "./database";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
    const payload: TMoviesRequest = req.body
    const queryFormat: string = format(
        "INSERT INTO movies (%I) VALUES (%L) RETURNING *;",
        Object.keys(payload),
        Object.values(payload)
      );
    const queryResult: TMoviesResult = await client.query(queryFormat);

    return res.status(201).json(queryResult.rows[0]);
}

const getMovies = async (req: Request, res: Response): Promise<Response> => {
    const queryString: string = "SELECT * FROM movies;"
    const queryResult: TMoviesResult = await client.query(queryString)
    const { category } = req.query;
    const queryResult1: TMoviesResult = await client.query(
        "SELECT * FROM movies WHERE category = $1;",
        [category]
      );
    
    const moviesByCategory: IMovies[] = queryResult1.rows;

    if(moviesByCategory.length > 0) {
    return res.status(200).json(moviesByCategory);
    } 

    return res.status(200).json(queryResult.rows)
}

const getMovieById = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(res.locals.foundMovie)
}

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
    const queryFormat: string = format(
        "UPDATE movies SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;",
        Object.keys(req.body),
        Object.values(req.body),
    )

    const queryResult: TMoviesResult = await client.query(queryFormat, [req.params.id]) 

    return res.status(200).json(queryResult.rows[0])
}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    await client.query("DELETE FROM movies WHERE id = $1", [req.params.id])
    return res.status(204).json()
}

export {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
}