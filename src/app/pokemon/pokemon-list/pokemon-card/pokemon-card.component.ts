import { Component, Input, OnInit } from '@angular/core';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: PokemonEntry;
  constructor() { }

  ngOnInit(): void {
  }

}
