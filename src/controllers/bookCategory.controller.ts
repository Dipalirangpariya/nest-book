import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { info } from 'console';
import { AuthGuard } from '@nestjs/passport';

import { JwtService } from '@nestjs/jwt';
import { BookcategoryService } from 'src/services/bookCategory.service';
import { BookCategoryDto } from 'src/dto/bookCategory.dto';
import { identity } from 'rxjs';
import { bookcatogery } from 'src/models/bookCategory.entity';

@Controller('bookcategory')
export class BookcategoryController {

    constructor(private bookcategoryservice: BookcategoryService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('addbookcategory')
    addcategory(@Body() dto: BookCategoryDto) {
        console.log({ dto: dto });
        return this.bookcategoryservice.addBookCategory(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getallcategory')
    getallcategory() {
        return this.bookcategoryservice.getcategory();

    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put('updatecategory/:Book_Category_Id')
    async updatecatrgory(@Param('Book_Category_Id') Book_Category_Id: number,
        @Body() dto: BookCategoryDto) {
        let update = await this.bookcategoryservice.updatecategory(Book_Category_Id, dto);
        if (update) {
            return {
                status: 'success',
                code: HttpStatus.OK,
                Category: update
            }
        } else {

            return {
                status: 'fail',
                code: HttpStatus.NOT_ACCEPTABLE,
                message: 'data could not be updated'
            }
        }
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('deletecategory/:Book_Category_Id')
    async removeproduct(@Param('Book_Category_Id') Book_Category_Id: number) {
        let deleteproduct = await this.bookcategoryservice.deletecategory(Book_Category_Id);

        if (deleteproduct) {
            return {
                status: 'success',
                code: HttpStatus.OK,
                productdetails: deleteproduct
            }
        } else {

            return {
                status: 'fail',
                code: HttpStatus.NOT_ACCEPTABLE,
                message: 'data is not removed'
            }

        }
    }

}

