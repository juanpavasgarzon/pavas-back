import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationResponse } from 'src/common';
import { Permission, RequirePermissions } from 'src/modules/auth';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { UpdateUserRequest } from '../dto/request/update-user.request';
import { UsersQueryRequest } from '../dto/request/users-query.request';
import { UserResponse } from '../dto/response/user.response';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';
import { FindAllUsersUseCase } from '../use-cases/find-all-users.use-case';
import { FindUserByIdUseCase } from '../use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @RequirePermissions(Permission.USERS_CREATE)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateUserRequest): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute(request);
    return new UserResponse(user);
  }

  @Get()
  @RequirePermissions(Permission.USERS_READ)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: UsersQueryRequest,
  ): Promise<PaginationResponse<UserResponse>> {
    const result = await this.findAllUsersUseCase.execute(query);
    return new PaginationResponse(
      result.data.map((user) => new UserResponse(user)),
      result.meta,
    );
  }

  @Get(':id')
  @RequirePermissions(Permission.USERS_READ)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    const user = await this.findUserByIdUseCase.execute(id);
    return new UserResponse(user);
  }

  @Patch(':id')
  @RequirePermissions(Permission.USERS_UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.updateUserUseCase.execute(id, request);
    return new UserResponse(user);
  }

  @Delete(':id')
  @RequirePermissions(Permission.USERS_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
