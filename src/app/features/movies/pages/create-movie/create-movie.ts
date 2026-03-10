import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movie-api';
import { setErrorMessage } from '../../../../shared/utils/set-error-message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-movie.html',
  styleUrl: './create-movie.css',
})
export class CreateMovie {
  private readonly _moviesApi = inject(MoviesApi);

  title = signal<string>('');
  year = signal<number | undefined>(undefined);
  category = signal<string>('');
  description = signal<string>('');

  // Sinal para armazenar o URL da pré-visualização da imagem
  imagePreview = signal<string | undefined>(undefined);
  selectedFile = signal<File | undefined>(undefined);

  movieFormData = signal<FormData | undefined>(undefined);

  createMovieResource = rxResource({
    params: () => this.movieFormData(),
    stream: ({ params }) => this._moviesApi.createMovie(params),
  });

  //para mensagem de erro
  errorMessage = computed(() => setErrorMessage(this.createMovieResource.error()));

  //sucesso
  successMessage = computed(() => {
    const SUCCESS_CREATION = this.createMovieResource.hasValue();
    return SUCCESS_CREATION ? 'Filme criado com sucesso!' : undefined;
  });

  /**
   * Manipula a seleção de arquivo pelo input.
   * Abre o explorador de arquivos novamente se a imagem for clicada.
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.selectedFile.set(file);

      if (this.imagePreview()) {
        URL.revokeObjectURL(this.imagePreview()!);
      }

      const objectUrl = URL.createObjectURL(file);

      this.imagePreview.set(objectUrl);
    }
  }

  // Opcional: Adicione métodos para Salvar e Cancelar
  salvar() {
    const formData = new FormData();

    formData.append('titulo', this.title());
    formData.append('descricao', this.description());
    formData.append('anoLancamento', this.year()?.toString() ?? '');
    formData.append('genero', this.category());
    formData.append('image', this.selectedFile() ?? '');

    this.movieFormData.set(formData);
  }
}
