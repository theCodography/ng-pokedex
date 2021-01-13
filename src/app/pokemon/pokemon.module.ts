import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonSingleComponent } from './pokemon-single/pokemon-single.component';
import { PokemonSingleSliderComponent } from './pokemon-single/pokemon-single-slider/pokemon-single-slider.component';
import { PokemonSingleMainComponent } from './pokemon-single/pokemon-single-main/pokemon-single-main.component';
import { PokemonSingleBaseComponent } from './pokemon-single/pokemon-single-base/pokemon-single-base.component';
import { PokemonListImgComponent } from './pokemon-list/pokemon-list-img/pokemon-list-img.component';
import { FeetPipe } from '../shared/metrics/feet.pipe';
import { PoundPipe } from '../shared/metrics/pound.pipe';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonSingleComponent,
    PokemonSingleSliderComponent,
    PokemonSingleMainComponent,
    PokemonSingleBaseComponent,
    PokemonListImgComponent,
    FeetPipe,
    PoundPipe,
  ],
  imports: [CommonModule, PokemonRoutingModule],
  exports: [PokemonListComponent, PokemonSingleComponent],
})
export class PokemonModule {}
