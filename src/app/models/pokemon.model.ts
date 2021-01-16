import { PokemonAbilityInfo } from './pokemon-ability-info.model';
import { PokemonDescription } from './pokemon-description.model';
import { PokemonEntry } from './pokemon-entry.model';
import { PokemonStats } from './pokemon-stats.model';
import { PokemonType } from './pokemon-type.model';

export class Pokemon {
  baseInfo: PokemonEntry;
  abilityInfo: PokemonAbilityInfo;
  descriptions: PokemonDescription[];
  types: PokemonType[];
  stats: PokemonStats;

  constructor(
    baseInfo: PokemonEntry,
    abilityInfo: PokemonAbilityInfo,
    descriptions: PokemonDescription[],
    types: PokemonType[],
    stats: PokemonStats
  ) {
    this.baseInfo = baseInfo;
    this.abilityInfo = abilityInfo;
    this.descriptions = descriptions;
    this.types = types;
    this.stats = stats;
  }
}
