export class Pokemon {
  id: number;
  name: string;
  imgUrl: string;
  types;
  sprites;
  abilities;
  species;
  _color: string;
  _textColor: string;


  get color(): string {
    return this._color;
  }

  set color(v : string) {
    this._color = v;
  }
  get textColor(): string {
    return this._textColor;
  }

  set textColor(v : string) {
    this._textColor = v;
  }
}
