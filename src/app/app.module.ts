import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { TimerService } from './services/timer.service';
import { LevelConfigService } from './services/level-config.service';
import { NumbersService } from './services/numbers.service';
import { MessagesService } from './services/messages.service';
import { UserService } from './services/user.service';
import { NumberGridComponent } from './number-grid/number-grid.component';
import { MessageTypeToClassPipe } from './message-type-to-class.pipe';
import { ScoringService } from './services/scoring.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { MainGameComponent } from './main-game/main-game.component';
import { GameHeaderComponent } from './game-header/game-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    NumberGridComponent,
    MessageTypeToClassPipe,
    HighScoresComponent,
    MainGameComponent,
    GameHeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    TimerService,
    LevelConfigService,
    NumbersService,
    MessagesService,
    ScoringService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
