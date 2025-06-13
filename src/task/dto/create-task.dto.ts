import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3, { message: 'Название не должно быть меньше 3 символов' })
  @ApiProperty({ description: 'Название задачи', example: 'Write a report' })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Описание задачи',
    example: 'Detailed description',
    required: false,
  })
  descriptions: string;
}
