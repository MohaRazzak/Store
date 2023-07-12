import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: any = [];
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)  
  });

  constructor
  (
    private toastr: ToastrService,
    private router:Router,
    private httpService: HttpClient,
    private authServices : AuthService
  )
  {}
  


  ngOnInit(): void {
    this.authServices.getAllUsers().subscribe({ 
        next: data => {
            this.users = data as string [];	
            console.log(this.users); 
        }, 
        error: HttpErrorResponse => { 
            console.log(HttpErrorResponse.message);   
        }
    })
  }

  CheckUser(user: any){
    let result = this.users.filter((u:any) => (u.username === user.username && u.password === user.password));
    if(result.length > 0){
      this.toastr.success('Logged successfully', '');
      localStorage.setItem('token', result[0].token);
      localStorage.setItem('role', result[0].role);
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });


    }else{
      localStorage.clear();
      this.toastr.error('Uesrname or password is wrong', '');
    }
  }

  onSubmit(){
    this.CheckUser(this.loginForm.value);
  }

}
