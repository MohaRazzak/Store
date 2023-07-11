import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get('./assets/data.json');
  }

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      return true
    }else{
      return false
    }
  }


}
