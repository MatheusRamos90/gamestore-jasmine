import EnumGenderGame from '../../enums/enum-gender-game';

export default class GamesDto {
  private id: number;
  private title: any;
  private description: any;
  private gender: EnumGenderGame;
  private image: any;

  public toDTO(params: any): GamesDto {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.gender = params.gender;
    this.image = params.image;
    return this;
  }

  public getDTO(): GamesDto {
    return this;
  }

  public getId(): number {
    return this.id;
  }

  // tslint:disable-next-line:typedef
  public setId(id: number) {
    this.id = id;
  }
}


