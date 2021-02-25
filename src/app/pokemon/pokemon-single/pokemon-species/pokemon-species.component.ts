import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonDescription } from 'src/app/models/pokemon-description.model';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-species',
  templateUrl: './pokemon-species.component.html',
  styleUrls: ['./pokemon-species.component.scss'],
})
export class PokemonSpeciesComponent implements OnInit {
  @Input() description: PokemonDescription;
  @Input() baseInfo: PokemonEntry;
  style: { [key: string]: string } = {};
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // console.log(this.description);
  }
  ngAfterContentChecked() {
    if (this?.baseInfo?.color) {
      this.style = this.pokemonService.getDark(
        this.style,
        this.baseInfo.darkColor
      );

    }
  }
}
