import { Component, inject, linkedSignal, signal } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';
import { MoviesFilter } from '../../components/movies-filter/movies-filter';
import { MoviesApi } from '../services/movie-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList, MoviesFilter],
  templateUrl: './explore-movies.html',
  styleUrl: './explore-movies.css',
})
export class ExploreMovies {
  private readonly _moviesApi = inject(MoviesApi);

  movies = signal([{}]);

  moviesResource = rxResource({
    params: () => true,
    stream: () => this._moviesApi.getMovies(),
  });

  moviesFiltered = linkedSignal(() => {
    const ERROR_ON_RESPONSE = !!this.moviesResource.error();

    if (ERROR_ON_RESPONSE) return [];

    const moviesList = this.moviesResource.value();
    console.log('MoviesList:', moviesList);

    return moviesList ?? [];
  });

  adicionarFilme() {}
}
