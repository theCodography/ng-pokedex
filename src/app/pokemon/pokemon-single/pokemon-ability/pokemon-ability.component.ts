import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonAbility } from 'src/app/models/pokemon-ability.model';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';

@Component({
  selector: 'app-pokemon-ability',
  templateUrl: './pokemon-ability.component.html',
  styleUrls: ['./pokemon-ability.component.scss'],
})
export class PokemonAbilityComponent implements OnInit {
  @Input() ability: PokemonAbility;
  @Input() baseInfo: PokemonEntry;
  style: { [key: string]: string } = {};
  isHidden: boolean;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}
  ngAfterContentChecked() {
    if (this?.baseInfo?.color) {
      this.style = this.pokemonService.getDark(
        this.style,
        this.baseInfo.darkColor
      );
      let items: any = document.getElementsByClassName('ability__item');
      let hidden: any = document.getElementById('isHidden');
      let value: any = document.getElementById('hiddenValue');
      let borderHidden: any = document.getElementsByClassName('border-hidden');
      if(hidden){
        for (let i = 0; i < borderHidden.length; i++) {
          let element = borderHidden[i];
          element.style.borderColor = 'rgb(' + this.baseInfo.color + ')';
        }
        value.style.background = 'rgba(255,255,255,.8)';
      }

      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.style.background = 'rgba(' + this.baseInfo.color + ',.8)';
        element.style.color = 'rgb(' + this.baseInfo.darkColor + ')';
      }
    }
  }
}
