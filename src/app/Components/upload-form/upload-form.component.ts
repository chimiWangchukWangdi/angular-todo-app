import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/Services/file-upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage?: number;

  constructor(private uploadService: FileUploadService, public dialogRef: MatDialogRef<UploadFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUpload,) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

}
