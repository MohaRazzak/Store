import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = this.authServices.isAuthenticated();
  role = this.authServices.getRole()


  constructor(
    private authServices : AuthService,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  logout(){
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      localStorage.clear();
  }
  login(){
    this.router.navigate(['/login']);
  }


}
