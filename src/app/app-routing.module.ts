import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGameComponent } from './main-game/main-game.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { ResetGameGuard } from './guards/reset-game.guard';

const routes: Routes = [
  { path: 'game', component: MainGameComponent, canDeactivate: [ResetGameGuard] },
  { path: 'high-scores', component: HighScoresComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
