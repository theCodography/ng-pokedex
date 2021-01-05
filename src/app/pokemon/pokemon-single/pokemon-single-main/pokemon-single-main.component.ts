import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-single-main',
  templateUrl: './pokemon-single-main.component.html',
  styleUrls: ['./pokemon-single-main.component.scss']
})
export class PokemonSingleMainComponent implements OnInit {
  @Input() pokemonCurrent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
