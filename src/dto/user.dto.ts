import {
    IsEmail,
    isNotEmpty,
    IsNotEmpty,
    isNumber,
    IsNumberString,
    isPhoneNumber,
    IsString,
    Length,
    Matches,
    MaxLength,
    minLength,
    MinLength,
  
  } from 'class-validator';

  export type UserRoleType = "admin" | "user";

  export class UserDto {

  
    @IsNotEmpty()
    @MaxLength(20)
    User_name:string;

    @IsEmail()
    @IsNotEmpty()
    User_Emailid: string;


    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    User_password: string;

    @MinLength(9)
    @MaxLength(15)
    @IsNumberString()
    Contact_number:string;

   
  }
  