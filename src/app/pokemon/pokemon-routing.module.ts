import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonSingleComponent } from './pokemon-single/pokemon-single.component';

// const routes: Routes = [{ path: ':id', component: PokemonSingleComponent }];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
