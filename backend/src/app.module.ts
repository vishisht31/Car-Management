import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CarsController } from './car/car.controller';
import { CarsService } from './car/car.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/car.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'thisisarandojwtsecret',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://vishishtmaroria31:88VmjPCX2qJQYQWa@cluster0.s7v57.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AppController, CarsController, AuthController],
  providers: [AppService, CarsService, AuthService],
})
export class AppModule {
  static configureSwagger(app): void {
    const config = new DocumentBuilder()
      .setTitle('Car Management API')
      .setDescription("API documentation for managing User's car")
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
