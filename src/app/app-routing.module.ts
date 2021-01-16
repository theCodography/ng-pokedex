import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonSingleComponent } from './pokemon/pokemon-single/pokemon-single.component';

const routes: Routes = [
  { path: 'pokemon/:id', component: PokemonSingleComponent },
  { path: '', component: HomeComponent, pathMatch: 'full'},
  // { path: 'pokemon', loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
