import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module'; // Add this line

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule], // Add AuthModule to imports
  controllers: [],
  providers: [],
})
export class AppModule {}
