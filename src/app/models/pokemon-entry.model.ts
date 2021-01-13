import { PokemonType } from './pokemon-type.model';

export class PokemonEntry {
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
  constructor(id: number, name: string, sprite: string, types: PokemonType[]) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.types = types;
  }
}
