import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserData} from './userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }

  login(userData: UserData) {
    // TODO: http.GET() user info and see if it returns a value
    if (userData.username !== null && userData.password !== null) {
      localStorage.setItem('ACCESS_TOKEN', 'access_token');
      return true;
    }
    return false;
  }

  register(userData: UserData) {
    if (userData.email !== null && userData.username !== null && userData.password !== null) {
      // TODO: http.POST() the user data to back-end
    }
  }

  isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
