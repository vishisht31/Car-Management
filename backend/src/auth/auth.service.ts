import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from './dto/SignInDto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    if (!email || !password) {
      console.log('please provide al the details');
      throw new BadRequestException('please provide al the details');
    }

    let existingUser: HydratedDocument<User> | null = null;
    try {
      existingUser = await this.userModel.findOne({ email });
    } catch (error) {
      console.log('error while fetching User', error);
      throw new Error('error while fetching User');
    }

    if (!existingUser) {
      console.log('No user with this email');
      throw new NotFoundException('No user with this email');
    }

    if (existingUser.password != password) {
      console.log('Invalid credentials, Please Try again');
      throw new UnauthorizedException('Invalid credentials, Please Try again');
    }

    const payload = {
      userId: existingUser._id,
    };
    return {
      message: 'Login successfull',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(data: SigninDTO) {
    if (!data) {
      console.log('Please provide all the details');
      throw new BadRequestException('Please provide all details');
    }
    let existingUser: HydratedDocument<User> | null = null;
    try {
      existingUser = await this.userModel.findOne({
        email: data.email,
      });
    } catch (err) {
      console.log('error while fetching user: ', err);
      throw new Error('error while fetching user');
    }

    if (existingUser) {
      console.log('User with this mail already exists');
      throw new BadRequestException('User with this mail already exists');
    }

    try {
      let newUser = await this.userModel.create(data);
      console.log('successfully created new user', newUser);
      return newUser;
    } catch (error) {
      console.log('error while saving user', error);
      throw new Error('error while saving user');
    }
  }
}
