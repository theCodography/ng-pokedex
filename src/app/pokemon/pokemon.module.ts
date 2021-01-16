import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonSingleComponent } from './pokemon-single/pokemon-single.component';
import { PokemonListImgComponent } from './pokemon-list/pokemon-list-img/pokemon-list-img.component';
import { FeetPipe } from '../shared/metrics/feet.pipe';
import { PoundPipe } from '../shared/metrics/pound.pipe';
import { PokemonAbilityComponent } from './pokemon-single/pokemon-ability/pokemon-ability.component';
import { PokemonStatsComponent } from './pokemon-single/pokemon-stats/pokemon-stats.component';
import { PokemonTypesComponent } from './pokemon-single/pokemon-types/pokemon-types.component';
import { PokemonSpeciesComponent } from './pokemon-single/pokemon-species/pokemon-species.component';
import { PokemonInfoComponent } from './pokemon-single/pokemon-info/pokemon-info.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonSingleComponent,
    PokemonListImgComponent,
    FeetPipe,
    PoundPipe,
    PokemonAbilityComponent,
    PokemonStatsComponent,
    PokemonTypesComponent,
    PokemonSpeciesComponent,
    PokemonInfoComponent,
  ],
  imports: [CommonModule, PokemonRoutingModule],
  exports: [PokemonListComponent, PokemonSingleComponent],
})
export class PokemonModule {}
