import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemon: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getAllPokemon();
  }
  ngAfterViewInit(): void {
    // console.log('afterview');

    // this.getColor();
  }
  getAllPokemon() {
    this.pokemonService.getAllPokemon().subscribe((results) => {
      // console.log(results);
      this.pokemon = results;
      this.pokemonService.getColor(this.pokemon);
    });
  }

  getColor() {
    // this.pokemonService.getColor();
  }
  ngOnDestroy() {
    // console.log('ondestroy');
    // this.pokemonService.getAllPokemon()
  }
}
