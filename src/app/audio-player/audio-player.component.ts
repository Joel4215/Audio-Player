import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Song } from '../type/types';

@Component({
    selector: 'cr-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule]
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

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.fileName = file.name;
            const url = URL.createObjectURL(file);
            this.player.nativeElement.src = url;
            this.songs.push({ name: file.name, url: url });
        }
    }
    
    playSong(song: Song) {
        this.player.nativeElement.src = song.url;
        this.player.nativeElement.play();
    }

}