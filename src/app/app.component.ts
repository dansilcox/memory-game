import { Component } from '@angular/core';
import { IpcRendererService } from './services/ipc-renderer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Memory Game';
  constructor(private _ipc: IpcRendererService) {
    this._ipc.on('pong', (event: Electron.IpcMessageEvent) => {
      console.log('pong');
    });

    this._ipc.send('ping');
  }
}
