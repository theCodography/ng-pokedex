import { EvolutionChain } from './evolution-chain.model';
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
  _evolutionChain: EvolutionChain[];

  constructor(
    baseInfo: PokemonEntry,
    abilityInfo: PokemonAbilityInfo,
    descriptions: PokemonDescription[],
    types: PokemonType[],
    stats: PokemonStats,
    evoChain: EvolutionChain[]
  ) {
    this.baseInfo = baseInfo;
    this.abilityInfo = abilityInfo;
    this.descriptions = descriptions;
    this.types = types;
    this.stats = stats;
    this._evolutionChain = evoChain;
  }

  public get evolutionChain() : EvolutionChain[] {
    return this._evolutionChain;
  }

  public set evolutionChain(v : EvolutionChain[]) {
    this._evolutionChain = v;
  }
}
