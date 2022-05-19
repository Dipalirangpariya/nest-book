import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { bookPublisher } from 'src/models/bookpublisher.entity';
import { BookPublisherDto } from 'src/dto/bookPublisher.dto';
import { ID } from '@nestjs/graphql';

@Injectable()
export class BookpublisherService {
    constructor(
        @InjectRepository(bookPublisher)
        private readonly bookPublisherRepository:Repository<bookPublisher>){}
        private bookcategory:bookPublisher[]=[];
    
    async addBookPublisher(dto:BookPublisherDto): Promise<bookPublisher>{


       try{
        const bookPublisher = this.bookPublisherRepository.create()
        bookPublisher.Book_Publisher_Name=dto.Book_Publisher_Name;    
        
        await this.bookPublisherRepository.save(bookPublisher);
        return bookPublisher;
       }catch(error ){
          throw new ForbiddenException("This Publisher already exist")
       }
      
    }
 
 
 async updatepublisher(Book_Publisher_Id:number,dto:BookPublisherDto):Promise<bookPublisher> {
   const publisherData = await this.bookPublisherRepository.findOne({ where: { Book_Publisher_Id:Book_Publisher_Id  } })

  publisherData.Book_Publisher_Name=dto.Book_Publisher_Name;

   await this.bookPublisherRepository.save(publisherData)

   return publisherData
} 

 getpublisher():Promise<bookPublisher[]>{
    return this.bookPublisherRepository.find()
 }


 deletepublisher(Book_Publisher_Id:number):Promise<DeleteResult>{
    return this.bookPublisherRepository.delete({Book_Publisher_Id})
}
}
