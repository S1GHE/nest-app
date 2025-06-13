import { ApiProperty } from '@nestjs/swagger';
import { StatusTask } from 'src/shared/enum';

export class TaskResponseDto {
  @ApiProperty({ description: 'ID задачи', example: 1 })
  id: number;

  @ApiProperty({ description: 'Название задачи', example: 'Write a report' })
  name: string;

  @ApiProperty({
    description: 'Описание задачи',
    example: 'Detailed description',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Статус задачи',
    enum: StatusTask,
    example: StatusTask.TASK,
  })
  status: StatusTask;
}
