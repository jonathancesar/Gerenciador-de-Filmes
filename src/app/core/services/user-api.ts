import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserTokenSuccessAuthResponse } from '../../shared/models/user-token-success-auth-response';
import { IUserSuccessResponse } from '../../shared/models/user-login-success-response';
import { tap } from 'rxjs';
import { UserTokenStore } from './user-token-store';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userTokenStore = inject(UserTokenStore);

  validateToken() {
    return this._httpClient.get<IUserTokenSuccessAuthResponse>(
      'http://localhost:3000/users/validate-token',
    );
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<IUserSuccessResponse>('http://localhost:3000/users/login', {
        email,
        password,
      })
      .pipe(tap((loginResponse) => this._userTokenStore.saveToken(loginResponse.token)));
  }

  register() {}
}
