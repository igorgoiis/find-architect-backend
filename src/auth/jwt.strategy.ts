import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Architect } from 'src/architect/models/architect.model';
import { ArchitectService } from 'src/architect/architect.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private architectService: ArchitectService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: Architect['id']; architectName: string }) {
    const architect = this.architectService.findArchitectById(payload.sub);

    if (!architect) {
      throw new UnauthorizedException('Unauthorized');
    }

    return architect;
  }
}
