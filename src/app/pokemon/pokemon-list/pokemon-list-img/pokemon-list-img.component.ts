import { Component, ElementRef, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-pokemon-list-img',
  templateUrl: './pokemon-list-img.component.html',
  styleUrls: ['./pokemon-list-img.component.scss'],
})
export class PokemonListImgComponent implements OnInit {
  @Input() pokemonImg: any;
  constructor() {}

  ngOnInit(): void {}
}
