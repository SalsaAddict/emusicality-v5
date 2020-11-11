import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IBreakdown, ISongBreakdown } from '../ibreakdown';
import { ICatalog } from '../icatalog';

@Injectable({ providedIn: 'root' })
export class SongService {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot): Observable<ISongBreakdown> {
    return new Observable((observer) => {
      let path = "assets/songs/", songId: string = route.params["songId"];
      this.http.get<ICatalog>(`${path}catalog.json`)
        .subscribe((catalog) => {
          path += `${songId}/`;
          this.http.get<IBreakdown>(`${path}breakdown.json`).subscribe((breakdown) => {
            observer.next({ songId: songId, path: path, iSong: catalog.songs[songId], iBreakdown: breakdown });
            observer.complete();
          });
        });
    });
  }
}
