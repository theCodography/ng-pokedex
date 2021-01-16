import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { Pokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  // pokemon: Pokemon[] = [];
  pokemon: PokemonEntry[];
  count: number = 0;
  offset: number = 0;
  limit: number = 20;
  textColor;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.findAll(this.offset, this.limit);
  }
  findAll(offset: number, limit: number) {
    this.pokemon = [];
    this.pokemonService.findAll(offset, limit).subscribe((result) => {
      this.pokemon = result.pokemons;
      this.count = result.count;
    });
  }
}
