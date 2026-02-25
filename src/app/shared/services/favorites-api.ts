import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesListResponse } from '../types/movies-list-response';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApi {
  private readonly _httpClient = inject(HttpClient);

  getFavorites() {
    return this._httpClient.get<MoviesListResponse>('http://localhost:3000/favorites');
  }

  addMovieToFavorites() {}

  removeMovieFromFavorites() {}
}
