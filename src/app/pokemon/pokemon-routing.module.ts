import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { PokemonSingleComponent } from './pokemon-single/pokemon-single.component';

const pokemonRoutes: Routes = [
  { path: 'pokemon/:id', component: PokemonSingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(pokemonRoutes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
