import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesListResponse } from '../../../../shared/types/movies-list-response';
import { IMovieResponse } from '../../../../shared/models/movie-response';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  private readonly _httpClient = inject(HttpClient);

  getMovies() {
    return this._httpClient.get<MoviesListResponse>(environment.baseURL + '/movies');
  }

  getMovieDetails(id: number) {
    return this._httpClient.get<IMovieResponse>(environment.baseURL + '/movies/' + id);
  }

  rateMovie(movieId: number, rating: number) {
    return this._httpClient.post<IMovieResponse>(
      environment.baseURL + '/movies/' + movieId + '/rate',
      {
        rating,
      },
    );
  }

  createMovie(movieData: FormData) {
    return this._httpClient.post<IMovieResponse>(environment.baseURL + '/movies', movieData);
  }
}
