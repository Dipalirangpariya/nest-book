import {
    IsNotEmpty,
    IsNumber,
    IsString,
  } from 'class-validator';
  
  export class BookDto {
    @IsString() 
    Book_Name: string;
  
    

    @IsNotEmpty()
    Book_Category_Id:string;

      
    @IsNotEmpty()
    Book_Publisher_Id: string;

    // @IsString()
    // @IsNotEmpty()
    // bookUser_id: string;
  
  
  }
  