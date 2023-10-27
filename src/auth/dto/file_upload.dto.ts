import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class FileUploadDto {
  @IsOptional()
  @IsString()
  readonly attachmentFile: any;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsOptional()
  readonly addSign: any;
}
