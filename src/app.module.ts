import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module'; // Add this line
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, PostsModule], // Add AuthModule to imports
  controllers: [],
  providers: [],
})
export class AppModule {}
