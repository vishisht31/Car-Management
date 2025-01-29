import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Car } from './car.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  })
  cars: Car[];
}

export const UserSchema = SchemaFactory.createForClass(User);
