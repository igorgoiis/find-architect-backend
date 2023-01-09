import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'node:path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServiceRequestModule } from './service-request/service-request.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    ServiceRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
