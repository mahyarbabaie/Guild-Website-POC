import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserData} from './userData';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AppConstants} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseEndPoint: string;
  authServiceUrl: string;

  constructor(private https: HttpClient) {
    this.baseEndPoint = environment.apiHost;
    this.authServiceUrl = AppConstants.BASE_AUTH_SERVICE_URL;
  }

  login(userData: UserData) {
    if (userData.email !== null && userData.password !== null) {
      return this.https.post(this.baseEndPoint + this.authServiceUrl + '/login',
        {
          email: userData.email,
          password: userData.password
        }).pipe(
        map(
          (data)  => {
            const responseJson = JSON.stringify(data);
            if (!JSON.parse(responseJson).accessToken) {
              console.log('Logged in Failed');
            } else {
              sessionStorage.setItem('AUTHENTICATED_USER', userData.username);
              sessionStorage.setItem('ACCESS_TOKEN', JSON.parse(responseJson).token);
              console.log('Logged In Successfully');
            }
          }
        ),
        catchError(err => {
          console.log(err.message);
          const errorJson = JSON.stringify(err);

          if (JSON.parse(errorJson).status === 400) {
            console.log('Bad Request');
          } else if (JSON.parse(errorJson).status === 404) {
            console.log('Not Found');
          }
          return throwError(err);
        }
        ));
    }
  }

  register(userData: UserData) {
    if (userData.email !== null && userData.username !== null && userData.password !== null) {
      return this.https.post(this.baseEndPoint + this.authServiceUrl + '/register',
        {
          username: userData.username,
          email: userData.email,
          passwordSalt: 'salt',
          passwordHash: userData.password
        }).pipe(
          map(
            data => {
              const responseJson = JSON.stringify(data);
              if (JSON.parse(responseJson).status === 200) {
                console.log('Registered Successfully');
                return data;
              }
            }
          ),
      catchError(err => {
        console.log(err.message);
        const errorJson = JSON.stringify(err);

        if (JSON.parse(errorJson).status === 400) {
          console.log('Bad Request');
        }
        return throwError(err);
      }));
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('ACCESS_TOKEN') !== null && sessionStorage.getItem('AUTHENTICATED_USER') !== null;
  }

  logout() {
    sessionStorage.removeItem('AUTHENTICATED_USER');
    sessionStorage.removeItem('ACCESS_TOKEN');
  }
}
