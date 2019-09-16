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
import { UserLivesService } from './services/user-lives.service';
import { NumberGridComponent } from './number-grid/number-grid.component';
import { MessageTypeToClassPipe } from './message-type-to-class.pipe';
import { ScoringService } from './services/scoring.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    NumberGridComponent,
    MessageTypeToClassPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule
  ],
  providers: [
    TimerService,
    LevelConfigService,
    NumbersService,
    MessagesService,
    ScoringService,
    UserLivesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
