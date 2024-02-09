import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { configModule } from './config/config.module'

@Module({
  imports: [configModule, UserModule, DatabaseModule],
})
export class AppModule {}
