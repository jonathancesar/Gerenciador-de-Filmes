import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesListResponse } from '../types/movies-list-response';
import { IMovieToFavoriteSuccessResponse } from '../models/movie-tofavorite-success-response';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApi {
  private readonly _httpClient = inject(HttpClient);

  getFavorites() {
    return this._httpClient.get<MoviesListResponse>('http://localhost:3000/favorites');
  }

  addMovieToFavorites(movieId: number) {
    return this._httpClient.post<IMovieToFavoriteSuccessResponse>(
      'http://localhost:3000/favorites/' + movieId,
      {},
    );
  }

  removeMovieFromFavorites(movieId: number) {
    return this._httpClient.delete<void>('http://localhost:3000/favorites/' + movieId);
  }

  isMovieInFavorites(movieId: number) {
    return this.getFavorites().pipe(
      map((favoritesListResponse) =>
        favoritesListResponse.find((fm) => fm.id === movieId) ? true : false,
      ),
    );
  }

  toggleMovieFavorite(
    isMovieCurrentFavorite: boolean,
    movieId: number,
  ): Observable<void | IMovieToFavoriteSuccessResponse> {
    const removeMovie = isMovieCurrentFavorite;

    if (removeMovie) {
      return this.removeMovieFromFavorites(movieId);
    } else {
      return this.addMovieToFavorites(movieId);
    }
  }
}
