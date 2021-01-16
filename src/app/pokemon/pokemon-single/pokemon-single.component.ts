import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/core/services/pokemon.service';

import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-single',
  templateUrl: './pokemon-single.component.html',
  styleUrls: ['./pokemon-single.component.scss'],
})
export class PokemonSingleComponent implements OnInit {
  @Input() message;
  pokemonCurrent: Pokemon;
  pokemonBefore: Pokemon;
  pokemonNext: Pokemon;
  style: { [key: string]: string } = {};
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRoute(+this.route.snapshot.params['id']);
  }
  ngAfterContentChecked() {
    if (this.pokemonCurrent?.baseInfo?.color) {
      this.style = Object.assign({}, this.style, {
        color: 'rgb(' + this.pokemonCurrent.baseInfo.textColor + ')',
      });
    }
  }
  ngAfterViewChecked() {
    if (
      document.location.pathname.split('/')[2] !==
      this.route.snapshot.params['id']
    ) {
      this.getRoute(document.location.pathname.split('/')[2]);
    }
  }
  getRoute(id: any) {
    this.pokemonService.findOne(id).subscribe((data: any) => {
      this.pokemonCurrent = data;
    });
    this.pokemonService.findOne(Number(id) + 1).subscribe((data: any) => {
      this.pokemonNext = data;
    });
    this.pokemonService.findOne(Number(id) - 1).subscribe((data: any) => {
      this.pokemonBefore = data;
    });
  }

  clickBack() {
    let itemId = this.pokemonCurrent.baseInfo.id;
    if (itemId > 1) {
      this.getRoute(itemId - 1);
    }
  }
  clickNext() {
    let itemId = this.pokemonCurrent.baseInfo.id;
    this.getRoute(itemId + 1);
  }
}
