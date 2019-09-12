import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { TimerService } from './timer.service';
import { LevelConfigService } from './level-config.service';
import { NumbersService } from './numbers.service';
import { MessagesService } from './messages.service';
import { UserLivesService } from './user-lives.service';
import { NumberGridComponent } from './number-grid/number-grid.component';
import { MessageTypeToClassPipe } from './message-type-to-class.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    NumberGridComponent,
    MessageTypeToClassPipe
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [
    TimerService,
    LevelConfigService,
    NumbersService,
    MessagesService,
    UserLivesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
