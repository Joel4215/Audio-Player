import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Song } from '../../shared/types';

@Component({
    selector: 'cr-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule]
})
export class FileUploadComponent {
    fileName = '';

    @Output() fileSelected = new EventEmitter<Song>();

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.fileName = file.name;
            const url = URL.createObjectURL(file);
            this.fileSelected.emit({ name: file.name, url: url });
        }
    }
}
