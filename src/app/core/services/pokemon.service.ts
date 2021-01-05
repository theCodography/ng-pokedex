import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  //* Get AllPokemon
  getAllPokemon() {
    let pokeList = [];
    this.http.get(`${this.apiUrl}?limit=20`).subscribe((data) => {
      // console.log(data);
      data['results'].map((dataMerge) => {
        // console.log(dataMerge);

        this.http.get(dataMerge['url']).subscribe((pokemonData) => {
          // console.log(pokemonData);
          let id = pokemonData['id'];
          let img =
            pokemonData['sprites']['other']['official-artwork'][
              'front_default'
            ];
          let name = pokemonData['name'];
          let type_1 = pokemonData['types'][0]['type']['name'];
          let type_2;

          if (pokemonData['types'][1]) {
            type_2 = pokemonData['types'][1]['type']['name'];
          }

          let pokemon = new Pokemon(id, name, img, type_1, type_2);

          pokeList.sort((a, b) => {
            return a.id - b.id;
          });
          pokeList.push(pokemon);
        });
      });
    });
    // console.log(pokeList);
    return pokeList;
  }
  //* Get Pokemon by name
  getPokemon(name: string) {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
