import { PokemonType } from './pokemon-type.model';

export class PokemonEntry {
  id: number;
  name: string;
  sprite: string;
  _types: PokemonType[];
  _color: number[];
  _textColor: number[];
  _darkColor: number[];
  _mutedColor: number[];
  constructor(
    id: number,
    name: string,
    sprite: string,
    color: number[],
    types?: PokemonType[],
  ) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this._types = types;
    this._color = color;
  }


  public get type() : PokemonType[] {
    return this._types;
  }

  public set type(v : PokemonType[]) {
    this._types = v;
  }
  public get color() : number[] {
    return this._color;
  }

  public set color(v : number[]) {
    this._color = v;
    this._textColor = v.map((tC) => tC - 30);
    this._mutedColor = v.map((tC) => tC - 50);
    this._darkColor = v.map((tC) => tC - 70);
  }
  public get textColor() : number[] {
    return this._textColor;
  }
  public get mutedColor() : number[] {
    return this._mutedColor;
  }
  public get darkColor() : number[] {
    return this._darkColor;
  }

}
