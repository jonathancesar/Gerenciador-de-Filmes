import { HttpErrorResponse } from '@angular/common/http';

export const setErrorMessage = (error: Error | undefined) => {
  const cause = error?.cause as HttpErrorResponse;

  if (!cause) {
    return '';
  }
  if (cause.status === 0) {
    return 'Sem conexão com a internet ou servidor offline.';
  }

  if (cause.error?.message) {
    return cause.error.message as string;
  }

  return 'Ocorreu um erro inesperado ao tentar acessar.';
};
