import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { forkJoin, Observable } from 'rxjs';
import ColorThief from 'node_modules/colorthief';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon: Pokemon[] = [];
  constructor(private http: HttpClient) {}

  //* Get AllPokemon
  getAllPokemon(): Observable<Pokemon[]> {
    let urls = [];
    let ObjPokemon: Pokemon;

    for (let i = 1; i < 41; i++) {
      urls.push(this.http.get<Pokemon[]>(`${apiUrl}/${i}`).pipe());
    }

    return forkJoin<Pokemon>(urls);

    // return this.pokemon;
  }

  //* Get Pokemon by name
  getPokemon(name: string) {
    return this.http.get(`${apiUrl}/${name}`);
  }

  //* Get Color

  getColor(pokemon) {
    const colorThief = new ColorThief();
    let pkm: Pokemon[] = pokemon;
    let colorList = [];
    let colorTextList = [];
    function fill() {
      let images = document.getElementsByClassName('card-img-top');
      Array.from(images).forEach((img) => {
        if (img) {
          let color = colorThief.getPalette(img, 5);
          // console.log(color[0]);
          let colorText = color[0].map((c) => {
            return c - 50;
          });
          colorList.push(color[0]);
          colorTextList.push(colorText);
        }
      });

      for (const p in pkm) {
        if (localStorage.length <= Number(p) * 2) {
          pkm[p].color = colorList[p];
          pkm[p].textColor = colorTextList[p];
          localStorage.setItem(`${p}color`, colorList[p]);
          localStorage.setItem(`${p}colorText`, colorTextList[p]);
        } else {
          pkm[p].color = localStorage.getItem(`${p}color`);
          pkm[p].textColor = localStorage.getItem(`${p}colorText`);
        }
      }
    }

    if (document.readyState === 'complete') {
      fill();
    } else {
      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          fill();
        }
      };
    }
  }
}
