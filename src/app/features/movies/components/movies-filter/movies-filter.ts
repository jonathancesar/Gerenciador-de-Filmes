import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-filter',
  imports: [FormsModule],
  templateUrl: './movies-filter.html',
  styleUrl: './movies-filter.css',
})
export class MoviesFilter {
  title = model('');
  category = model('');

  clearFilter() {
    this.title.set('');
    this.category.set('');
  }
}
