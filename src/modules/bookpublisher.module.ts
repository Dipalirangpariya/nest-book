import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookpublisherController } from 'src/controllers/bookpublisher.controller';
import { bookPublisher } from 'src/models/bookpublisher.entity';
import { BookpublisherService } from 'src/services/bookpublisher.service';
@Module({
  imports:[TypeOrmModule.forFeature([bookPublisher])],
  controllers: [BookpublisherController],
  providers: [BookpublisherService]
})
export class BookpublisherModule {}

                                     