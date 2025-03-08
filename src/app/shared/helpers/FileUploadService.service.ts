import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor() { }
  extractFileNameAndExtension(file: File): { fileName: string; fileExtension: string } {
    const fileName = file.name.split('.')[0];
    const fileExtension = file.name.split('.').pop() || '';
    return { fileName, fileExtension };
  }

  extractFileType(file: File): string {
    const fileExtension = this.extractFileNameAndExtension(file).fileExtension;
    return fileExtension.toLowerCase();
  }

  isFileAccepted(fileType: string, acceptableFiles: string[]): boolean {
    return acceptableFiles.includes(fileType);
  }
  isFileSizeValid(file: File, maxSizeInMB: number): boolean {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to megabytes
    return fileSizeInMB <= maxSizeInMB;
  }
}
