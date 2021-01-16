import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { PokemonEntry } from 'src/app/models/pokemon-entry.model';
import { PokemonStats } from 'src/app/models/pokemon-stats.model';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {
  @Input() pokemonCurrent: PokemonStats;
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
      let items: any = document.getElementsByClassName('stats');
      let progressBar: any = document.getElementsByClassName('progress-bar');

      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        let pB = progressBar[i];
        element.style.background = 'rgba(' + this.baseInfo.color + ',.8)';
        element.style.color = 'rgb(' + this.baseInfo.darkColor + ')';
        pB.style.background = 'rgba(' + this.baseInfo.color + ',.8)';
        pB.style.color = 'rgb(' + this.baseInfo.darkColor + ')';
      }
    }
  }
  getStatPercent(stats: object, value: number): string {
    let max = Math.max(
      stats['attack'],
      stats['defense'],
      stats['specialDefense'],
      stats['hp'],
      stats['specialAttack'],
      stats['speed']
    );

    return (value / max) * 100 + '%';
  }
  getTotal(stats: object) {
    return (
      stats['attack'] +
      stats['defense'] +
      stats['specialDefense'] +
      stats['hp'] +
      stats['specialAttack'] +
      stats['speed']
    );
  }
}
