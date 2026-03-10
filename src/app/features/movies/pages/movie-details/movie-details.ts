import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoviesApi } from '../services/movie-api';
import { DecimalPipe } from '@angular/common';
import { tap } from 'rxjs';
import { FavoritesApi } from '../../../../shared/services/favorites-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-movie-details',
  imports: [DecimalPipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private readonly _moviesApi = inject(MoviesApi);
  private readonly _favoritesApi = inject(FavoritesApi);

  readonly BASE_URL = environment.baseURL;

  id = input.required<number>();

  movieDetailsResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this._moviesApi.getMovieDetails(+params), //colocando o + ele converte para number
  });

  movieDetails = linkedSignal(() => {
    const ERROR_ON_RESPONSE = !!this.movieDetailsResource.error();
    if (ERROR_ON_RESPONSE) return undefined;

    return this.movieDetailsResource.value();
  });

  // Sinais para controle de estado

  currentRating = signal<number | undefined>(undefined); // Inicia com 4 estrelas preenchidas

  starsStatusField = computed(() => {
    const ratting = this.currentRating() ?? 0;

    const boolArray = [0, 1, 2, 3, 4].map((index) => index < ratting);

    return boolArray;
  });

  //chamada para avaliação e validação para quando for > 0
  rateMovioeResource = rxResource({
    params: () => {
      const rating = this.currentRating() ?? 0;

      if (rating > 0) return { id: +this.id(), rating };

      return undefined;
    },
    stream: ({ params }) =>
      this._moviesApi
        .rateMovie(params.id, params.rating)
        .pipe(tap((movieUpdated) => this.movieDetails.set(movieUpdated))),
  });

  isMovieFavoriteResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this._favoritesApi.isMovieInFavorites(+params),
  });

  isFavorite = linkedSignal(() => {
    const ERROR_ON_RESPONSE = !!this.isMovieFavoriteResource.error();

    if (ERROR_ON_RESPONSE) return false;

    return this.isMovieFavoriteResource.value() ?? false;
  });

  toggleFavoriteParams = signal<boolean | undefined>(undefined);

  toggleMovieFavoriteResource = rxResource({
    params: () => {
      const status = this.toggleFavoriteParams();

      if (status === undefined) return undefined;

      return {
        currentFavoriteStatus: status,
        movieId: +this.id(),
      };
    },
    stream: ({ params }) =>
      this._favoritesApi
        .toggleMovieFavorite(params.currentFavoriteStatus, params.movieId)
        .pipe(tap(() => this.isFavorite.update((cv) => !cv))),
  });

  // Alterna o estado de favorito do filme.
  toggleFavorite() {
    this.toggleFavoriteParams.set(this.isFavorite());
  }

  updateRating(newRating: number) {
    if (newRating === this.currentRating()) {
      this.currentRating.set(0);
    } else {
      this.currentRating.set(newRating);
    }
  }
}
