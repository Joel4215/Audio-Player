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
      this.fileUrl = song.url;
      this.fileName = song.name;
      this.songs.push(song);
      this.player.nativeElement.src = song.url;
      this.isPlaying = false;
    }

    onFileSelected(song: Song) {
      this.fileUrl = song.url;
      this.fileName = song.name;
      this.songs.push(song);
    }

    removeSong(song: Song) {
        this.songs = this.songs.filter(s => s !== song);
    }
}