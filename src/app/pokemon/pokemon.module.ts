import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonSingleComponent } from './pokemon-single/pokemon-single.component';


@NgModule({
  declarations: [PokemonListComponent, PokemonSingleComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule
  ],
  exports: [
    PokemonListComponent,
    PokemonSingleComponent
  ]
})
export class PokemonModule { }
