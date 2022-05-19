import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookService } from 'src/services/bookDetails.service';
import { bookdetails } from 'src/models/bookDetails.entity';
import { Request } from 'express'
import { BookDto } from 'src/dto/bookDetails.dto';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('addbook')
    async signup(@Body() dto: BookDto) {
        console.log({ dto: dto });
        const bookData = await this.bookService.addBook(dto)
        if (bookData) {
            return {
                message: "successfully book created",
                status: HttpStatus.CREATED,
                bookData: bookData,

            }

        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('getbook')
    async getBook() {
        const bookData = await this.bookService.getBook()
        if (bookData) {
            return {
                message: "All books Details",
                status: HttpStatus.CREATED,
                bookData: bookData
            }

        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updatebookdetails/:Book_id')
    async updatecatrgory(@Param('Book_id') Book_id: number,
        @Body() dto: BookDto) {
        let update = await this.bookService.updatecategory(Book_id, dto);
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
    @Delete('deletepublisher/: Book_id')
    async deletebook(@Param(' Book_id') Book_id: number) {
        let deleteproduct = await this.bookService.deletebook(Book_id);

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