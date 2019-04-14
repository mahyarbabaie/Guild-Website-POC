import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserData} from './userData';
import {environment} from '../../environments/environment';
import {BASE_AUTH_SERVICE_URL} from '../app.constants';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }

  login(userData: UserData) {
    if (userData.username !== null && userData.password !== null) {
      return this.https.post(`${environment.apiHost}${BASE_AUTH_SERVICE_URL}/login`,
        {
          username: userData.username,
          password: userData.password
        }).pipe(
        map(
          (data)  => {
            const responseJson = JSON.stringify(data);
            if (!JSON.parse(responseJson).token) {
              console.log('Logged in Failed');
            } else {
              localStorage.setItem('AUTHENTICATED_USER', userData.username);
              localStorage.setItem('ACCESS_TOKEN', JSON.parse(responseJson).token);
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
      return this.https.post(`${environment.apiHost}${BASE_AUTH_SERVICE_URL}/register`,
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
    return localStorage.getItem('ACCESS_TOKEN') !== null && localStorage.getItem('AUTHENTICATED_USER') !== null;
  }

  logout() {
    localStorage.removeItem('AUTHENTICATED_USER');
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
