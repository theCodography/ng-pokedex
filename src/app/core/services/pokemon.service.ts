import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import ColorThief from 'colorthief';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';
import * as _ from 'lodash';
import { PokemonType } from 'src/app/models/pokemon-type.model';
import { PokemonDescription } from 'src/app/models/pokemon-description.model';
import { PokemonStats } from 'src/app/models/pokemon-stats.model';
import { PokemonAbilityInfo } from 'src/app/models/pokemon-ability-info.model';
import { PokemonAbility } from 'src/app/models/pokemon-ability.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon: Pokemon[] = [];
  private _language = 'en';
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
          return this.getList(res);
        })
      );
  }
  //* Find One Pokemon
  findOne(id: number): Observable<Pokemon> {
    const colorThief = new ColorThief();
    let color: number[];
    let img = new Image();

    return forkJoin(
      this.http.get(`${this._baseUrl}/pokemon/${id}/`),
      this.http.get(`${this._baseUrl}/pokemon-species/${id}/`)
    ).pipe(
      map((data) => {
        this.loadImage(`${this._spriteBaseUrl}/${id}.png`, img).then((ele) => {
          let pal = colorThief.getPalette(ele, 5);
          pkmEntry.color = pal[0];
        });
        let pkmEntry = new PokemonEntry(
          data[0]['id'],
          _.capitalize(data[0]['name']),
          `${this._spriteBaseUrl}/${data[0]['id']}.png`,
          color
        );
        return new Pokemon(
          pkmEntry,
          new PokemonAbilityInfo(
            data[0]['height'],
            data[0]['weight'],
            this.getAbilities(data[0]['abilities']),
            this.getCategory(data[1]['genera'])
          ),
          this.getDescriptions(data[1]['flavor_text_entries']),
          this.getTypes(data[0]['types']),
          this.getStats(data[0]['stats'])
        );
      })
    );
  }

  //* Get list pokemon
  getList(data): PokemonList {
    // Manually filter all pokémons above 10000 since these are not official but mega evolutions
    let results = data.results
      .map((result) => this.getEntry(result))
      .filter((entry) => entry.id < 10000);
    // Manually override count to 721 to exclude mega's
    return new PokemonList(results, 721);
  }
  //* Get pokemon entry
  getEntry(data): PokemonEntry {
    const matches = this._detailRegex.exec(data.url),
      id = matches == null ? null : parseInt(matches[1]),
      sprite = id == null ? null : `${this._spriteBaseUrl}/${id}.png`;
    let color = [];
    let pkmEntry = new PokemonEntry(id, _.capitalize(data.name), sprite, color);
    this.http.get(`${this._baseUrl}/pokemon/${data.name}/`).subscribe((res) => {
      pkmEntry.type = this.getTypes(res['types']);
    });
    const colorThief = new ColorThief();
    let img = new Image();
    this.loadImage(`${this._spriteBaseUrl}/${id}.png`, img).then((ele) => {
      let pal = colorThief.getPalette(ele, 5);
      pkmEntry.color = pal[0];
    });
    return pkmEntry;
  }

   loadImage(url, elem) {
    return new Promise((resolve, reject) => {
      elem.onload = () => resolve(elem);
      elem.onerror = reject;
      elem.src = url;
      elem.crossOrigin = 'true';
      return elem;
    });
  }
  //* Get Abilities
  getAbilities(abilities: any[]): PokemonAbility[] {
    return abilities
      .map(
        (ability) =>
          new PokemonAbility(
            _.startCase(ability.ability.name),
            ability['is_hidden'],
            ability.slot
          )
      )
      .sort((ability1, ability2) => ability1.order - ability2.order);
  }
  //* Get Category
  getCategory(genera: any[]): string {
    return genera.find((genera) => genera.language.name === this._language)
      .genus;
  }
  //* Get types of pokemon
  getTypes(types: any[]): PokemonType[] {
    return types
      .map((type) => new PokemonType(type.type.name, type.slot))
      .sort((type1, type2) => type1.order - type2.order);
  }
  //* Get Species
  getDescriptions(entries: any[]): PokemonDescription[] {
    return entries
      .filter((entry) => entry.language.name === this._language)
      .map(
        (entry) =>
          new PokemonDescription(
            entry['flavor_text'],
            _.startCase(_.replace(entry.version.name, '-', ' '))
          )
      );
  }
  // * Get Base Stats
  getStats(stats: any[]): PokemonStats {
    return new PokemonStats(
      stats.find((stat) => stat.stat.name === 'hp')['base_stat'],
      stats.find((stat) => stat.stat.name === 'attack')['base_stat'],
      stats.find((stat) => stat.stat.name === 'defense')['base_stat'],
      stats.find((stat) => stat.stat.name === 'special-attack')['base_stat'],
      stats.find((stat) => stat.stat.name === 'special-defense')['base_stat'],
      stats.find((stat) => stat.stat.name === 'speed')['base_stat']
    );
  }

  //! Get dark Color
  getDark(style ={}, color) {
    return Object.assign({}, style, {
      color: 'rgb(' + color + ')',
    });
  }
}
