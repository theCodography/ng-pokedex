import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';
import { PokemonType } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss'],
})
export class PokemonTypesComponent implements OnInit {
  @Input() types: PokemonType;
  @Input() baseInfo: PokemonEntry;
  style: { [key: string]: string } = {};
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}
  ngAfterContentChecked() {
    if (this?.baseInfo?.color) {
      this.style = this.pokemonService.getDark(
        this.style,
        this.baseInfo.darkColor
      );
    }
  }
}
