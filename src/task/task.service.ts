import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.task.findMany();
    } catch (error) {
      console.error(`Ошибка при получении задач: ${error}`);
      throw error;
    }
  }

  async findId(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Задача с ID ${id} не найдена`);
      }

      return task;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        // TODO: Вынести в Enum
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Задача с ID ${id} не найдена`);
      }
      console.error('Ошибка при обновлении задачи:', error);
      throw error;
    }
  }

  async createTask(dto: CreateTaskDto) {
    try {
      return await this.prisma.task.create({
        data: dto,
      });
    } catch (error) {
      console.log(`Ошибка при получении задачи: ${error}`);
      throw error;
    }
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: { id },
        data: dto,
      });

      return task;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Задача с ID ${id} не найдена`);
      }
      console.error('Ошибка при обновлении задачи:', error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const task = await this.prisma.task.delete({
        where: { id },
      });
      return task;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Задача с ID ${id} не найдена`);
      }
      console.error('Ошибка при удалении задачи', error);
      throw error;
    }
  }
}
