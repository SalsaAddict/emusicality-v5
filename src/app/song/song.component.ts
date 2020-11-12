import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISongBreakdown } from '../ibreakdown';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
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
    this._showVideo = this.hasVideo = data.iSong.video !== undefined;
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
  private _showVideo: boolean;
  get showVideo() { return this.hasVideo && this._showVideo; }
  private setupVideo() {
    let e: HTMLVideoElement = document.getElementById("videoElement")! as HTMLVideoElement;
    e.src = this.videoUrl!;
    e.onloadedmetadata = function () {
      console.log("video", e.videoWidth, e.videoHeight);
    }
    e.volume = 1;
    this.media.push(e);
  }
  toggleVideo() { this._showVideo = !this._showVideo; }
  ngOnInit() { if (this.hasVideo) this.setupVideo(); }
}
