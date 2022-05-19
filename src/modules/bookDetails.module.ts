import { Module } from '@nestjs/common';
import { BookService } from 'src/services/bookDetails.service';
import { BookController } from 'src/controllers/bookDetails.controller';
import { bookdetails } from 'src/models/bookDetails.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([bookdetails])],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
