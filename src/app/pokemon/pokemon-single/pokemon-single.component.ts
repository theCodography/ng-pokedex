import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-single',
  templateUrl: './pokemon-single.component.html',
  styleUrls: ['./pokemon-single.component.scss'],
})
export class PokemonSingleComponent implements OnInit {
  pokemonCurrent = new Pokemon();
  species;
  color;
  abilities = [];
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   const name = params['name'];
    //   //* use user service to get data of users from github api
    //   this.pokemonService.getPokemon(name).subscribe((pokemon) => {
    //     this.color = localStorage.getItem(`${Number (pokemon['id']- 1)}color`);
    //     this.pokemonCurrent = pokemon;
    //     this.pokemonCurrent.abilities.forEach((element) => {
    //       this.abilities.push(element);
    //     });
    //   }); //* bind that to a user variable
    // });
    this.pokemonService.findAll();
    this.getRoute(this.route.snapshot.params['name']);
  }

  getRoute(name: any) {
    this.pokemonService.find(name).subscribe((pokemon: any) => {
      this.color = localStorage.getItem(`${Number(pokemon['id'] - 1)}color`);
      // console.log(pokemon['species']['url']);
      this.pokemonService
        .findSpecies(pokemon['species']['url'])
        .subscribe((spec) => {
          this.species = spec;
        });
      this.pokemonCurrent = pokemon;
    });
  }
}
