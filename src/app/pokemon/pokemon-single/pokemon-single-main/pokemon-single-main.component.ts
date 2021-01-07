import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-single-main',
  templateUrl: './pokemon-single-main.component.html',
  styleUrls: ['./pokemon-single-main.component.scss']
})
export class PokemonSingleMainComponent implements OnInit {
  @Input() pokemonCurrent: any;
  @Input() color: any;
  constructor(private element: ElementRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // console.log(this.element.nativeElement.children);
  }

}
