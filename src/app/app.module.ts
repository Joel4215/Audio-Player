import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AudioPlayerComponent
  ],
  providers: []
})
export class AppModule { }
