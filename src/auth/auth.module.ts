import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from './schemas/user.schema';
import { DocumentSchema } from './schemas/document.schema';
import { DocumentsController } from 'src/document/document.controller';
import { DocumentService } from 'src/document/document.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ 
      name: 'User', schema: UserSchema 
    }, 
    { 
      name: 'UploadDocument', schema: DocumentSchema 
    }
  ])],
  controllers: [AuthController, DocumentsController],
  providers: [AuthService, JwtStrategy, DocumentService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
