import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: [] })
  tags: [string];
  @Prop({ default: [] })
  images: [string];

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  user: User;
}

export const CarSchema = SchemaFactory.createForClass(Car);
