import { ApiProperty } from '@nestjs/swagger';
import { StatusTask } from 'src/shared/enum';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Название не должно быть меньше 3 символов' })
  @ApiProperty({ description: 'Название задачи', example: 'Write a report' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Описание задачи',
    example: 'Detailed description',
    required: false,
  })
  descriptions?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Статус задачи',
    enum: StatusTask,
    example: StatusTask.IN_PROGRESS,
  })
  @IsEnum(StatusTask, { message: 'Только: TASK, IN_PROGRESS, COMPLITED' })
  status_task?: StatusTask;
}
