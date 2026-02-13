import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTokenStore {
  private readonly TOKEN_KEY = 'auth-token';
  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasToken() {
    return !!this.getToken();
  }
}
