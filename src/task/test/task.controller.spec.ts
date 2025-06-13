import { Test } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { StatusTask } from 'src/shared/enum';
import { UpdateTaskDto } from '../dto';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findId: jest.fn(),
            updateTask: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('Should return a task by ID', async () => {
    const task = {
      id: 1,
      name: 'Название задачи',
      descriptions: 'Описание задачи',
      status_task: StatusTask.TASK,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(taskService, 'findId').mockResolvedValue(task);

    expect(await controller.findId(1)).toEqual(task);
    expect(taskService.findId).toHaveBeenCalledWith(1);
  });

  it('Should return the updated task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      name: 'Обновленное название',
      descriptions: 'Обновленное описание',
    };
    const updatedTask = {
      id: 1,
      name: 'Обновленное название',
      descriptions: 'Обновленное описание',
      status_task: StatusTask.TASK,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(taskService, 'updateTask').mockResolvedValue(updatedTask);

    expect(await controller.updateTask(1, updateTaskDto)).toEqual(updatedTask);
    expect(taskService.updateTask).toHaveBeenCalledWith(1, updateTaskDto);
  });

  it('Should return the deleted task', async () => {
    const deletedTask = {
      id: 1,
      name: 'Название задачи',
      descriptions: 'Описание задачи',
      status_task: StatusTask.TASK,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(taskService, 'delete').mockResolvedValue(deletedTask);

    expect(await controller.deleteTask(1)).toEqual(deletedTask);
    expect(taskService.delete).toHaveBeenCalledWith(1);
  });
});
