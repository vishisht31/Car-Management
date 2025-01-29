import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateCarDTO {
  @IsNotEmpty()
  @IsString()
  title: String;
  @IsNotEmpty()
  description: String;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: [string];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images: string[];
}