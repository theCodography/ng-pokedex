export class Pokemon {
  id: number;
  name: string;
  imgUrl: string;
  type_1: string;
  type_2: string;

  constructor(id, name, imgUrl, type_1, type_2) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.type_1 = type_1;
    this.type_2 = type_2;
  }
}
