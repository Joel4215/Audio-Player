import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [AudioPlayerComponent]
})
export class App {
  protected readonly title = signal('audio-player');


}

