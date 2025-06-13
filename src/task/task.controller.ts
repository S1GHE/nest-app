import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Задачи')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех задач' })
  @ApiResponse({
    status: 200,
    description: 'Список задач успешно возвращён',
    type: Array<TaskResponseDto>,
  })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно найдена',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @ApiResponse({ status: 400, description: 'Некорректный ID' })
  async findId(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findId(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Задача успешно создана' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  async createTask(@Body() dto: CreateTaskDto) {
    return await this.taskService.createTask(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить задачу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно обновлена',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно удалена',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.delete(id);
  }
}
