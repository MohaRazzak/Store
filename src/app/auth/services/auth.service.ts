import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

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

  getRole(){
    if (this.isAuthenticated()) {
      return localStorage.getItem('role')
    }else{
      return false
    }
  }

  checkAdminRole(){
    if(this.getRole() === "admin"){
      this.router.navigate(['/dashboard']);
    }
  }

  checkUserRole(){
    if(this.getRole() === "user"){
      this.router.navigate(['/products']);
    }
  }


}
