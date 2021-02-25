import { PokemonEntry } from "./pokemon-entry.model";

export class EvolutionChain {
  speciesName: string;
  minLevel: number;
  triggerName: string;
  item: string;
  heldItem: string;
  happiness: string;
  timeOfDay: string;
  location: string;
  id: string;
  _pokemonEntry: PokemonEntry;
  constructor(
    speciesName: string,
    minLevel: number,
    triggerName: string,
    item: string,
    heldItem: string,
    happiness: string,
    timeOfDay: string,
    location: string,

  ) {
    this.speciesName = speciesName;
    this.minLevel = minLevel;
    this.triggerName = triggerName;
    this.item = item;
    this.heldItem = heldItem;
    this.happiness = happiness;
    this.timeOfDay = timeOfDay;
    this.location = location;

  }

  public get pokemonEntry() : PokemonEntry {
    return this._pokemonEntry;
  }

  public set pokemonEntry(v : PokemonEntry) {
    this._pokemonEntry = v;
  }
}
