import { QueryResult } from "pg";

interface IMovies {
    id: number;
    name: string;
    category: string;
    duration: number;
    price: number;
}

type TMoviesRequest = Omit<IMovies, "id">;
type TMoviesUpdateRequest = Partial<TMoviesRequest>
type TMoviesResult = QueryResult<IMovies>


export { IMovies, TMoviesRequest, TMoviesUpdateRequest, TMoviesResult }