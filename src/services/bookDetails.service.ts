import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { bookdetails } from 'src/models/bookDetails.entity';
import { BookDto } from 'src/dto/bookDetails.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(bookdetails)
        private readonly bookRepository:Repository<bookdetails> ,
        ){}
        private bookcategory:bookdetails[]=[];
    
    async addBook(dto:BookDto): Promise<bookdetails>{

       try{ 
        const bookdetails = this.bookRepository.create()
        bookdetails.Book_Name=dto.Book_Name
        bookdetails.Book_Category_Id=dto.Book_Category_Id;  
        bookdetails.Book_Publisher_Id=dto.Book_Publisher_Id;
        

        await this.bookRepository.save(bookdetails);
        return bookdetails;


       }catch(error ){
          throw new ForbiddenException("please add valid info")
       }
      
    }
    async getBook():Promise<bookdetails[]>
    {  
      return await this.bookRepository.find({
          relations:['Book_Category_Id','Book_Publisher_Id']
      });
    }

    async updatecategory(Book_id:number,dto:BookDto):Promise<BookDto>{
        const bookData=await this.bookRepository.findOne({where:{Book_id:Book_id}})

        bookData.Book_Name=dto.Book_Name;
        bookData.Book_Category_Id=dto.Book_Category_Id;
        bookData.Book_Publisher_Id=dto.Book_Publisher_Id;
        

        await this.bookRepository.save(bookData)

        return bookData;
    }

    deletebook(Book_id:number):Promise<DeleteResult>{
        return this.bookRepository.delete({Book_id})
    }

}
