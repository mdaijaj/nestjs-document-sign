import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadDocument } from 'src/auth/schemas/document.schema';
import { User } from 'src/auth/schemas/user.schema';
// import { createWriteStream } from 'fs';





@Injectable()
export class DocumentService {

  // constructor(
  //   @InjectModel(User.name)
  //   private userRepository: Model<User>,

  //   @InjectModel(UploadDocument.name)
  //   private fileRepository: Model<UploadDocument>,

  // ) { }

  async uploadFile(file) {
    console.log("file", file)
    const { originalname, buffer } = file;
    const filename = `${Date.now()}-${originalname}`;

    // const writeStream = createWriteStream(`./uploads/${filename}`);
    // writeStream.write(buffer);

    // const userData= await this.userRepository.findOne({email: "aijaj@gmail.com"})
    // if(userData){
    //   const fileData= await this.fileRepository.create({
    //     document: filename, email: userData.email
    //   })

    //   if(fileData){
    //     return fileData
    //   }
    // }

    return filename;
  }
}
