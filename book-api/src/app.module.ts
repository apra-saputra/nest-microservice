import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Create Configuration
    }),
    BookModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
