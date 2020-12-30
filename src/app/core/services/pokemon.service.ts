import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon'
  constructor(private http: HttpClient) { }

  //* Get AllPokemon
  getAllPokemon() {
    return this.http.get(`${this.apiUrl}?limit=151`);
  }
  //* Get Pokemon by name
  getPokemon(name: string) {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
