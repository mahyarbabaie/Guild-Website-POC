import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserData} from './userData';
import {environment} from '../../environments/environment';
import {BASE_AUTH_SERVICE_URL} from '../app.constants';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }

  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


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
        )
      );
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
              console.log('Registered Successfully');
            }
          )
      );
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
