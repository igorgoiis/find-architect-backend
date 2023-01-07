import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/user/models/user.model';
import { UserService } from '../user/user.service';
import { AuthInput } from './dtos/auth.input';
import { AuthModel } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthModel> {
    const userPassword = await this.prismaService.user.findUnique({
      where: { email: data.email },
      select: {
        password: true,
      },
    });
    const user = await this.userService.findUserByEmail(data.email);

    const validPassword = compareSync(
      data.password,
      userPassword?.password as string,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };

    return await this.jwtService.signAsync(payload);
  }
}
