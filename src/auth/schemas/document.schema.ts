import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class UploadDocument extends Document {

  @Prop()
  email: string;

  @Prop()
  document: string;

  @Prop()
  signature: string;
}

export const DocumentSchema = SchemaFactory.createForClass(UploadDocument);