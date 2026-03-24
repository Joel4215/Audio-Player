import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Song } from '../shared/types';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
    selector: 'cr-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule, FileUploadComponent]
})
export class AudioPlayerComponent implements OnInit {
    @ViewChild('player') player!: ElementRef<HTMLAudioElement>;

    fileName = '';
    songs: Song[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    play() {
  this.player.nativeElement.play();
}

    playSong(song: Song) {
  this.player.nativeElement.src = song.url;
  this.fileName = song.name;
  this.player.nativeElement.play();
}

    onFileSelected(song: Song) {
        this.fileName = song.name;
        this.player.nativeElement.src = song.url;
        this.songs.push(song);
    }
}