import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Architect } from 'src/architect/models/architect.model';
import { ArchitectService } from '../architect/architect.service';
import { AuthInput } from './dtos/auth.input';
import { AuthModel } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private architectService: ArchitectService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateArchitect(data: AuthInput): Promise<AuthModel> {
    const architectPassword = await this.prismaService.architect.findUnique({
      where: { email: data.email },
      select: {
        password: true,
      },
    });
    const architect = await this.architectService.findArchitectByEmail(
      data.email,
    );

    const validPassword = compareSync(
      data.password,
      architectPassword?.password ?? '',
    );

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const token = await this.jwtToken(architect);

    return {
      architect,
      token,
    };
  }

  private async jwtToken(architect: Architect): Promise<string> {
    const payload = { architectname: architect.name, sub: architect.id };

    return await this.jwtService.signAsync(payload);
  }
}
