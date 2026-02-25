import { Component, input } from '@angular/core';
import { MoviesListResponse } from '../../types/movies-list-response';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
  host: {
    class: 'flex-1 min-h-0',
  },
})
export class MoviesList {
  BASE_PATH = 'http://localhost:3000';

  movies = input<MoviesListResponse>([]);
}
