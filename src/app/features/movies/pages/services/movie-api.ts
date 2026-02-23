import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MoviesListResponse } from '../../../../shared/types/movies-list-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  private readonly _httpClient = inject(HttpClient);

  getMovies() {
    return this._httpClient.get<MoviesListResponse>('http://localhost:3000/movies');
  }
}
