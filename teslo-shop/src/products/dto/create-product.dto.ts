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
  @IsString()
  @MinLength(1)
  readonly title: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsString({ each: true })
  @IsArray()
  readonly sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  readonly gender: string;

  @IsString({ each: true })
  @IsArray()
  readonly images: string[];

  @IsString({ each: true })
  @IsArray()
  readonly tags: string[];
}
