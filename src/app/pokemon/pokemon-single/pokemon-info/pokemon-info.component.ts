import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonAbilityInfo } from 'src/app/models/pokemon-ability-info.model';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})
export class PokemonInfoComponent implements OnInit {
  @Input() info: PokemonAbilityInfo;
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
