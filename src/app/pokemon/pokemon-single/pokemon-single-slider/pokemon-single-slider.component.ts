import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-single-slider',
  templateUrl: './pokemon-single-slider.component.html',
  styleUrls: ['./pokemon-single-slider.component.scss']
})
export class PokemonSingleSliderComponent implements OnInit {
  @Input() pokemonCurrent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
