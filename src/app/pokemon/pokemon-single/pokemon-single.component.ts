import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/core/services/pokemon.service';

import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-single',
  templateUrl: './pokemon-single.component.html',
  styleUrls: ['./pokemon-single.component.scss'],
})
export class PokemonSingleComponent implements OnInit {
  @Input() message;
  isOpen = true;

  pokemonCurrent: Pokemon;
  pokemonBefore: Pokemon = null;
  pokemonNext: Pokemon = null;
  style: { [key: string]: string } = {};
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this.pokemonService.findOne(Number(id)))
      )
      .subscribe((pokemon) => (this.pokemonCurrent = pokemon));
  }
  ngAfterContentChecked() {
    if (this.pokemonCurrent?.baseInfo?.color) {
      this.style = Object.assign({}, this.style, {
        color: 'rgb(' + this.pokemonCurrent.baseInfo.textColor + ')',
      });
    }
  }
  getRoute(id: any) {
    this.pokemonService.findOne(id).subscribe((data: any) => {
      this.pokemonCurrent = data;
    });
    this.pokemonService.findOne(Number(id) + 1).subscribe((data: any) => {
      this.pokemonNext = data;
    });
    if (id > 1) {
      this.pokemonService.findOne(Number(id) - 1).subscribe((data: any) => {
        this.pokemonBefore = data;
      });
    }
  }
}
