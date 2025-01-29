import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCarDTO } from './dto/createCar.dto';
import { Car } from 'src/schemas/car.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // Get all cars of a specific user
  async getAllCarsOfUser(userId: string) {
    try {
      const user = await this.userModel.findById(userId).populate('cars');
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user.cars;
    } catch (error) {
      throw error;
    }
  }

  // Get specific car data by ID
  async getCarData(carId: string) {
    try {
      const car = await this.carModel.findById(carId).populate('user');
      if (!car) {
        throw new NotFoundException('Car not found');
      }
      return car;
    } catch (error) {
      throw error;
    }
  }

  // Add a new car for a specific user
  async addCar(userId: String, data: CreateCarDTO): Promise<Car> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newCar = new this.carModel({
        title: data.title,
        description: data.description,
        tags: data.tags,
        images: data.images,
        user: userId,
      });

      const savedCar = await newCar.save();

      user.cars.push(savedCar);
      await user.save();

      return savedCar;
    } catch (error) {
      throw error;
    }
  }

  async editCar(carId: string, data: CreateCarDTO) {
    try {
      const car = await this.carModel.findOneAndUpdate(
        { _id: carId },
        { ...data },
        { new: true },
      );
      if (!car) {
        throw new NotFoundException('Car not found');
      }
      return car;
    } catch (error) {
      throw error;
    }
  }

  async deleteCar(carId: string) {
    try {
      await this.carModel.deleteOne({ _id: carId });
      return { message: 'Car successfully deleted' };
    } catch (error) {
      throw error;
    }
  }
}
