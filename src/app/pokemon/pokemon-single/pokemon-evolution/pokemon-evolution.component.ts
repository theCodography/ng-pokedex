import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { EvolutionChain } from 'src/app/models/evolution-chain.model';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';
import { PokemonCardComponent } from '../../pokemon-list/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss'],
})
export class PokemonEvolutionComponent implements OnInit {
  @Input() evolution: EvolutionChain[];

  constructor(private service: PokemonService) {}

  ngOnInit(): void {}
}
