import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesListResponse } from '../../../../shared/types/movies-list-response';
import { IMovieResponse } from '../../../../shared/models/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  private readonly _httpClient = inject(HttpClient);

  getMovies() {
    return this._httpClient.get<MoviesListResponse>('http://localhost:3000/movies');
  }

  getMovieDetails(id: number) {
    return this._httpClient.get<IMovieResponse>('http://localhost:3000/movies/' + id);
  }

  rateMovie(movieId: number, rating: number) {
    return this._httpClient.post<IMovieResponse>(
      'http://localhost:3000/movies/' + movieId + '/rate',
      {
        rating,
      },
    );
  }

  createMovie(movieData: FormData) {
    return this._httpClient.post<IMovieResponse>('http://localhost:3000/movies/', movieData);
  }
}
