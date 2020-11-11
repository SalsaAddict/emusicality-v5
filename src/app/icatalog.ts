export interface ICatalog {
  $schema: "../schemas/catalog.json";
  songs: ISongs;
}

export interface ISongs { [id: string]: ISong; }

export interface ISong {
  readonly title: string;
  readonly artist: string;
  readonly genre: string;
  readonly bpm: number;
  readonly image: string;
  readonly video?: string;
}
