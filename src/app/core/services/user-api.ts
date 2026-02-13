import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserTokenSuccessAuthResponse } from '../../shared/models/user-token-success-auth-response';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _httpClient = inject(HttpClient);

  validateToken() {
    return this._httpClient.get<IUserTokenSuccessAuthResponse>(
      'http://localhost:3000/users/validate-token',
    );
  }

  login() {}

  register() {}
}
