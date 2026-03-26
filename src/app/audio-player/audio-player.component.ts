import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Song } from '../shared/types';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
    selector: 'cr-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, FileUploadComponent]
})
export class AudioPlayerComponent implements OnInit {
    @ViewChild('player') player!: ElementRef<HTMLAudioElement>;

    fileName = '';
    fileUrl = '';
    songs: Song[] = [];
    isPlaying = false;
    isMuted = false;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    togglePlay() {
      const audio = this.player.nativeElement;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    }

    toggleMute() {
      const audio = this.player.nativeElement;
      this.isMuted = !this.isMuted;
      audio.muted = this.isMuted;
    }

    loadSong(song: Song) {
      const audio = this.player.nativeElement;

      if (!audio.paused) {
        // If something is already playing, pause it before loading the new track
        audio.pause();
        this.isPlaying = false;
      }

      this.fileUrl = song.url;
      this.fileName = song.name;

      // Do not re-add to recently played if selecting from the history list
      if (!this.songs.some(s => s.url === song.url && s.name === song.name)) {
        this.songs.push(song);
      }

      audio.src = song.url;
      audio.load();

      // Do not auto-play; remain in play-ready state.
      this.isPlaying = false;
    }

    onFileSelected(song: Song) {
      const audio = this.player.nativeElement;

      if (!audio.paused) {
        // stop playback on new upload
        audio.pause();
        this.isPlaying = false;
      }

      this.fileUrl = song.url;
      this.fileName = song.name;
      this.songs.push(song);

      // the uploaded file loads, but should not start playing automatically
      audio.src = song.url;
      audio.load();
      this.isPlaying = false;
    }

    removeSong(song: Song) {
        this.songs = this.songs.filter(s => s !== song);
    }
}