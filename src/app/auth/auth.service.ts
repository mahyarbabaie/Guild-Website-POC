import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }

  login(userInfo: User) {
    if (userInfo.username !== null && userInfo.password !== null) {
      localStorage.setItem('ACCESS_TOKEN', 'access_token');
      return true;
    }
    return false;
  }

  isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
