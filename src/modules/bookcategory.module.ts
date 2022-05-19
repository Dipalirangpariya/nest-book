import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bookcatogery } from 'src/models/bookCategory.entity';
import { BookcategoryController } from 'src/controllers/bookCategory.controller';
import { BookcategoryService } from 'src/services/bookCategory.service';


@Module({
    imports:[TypeOrmModule.forFeature([bookcatogery])],
    providers: [BookcategoryService],
    controllers: [BookcategoryController]
  })
export class BookcategoryModule {}
