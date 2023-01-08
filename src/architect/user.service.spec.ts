import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma/prisma.service';
import { ArchitectService } from './architect.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import TestUtil from '../common/test/TestUtil';
import { BadRequestException } from '@nestjs/common/exceptions';

// Mocking Prisma
const mockPrisma = {
  architect: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ArchitectService', () => {
  let architectService: ArchitectService;
  let prismaService: PrismaService;

  // Configuracoes antes do teste
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArchitectService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    architectService = module.get<ArchitectService>(ArchitectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    mockPrisma.architect.create.mockReset();
    mockPrisma.architect.delete.mockReset();
    mockPrisma.architect.findMany.mockReset();
    mockPrisma.architect.findUnique.mockReset();
    mockPrisma.architect.update.mockReset();
  });

  // Limpando os mocks depois dos testes
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findArchitects', () => {
    it('should return an array with all architect', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.findMany.mockReturnValue([
        architect,
        architect,
        architect,
      ]);
      const architects = await architectService.findAllArchitects();

      expect(architects).toHaveLength(3);
      expect(prismaService.architect.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.architect.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findArchitect', () => {
    it('should return architect by id', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.findUnique.mockReturnValue(architect);
      const architectFound = await architectService.findArchitectById(
        architect.id,
      );

      expect(architectFound).toMatchObject(architect);
      expect(prismaService.architect.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.architect.findUnique).toHaveBeenCalledWith({
        where: { id: architect.id },
      });
    });

    it('should return exception when architect is not found by id', async () => {
      mockPrisma.architect.findUnique.mockReturnValue(null);

      architectService.findArchitectById('123123').catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Architect not found.' });
      });
      expect(prismaService.architect.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.architect.findUnique).toHaveBeenCalledWith({
        where: { id: '123123' },
      });
    });

    it('should return architect by email', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.findUnique.mockReturnValue(architect);
      const architectFound = await architectService.findArchitectByEmail(
        architect.email,
      );

      expect(architectFound).toMatchObject(architect);
      expect(prismaService.architect.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.architect.findUnique).toHaveBeenCalledWith({
        where: { email: architect.email },
      });
    });

    it('should return exception when architect is not found by email', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.findUnique.mockReturnValue(null);

      architectService.findArchitectByEmail(architect.email).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Architect not found.' });
      });
      expect(prismaService.architect.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.architect.findUnique).toHaveBeenCalledWith({
        where: { email: architect.email },
      });
    });
  });

  describe('createArchitect', () => {
    it('should create a new architect', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.findUnique.mockReturnValue(null);
      mockPrisma.architect.create.mockReturnValue(architect);

      const createdArchitect = await architectService.createArchitect(
        architect,
      );

      expect(createdArchitect).toMatchObject(architect);
      expect(mockPrisma.architect.create).toBeCalledTimes(1);
    });

    it('should return exception when architect already exists.', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.findUnique.mockReturnValue(architect);

      await architectService.createArchitect(architect).catch((e) => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({ message: 'This email already exists.' });
      });
      expect(mockPrisma.architect.findUnique).toBeCalledTimes(1);
      expect(mockPrisma.architect.create).toBeCalledTimes(0);
    });
  });

  describe('updateArchitect', () => {
    it('should update a architect', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.update.mockReturnValue({
        ...architect,
        name: 'Nome atualizado',
      });

      const updatedArchitect = await architectService.updateArchitect(
        architect.id,
        {
          ...architect,
          name: 'Nome atualizado',
        },
      );

      expect(updatedArchitect).toMatchObject({ name: 'Nome atualizado' });
      expect(mockPrisma.architect.update).toBeCalledTimes(1);
    });

    it('should return exception when architect not found', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.update.mockReturnValue(null);

      await architectService
        .updateArchitect(architect.id, {
          ...architect,
          name: 'Nome Atualizado',
        })
        .catch((e) => {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e).toMatchObject({ message: 'Architect not found.' });
        });
      expect(mockPrisma.architect.update).toBeCalledTimes(1);
    });
  });

  describe('deleteArchitect', () => {
    it('should delete a architect', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.delete.mockReturnValue(architect);

      const deletedArchitect = await architectService.deleteArchitect(
        architect.id,
      );

      expect(deletedArchitect).toBe(true);
      expect(mockPrisma.architect.delete).toBeCalledTimes(1);
    });

    it('should return exception when architect not found', async () => {
      const architect = TestUtil.giveAMeAValidArchitect();
      mockPrisma.architect.delete.mockReturnValue(null);

      const deletedArchitect = await architectService.deleteArchitect(
        architect.id,
      );

      expect(deletedArchitect).toBe(false);
      expect(mockPrisma.architect.delete).toBeCalledTimes(1);
    });
  });
});
