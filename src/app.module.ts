import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'node:path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
