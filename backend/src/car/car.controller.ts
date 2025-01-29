import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCarDTO } from './dto/createCar.dto';
import { CarsService } from './car.service';

@ApiTags('Cars')
@ApiBearerAuth()
@Controller('cars')
@UseGuards(AuthGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All the cars of the user.',
  })
  getAllCarsOfUser(@Request() req: any) {
    return this.carsService.getAllCarsOfUser(req.user.userId);
  }

  @Get('/:car_id')
  @ApiParam({
    name: 'car_id',
    description: 'The ID of the car',
  })
  @ApiResponse({
    status: 200,
    description: 'The data of the car with the given id is returned.',
  })
  getCarData(@Param('car_id') carId: string) {
    return this.carsService.getCarData(carId);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Car with the provided data is successfully created.',
  })
  async addCar(@Body() data: CreateCarDTO, @Request() req: any) {
    return this.carsService.addCar(req.user.userId, data);
  }

  @Patch(':car_id')
  @ApiParam({
    name: 'car_id',
    description: 'The ID of the car',
  })
  @ApiResponse({
    status: 200,
    description:
      'The data of the car with the given id is successfully edited.',
  })
  editCar(@Param('car_id') carId: string, @Body() data: CreateCarDTO) {
    return this.carsService.editCar(carId, data);
  }

  @Delete(':car_id')
  @ApiParam({
    name: 'car_id',
    description: 'The ID of the car',
  })
  @ApiResponse({
    status: 200,
    description: 'The car with the given id is successfuly deleted.',
  })
  deleteCar(@Param('car_id') carId: string) {
    return this.carsService.deleteCar(carId);
  }
}
