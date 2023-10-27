import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { DocumentService } from './document.service';
import { multerConfig } from './multer.config';
import { FileUploadDto } from 'src/auth/dto/file_upload.dto';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentService: DocumentService,
    // private readonly fileupload: FileUploadDto
    ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    
    const filename = await this.documentService.uploadFile(file);
    
    return { message: 'File uploaded successfully', filename };
  }
}
