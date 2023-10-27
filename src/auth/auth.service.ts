import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';


import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { FileUploadDto } from './dto/file_upload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<User>,
    private jwtService: JwtService,
  ) { }


  async signUp(signUpDto: SignUpDto): Promise<{ user: object }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { user };
  }


  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }


  
  // upload file
  async uploadMocAttachments(data: FileUploadDto): Promise<{}> {
    const { addSign, attachmentFile, email } = data;

    const attachmentFileData = {
      attachmentFile: attachmentFile ? attachmentFile.path : null,
      addSign: addSign ? addSign.path : null
    };

    const userData = await this.userRepository.findOne({
      where: { email: email },
    });

    if (userData) {
      const addAttachmentFiledetails = await this.userRepository.create({
        // ...attachmentFileData, email: userData.email,
      });
      console.log('Upload MOC Attachment Data : ' + JSON.stringify(addAttachmentFiledetails));

      if (!addAttachmentFiledetails) {
        throw new HttpException('Error while MOC File Attachment Upload.', HttpStatus.BAD_REQUEST);
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'MOC Attachment Uploaded Successfully',
      };
    }
  }
}
