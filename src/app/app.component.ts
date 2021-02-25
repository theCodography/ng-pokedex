import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(HeaderComponent) header;
  title = 'pokedex-angular';
  message;
  constructor(private router: Router) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.message = this.header.message;
  }
}
