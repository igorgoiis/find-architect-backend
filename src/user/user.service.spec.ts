import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma/prisma.service';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import TestUtil from '../common/test/TestUtil';
import { BadRequestException } from '@nestjs/common/exceptions';

// Mocking Prisma
const mockPrisma = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  // Configuracoes antes do teste
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    mockPrisma.user.create.mockReset();
    mockPrisma.user.delete.mockReset();
    mockPrisma.user.findMany.mockReset();
    mockPrisma.user.findUnique.mockReset();
    mockPrisma.user.update.mockReset();
  });

  // Limpando os mocks depois dos testes
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findUsers', () => {
    it('should return an array with all users', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.findMany.mockReturnValue([user, user, user]);
      const users = await userService.findAllUsers();

      expect(users).toHaveLength(3);
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.user.findMany).toHaveBeenCalledWith();
    });

    it('should return an array users by role', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.findMany.mockReturnValue([user, user]);
      const response = await userService.findUserByRole(user.role);

      expect(response).toHaveLength(2);
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: { role: user.role },
      });
    });
  });

  describe('findUser', () => {
    it('should return user by id', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.findUnique.mockReturnValue(user);
      const userFound = await userService.findUserById(user.id);

      expect(userFound).toMatchObject(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });

    it('should return exception when user is not found by id', async () => {
      mockPrisma.user.findUnique.mockReturnValue(null);

      userService.findUserById('123123').catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'User not found.' });
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '123123' },
      });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.findUnique.mockReturnValue(null);
      mockPrisma.user.create.mockReturnValue(user);

      const createdUser = await userService.createUser(user);

      expect(createdUser).toMatchObject(user);
      expect(mockPrisma.user.create).toBeCalledTimes(1);
    });

    it('should return exception when user already exists.', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.findUnique.mockReturnValue(user);

      await userService.createUser(user).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({ message: 'This email already exists.' });
      });
      expect(mockPrisma.user.findUnique).toBeCalledTimes(1);
      expect(mockPrisma.user.create).toBeCalledTimes(0);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.update.mockReturnValue({
        ...user,
        name: 'Nome atualizado',
      });

      const updatedUser = await userService.updateUser(user.id, {
        ...user,
        name: 'Nome atualizado',
      });

      expect(updatedUser).toMatchObject({ name: 'Nome atualizado' });
      expect(mockPrisma.user.update).toBeCalledTimes(1);
    });

    it('should return exception when user not found', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.update.mockReturnValue(null);

      await userService
        .updateUser(user.id, {
          ...user,
          name: 'Nome Atualizado',
        })
        .catch((e) => {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e).toMatchObject({ message: 'User not found.' });
        });
      expect(mockPrisma.user.update).toBeCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.delete.mockReturnValue(user);

      const deletedUser = await userService.deleteUser(user.id);

      expect(deletedUser).toBe(true);
      expect(mockPrisma.user.delete).toBeCalledTimes(1);
    });

    it('should return exception when user not found', async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockPrisma.user.delete.mockReturnValue(null);

      const deletedUser = await userService.deleteUser(user.id);

      expect(deletedUser).toBe(false);
      expect(mockPrisma.user.delete).toBeCalledTimes(1);
    });
  });
});
