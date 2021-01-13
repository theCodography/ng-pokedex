import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import ColorThief from 'node_modules/colorthief';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';
import * as _ from 'lodash';
import { PokemonType } from 'src/app/models/pokemon-type.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon: Pokemon[] = [];

  private _spriteBaseUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  private _baseUrl: string = 'https://pokeapi.co/api/v2';
  private _detailRegex = /^https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\/$/;
  constructor(private http: HttpClient) {}

  //* Find All Pokemon
  findAll(offset: number = 0, limit: number = 20): Observable<PokemonList> {
    return this.http
      .get<PokemonList>(
        `${this._baseUrl}/pokemon/?offset=${offset}&limit=${limit}`
      )
      .pipe(
        map((res) => {
          // console.log(res);
          return this.getList(res);
        })
      );
  }
  //* Get List Pokemon
  getList(data): PokemonList {
    // Manually filter all pokémons above 10000 since these are not official but mega evolutions
    let results = [];
    data.results
      .map((result) => {
        return this.getEntry(result).then((res) => {
          results.push(res);
          results.sort((a,b) => a.id-b.id)
        });
      })
      .filter((entry) => entry.id < 10000);
      console.log(results);
    // Manually override count to 721 to exclude mega's
    return new PokemonList(results, 721);
  }
  //* Get entry Pokemon
  async getEntry(data): Promise<PokemonEntry> {
    const matches = this._detailRegex.exec(data.url),
      id = matches == null ? null : parseInt(matches[1]),
      sprite = id == null ? null : `${this._spriteBaseUrl}/${id}.png`;
    console.log();

    let types: PokemonType[] = [];

    await fetch(data.url)
      .then((data) => data.json())
      .then((d) => {
        types = this.getTypes(d['types']);
      });
    return new PokemonEntry(id, _.capitalize(data.name), sprite, types);
  }

  //* Get types of pokemon
  getTypes(types: any[]): PokemonType[] {
    return types
      .map((type) => new PokemonType(type.type.name, type.slot))
      .sort((type1, type2) => type1.order - type2.order);
  }
  // getAllPokemon(): Observable<Pokemon[]> {
  //   let urls = [];
  //   let ObjPokemon: Pokemon;

  //   for (let i = 1; i < 41; i++) {
  //     urls.push(this.http.get<Pokemon[]>(`${apiUrl}/${i}`).pipe());
  //   }
  //   return forkJoin<Pokemon>(urls);
  // }

  //* Get Pokemon by name
  find(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${apiUrl}/${name}`).pipe();
  }
  findSpecies(url: string) {
    return this.http.get(url).pipe();
  }
  //* Get Color

  getColor(pokemon) {
    const colorThief = new ColorThief();
    let pkm: Pokemon[] = pokemon;
    let colorList = [];
    let colorTextList = [];
    function fill() {
      let images = document.getElementsByClassName('card-img-top');
      Array.from(images).forEach((img) => {
        if (img) {
          let color = colorThief.getPalette(img, 5);
          // console.log(color[0]);
          let colorText = color[0].map((c) => {
            return c - 50;
          });
          colorList.push(color[0]);
          colorTextList.push(colorText);
        }
      });

      for (const p in pkm) {
        if (localStorage.length <= Number(p) * 2) {
          pkm[p].color = colorList[p];
          pkm[p].textColor = colorTextList[p];
          localStorage.setItem(`${p}color`, colorList[p]);
          localStorage.setItem(`${p}colorText`, colorTextList[p]);
        } else {
          pkm[p].color = localStorage.getItem(`${p}color`);
          pkm[p].textColor = localStorage.getItem(`${p}colorText`);
        }
      }
    }

    if (document.readyState === 'complete') {
      fill();
    } else {
      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          fill();
        }
      };
    }
  }
}
