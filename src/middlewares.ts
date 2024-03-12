import { NextFunction, Request, Response } from "express";
import { IMovies, TMoviesResult } from "./interfaces";
import { client } from './database';

const idExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const queryResult: TMoviesResult = await client.query(
    "SELECT * FROM movies WHERE id = $1;",
    [id]
  );

  const movie: IMovies = queryResult.rows[0];

  if(!movie) {
    return res.status(404).json({message: "Movie not found!"});
  }

  res.locals = {
    ...res.locals, foundMovie: movie
  }

  return next();
};

const idExistPatch = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const queryResult: TMoviesResult = await client.query(
    "SELECT * FROM movies WHERE id = $1;",
    [id]
  );

  const movie: IMovies = queryResult.rows[0];

  if(!movie) {
    return res.status(404).json({message: "Movie name already exists!"});
  }

  res.locals = {
    ...res.locals, foundMovie: movie
  }

  return next();
};

const nameExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { name } = req.body
    const queryResult: TMoviesResult = await client.query(
        "SELECT * FROM movies WHERE name = $1;",
        [name]
      );
    
      const movie: IMovies = queryResult.rows[0];
    
      if(movie) {
        return res.status(409).json({message: "Movie name already exists!"});
      }
    
      res.locals = {
        ...res.locals, foundMovie: movie
      }

    return next();
};

const nameExistPatch = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { name } = req.body
  const queryResult: TMoviesResult = await client.query(
      "SELECT * FROM movies WHERE name = $1;",
      [name]
    );
  
    const movie: IMovies = queryResult.rows[0];
  
    if(movie) {
      return res.status(409).json({message: "Movie name already exists!"});
    }
  
    res.locals = {
      ...res.locals, foundMovie: movie
    }

  return next();
};

export { idExist, nameExist, nameExistPatch, idExistPatch };