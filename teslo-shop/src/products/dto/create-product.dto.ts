import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'product title (unique)',
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  readonly sizes: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  readonly gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  readonly images: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  readonly tags: string[];
}
