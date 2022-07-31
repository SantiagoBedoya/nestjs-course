import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  readonly limit?: number;

  @ApiProperty({
    description: 'How many rows do you want to skip',
    default: 0,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  readonly offset?: number;
}
