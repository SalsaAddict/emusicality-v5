import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongService } from './song/song.service';
import { SongComponent } from './song/song.component';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'songs/:songId', component: SongComponent, resolve: { data: SongService } },
  { path: '', redirectTo: '/songs/esoesamor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
