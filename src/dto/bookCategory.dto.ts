
import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class BookCategoryDto {
    @IsString()
    @IsNotEmpty() 
    Book_Category_Name: string;
  
    @IsString()
    Book_Description:string;
    
  
  }
  