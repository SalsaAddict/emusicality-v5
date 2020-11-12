import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISongBreakdown } from '../ibreakdown';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html'
})
export class SongComponent {
  constructor(route: ActivatedRoute) {
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.connect(this.context.destination);
    let data: ISongBreakdown = route.snapshot.data["data"];
    this.songId = data.songId;
    this.title = data.iSong.title;
    this.artist = data.iSong.artist;
    this.genre = data.iSong.genre;
    this.imageUrl = `${data.path}${data.iSong.image}`;
    this.videoUrl = `${data.path}${data.iSong.video}`;
    this.hasVideo = data.iSong.video !== undefined;
  }
  private readonly context: AudioContext;
  private readonly master: GainNode;
  private readonly media: HTMLMediaElement[] = [];
  readonly songId: string;
  readonly title: string;
  readonly artist: string;
  readonly genre: string;
  readonly imageUrl: string;
  readonly videoUrl?: string
  readonly hasVideo: boolean;
}
