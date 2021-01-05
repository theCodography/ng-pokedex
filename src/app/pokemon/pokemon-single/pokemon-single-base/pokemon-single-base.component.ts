import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-single-base',
  templateUrl: './pokemon-single-base.component.html',
  styleUrls: ['./pokemon-single-base.component.scss']
})
export class PokemonSingleBaseComponent implements OnInit {
  @Input() pokemonAbi:any;
  constructor() { }

  ngOnInit(): void {
  }

}
