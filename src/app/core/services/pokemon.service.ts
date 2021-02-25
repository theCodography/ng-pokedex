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
import { EvolutionChain } from 'src/app/models/evolution-chain.model';

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
  getData(id: number = 0, limit: number = 1) {
    return this.http
      .get(`${this._baseUrl}/pokemon/?offset=${id}&limit=${limit}`)
      .pipe(map((res) => {
        return this.getEntry(res['results'][0])}));
  }
  //* Find One Pokemon
  findOne(id: number): Observable<Pokemon> {
    const colorThief = new ColorThief();
    let color: number[];
    let img = new Image();
    let evoChain: EvolutionChain[];
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

        let pokemon = new Pokemon(
          pkmEntry,
          new PokemonAbilityInfo(
            data[0]['height'],
            data[0]['weight'],
            this.getAbilities(data[0]['abilities']),
            this.getCategory(data[1]['genera'])
          ),
          this.getDescriptions(data[1]['flavor_text_entries']),
          this.getTypes(data[0]['types']),
          this.getStats(data[0]['stats']),
          evoChain
        );
        this.http.get(data[1]['evolution_chain'].url).subscribe((data) => {
          pokemon.evolutionChain = this.findEvolution(data);
        });
        return pokemon;
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
      .map((entry) => {
        let rep: string = entry['flavor_text'];
        let re = /\f/gi;
        let result = rep.replace(re, ' ');
        return new PokemonDescription(
          result,
          _.startCase(_.replace(entry.version.name, '-', ' '))
        );
      });
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

  //* Find Evolution Chain

  findEvolution(data): EvolutionChain[] {
    let evoData = data.chain;
    let evolutionChain: EvolutionChain[] = [];

    let species_name;
    let min_level;
    let trigger_name;
    let item;
    let held_item;
    let happiness;
    let time_of_day;
    let location;
    let id;
    let url;
    let pokemonEntry: PokemonEntry;
    // console.log(evoData);
    do {
      let evoDetails = evoData['evolution_details'][0];
      let numberOfEvolutions = evoData['evolves_to'].length;
      if (numberOfEvolutions > 1) {
        for (let i = 1; i < numberOfEvolutions; i++) {
          let evoDetails = evoData.evolves_to[i]['evolution_details'][0];
          species_name = evoData.evolves_to[i].species.name;
          url = evoData.evolves_to[i].species.url;
          id = url.slice(42, url.lastIndexOf('/'));
          min_level = !evoDetails ? 1 : evoDetails.min_level;
          trigger_name = !evoDetails ? null : evoDetails.trigger.name;
          item = !evoDetails ? null : evoDetails.item?.name;
          held_item = !evoDetails ? null : evoDetails.held_item?.name;
          happiness = !evoDetails ? null : evoDetails.min_happiness;
          time_of_day = !evoDetails ? null : evoDetails.time_of_day;
          location = !evoDetails ? null : evoDetails.location?.name;
          let evoChain = new EvolutionChain(
            species_name,
            min_level,
            trigger_name,
            item,
            held_item,
            happiness,
            time_of_day,
            location,

          )
          this.getData(Number(id)-1).subscribe(res => {
            evoChain.pokemonEntry = res;
          });
          evolutionChain.push(
            evoChain
          );
        }
      }

      species_name = evoData.species.name;
      url = evoData.species.url;
      id = url.slice(42, url.lastIndexOf('/'));
      min_level = !evoDetails ? 1 : evoDetails.min_level;
      trigger_name = !evoDetails ? null : evoDetails.trigger.name;
      item = !evoDetails ? null : evoDetails.item?.name;
      held_item = !evoDetails ? null : evoDetails.held_item?.name;
      happiness = !evoDetails ? null : evoDetails.min_happiness;
      time_of_day = !evoDetails ? null : evoDetails.time_of_day;
      location = !evoDetails ? null : evoDetails.location?.name;
      let evoChain = new EvolutionChain(
        species_name,
        min_level,
        trigger_name,
        item,
        held_item,
        happiness,
        time_of_day,
        location,

      )
      this.getData(Number(id)-1).subscribe(res => {
        evoChain.pokemonEntry = res;
      });
      evolutionChain.push(
        evoChain
      );

      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    // console.log(evolutionChain);
    return evolutionChain;
  }

  //! Get dark Color
  getDark(style = {}, color) {
    return Object.assign({}, style, {
      color: 'rgb(' + color + ')',
    });
  }
}
