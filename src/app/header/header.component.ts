import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = this.authServices.isAuthenticated();
  role = this.authServices.getRole();
  availableLangs :any;
  activeLang: any;

  
  langs = [
    'Arabic',
    'English'
  ]


  constructor(
    private authServices : AuthService,
    private router:Router,
    private _translocoService : TranslocoService

  ) { }

  ngOnInit(): void {
    const languages = this._translocoService.getAvailableLangs();
      this.availableLangs = languages.map(lang => {
            return {
                id: lang,
                label: lang === 'en' ? 'English' : 'عربي'
            }
        });
      this._translocoService.langChanges$.subscribe((activeLang) => {
          this.activeLang = activeLang;
      });
  }

  logout(){
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      const currentLang = localStorage.getItem("lang");
      localStorage.clear();
      if(currentLang){
        localStorage.setItem("lang" , currentLang);
      }
  }
  login(){
    this.router.navigate(['/login']);
  }

  setActiveLang(event: any): void {
    const lang = this.availableLangs.filter((lan: any) => lan.label === event.target?.value)[0].id
    console.log("lang" , lang);
    this._translocoService.setActiveLang(lang);
  }



}
