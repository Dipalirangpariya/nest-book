
import {
  
    IsNotEmpty,
   
    IsString,
  
  } from 'class-validator';
  
  export class BookPublisherDto {
    @IsString()
    @IsNotEmpty() 
    Book_Publisher_Name: string;
  

  
  
  }