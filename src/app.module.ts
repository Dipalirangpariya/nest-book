import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { users } from './models/user.entity';
import { bookdetails } from './models/bookDetails.entity';
import { bookcatogery } from './models/bookCategory.entity';
import { bookPublisher } from './models/bookpublisher.entity';
import { BookModule } from './modules/bookDetails.module';
import { BookpublisherModule } from './modules/bookpublisher.module';
import { BookcategoryModule } from './modules/bookcategory.module';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
    imports: [ConfigModule.forRoot({isGlobal:true}),
      TypeOrmModule.forRoot({
        type:'postgres',
        host:'localhost',
        port:5432,
        username:process.env.DATABASE_USER_NAME,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE_NAME,
        entities:[users,bookdetails,bookcatogery,bookPublisher],
        autoLoadEntities:true,
        synchronize:true,
  
      }),userModule,BookpublisherModule,BookcategoryModule,BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
