import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemon: Array<Pokemon> = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemon = this.pokemonService.getAllPokemon()
  }
}
