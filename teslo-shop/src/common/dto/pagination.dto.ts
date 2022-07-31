import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  readonly limit?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  readonly offset?: number;
}
