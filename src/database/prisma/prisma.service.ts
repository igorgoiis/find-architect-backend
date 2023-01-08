import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();

    // /**
    //  * Exclude architect password
    //  *
    //  * This middleware excludes the password field from architect when passed as a parameter in queries
    //  */
    this.$use(async (params, next) => {
      const result = await next(params);

      if (
        params?.model === 'Architect' &&
        params?.args?.select?.password !== true
      ) {
        if (Array.isArray(result)) {
          result.forEach((architect) => delete architect.password);
        } else {
          if (result) {
            delete result.password;
          }
        }
      }

      return result;
    });

    /**
     *  Adding hash password
     *
     *  This middlware adds hash in the password architect
     * */
    this.$use(async (params, next) => {
      if (params.action == 'create' && params.model == 'Architect') {
        const architect = params.args.data;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(architect.password, salt);
        architect.password = hash;
        params.args.data = architect;
      }

      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
