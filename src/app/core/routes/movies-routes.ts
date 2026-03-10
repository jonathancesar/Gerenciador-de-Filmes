import { Routes } from '@angular/router';

export const MOVIES_ROUTES: Routes = [
  { path: '', redirectTo: 'explore', pathMatch: 'full' },
  {
    path: 'explore',
    loadComponent: () =>
      import('../../features/movies/pages/explore-movies/explore-movies').then(
        (m) => m.ExploreMovies,
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('../../features/favorites/pages/favorite-movies/favorite-movies').then(
        (m) => m.FavoriteMovies,
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('../../features/movies/pages/movie-details/movie-details').then((m) => m.MovieDetails),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('../../features/movies/pages/create-movie/create-movie').then((m) => m.CreateMovie),
  },
];
