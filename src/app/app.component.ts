import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  @ViewChild(HeaderComponent) header;
  title = 'pokedex-angular';
  message;
  constructor(private router: Router) { }

  ngOnInit() {
      // this.router.events.subscribe((evt) => {
      //     if (!(evt instanceof NavigationEnd)) {
      //         return;
      //     }
      //     window.scrollTo(0,450)
      // });
  }
  ngAfterViewInit() {
    this.message = this.header.message;
  }
}
