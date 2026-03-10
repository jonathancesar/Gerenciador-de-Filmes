import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserTokenSuccessAuthResponse } from '../../shared/models/user-token-success-auth-response';
import { IUserSuccessResponse } from '../../shared/models/user-login-success-response';
import { tap } from 'rxjs';
import { UserTokenStore } from './user-token-store';
import { IUserRegisterSuccessResponse } from '../../shared/models/user-register-success-response';
import { UserInfosStore } from './user-infos-store';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _userInfosStore = inject(UserInfosStore);

  validateToken() {
    return this._httpClient.get<IUserTokenSuccessAuthResponse>(
      environment.baseURL + '/users/validate-token',
    );
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<IUserSuccessResponse>(environment.baseURL + '/users/login', {
        email,
        password,
      })
      .pipe(
        tap(({ user: { id, name, email } }) =>
          this._userInfosStore.setUserInfos({
            id,
            name,
            email,
          }),
        ),
        tap((loginResponse) => this._userTokenStore.saveToken(loginResponse.token)),
      );
  }

  register(name: string, email: string, password: string) {
    return this._httpClient.post<IUserRegisterSuccessResponse>(environment.baseURL + '/users', {
      name,
      email,
      password,
    });
  }
}
