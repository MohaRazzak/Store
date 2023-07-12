import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'store';
  currentLang : any;
  textDir: any;
  onActivate(event :any) {
    window.scroll(0,0);
  }
  constructor(private translocoService: TranslocoService){
    translocoService.getDefaultLang();
    translocoService.langChanges$.subscribe(lang => {
      localStorage.setItem('lang', lang);
      const html = document?.getElementsByTagName('html')?.[0];
      if (html) {
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        html.dir = dir;
        html.classList?.add(dir);
      }
    });
  }
}
