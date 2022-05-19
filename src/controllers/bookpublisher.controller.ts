import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { info } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { BookPublisherDto } from 'src/dto/bookPublisher.dto';
import { BookpublisherService } from 'src/services/bookpublisher.service';
import { bookPublisher } from 'src/models/bookpublisher.entity';
import { UpdateResult } from 'typeorm';

@Controller('bookpublisher')
export class BookpublisherController {
    constructor(private bookPublisherService: BookpublisherService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('addbookpublisher')
    signup(@Body() dto: BookPublisherDto) {
        console.log({ dto: dto });
        return this.bookPublisherService.addBookPublisher(dto)
    }

    @Put('updatepublisher/:Book_Publisher_Id')
    async updatepublisher(@Param('Book_Publisher_Id')Book_Publisher_Id:number,
    @Body()dto:BookPublisherDto){
         return  await this.bookPublisherService.updatepublisher(Book_Publisher_Id,dto)
    }
    // @UseGuards(AuthGuard('jwt'))
    @Get('getallpublisher')
    getallpublisher() {
        return this.bookPublisherService.getpublisher();

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('deletepublisher/:Book_Publisher_Id')
    async removeproduct(@Param('Book_Publisher_Id') Book_Publisher_Id: number) {
        let deleteproduct = await this.bookPublisherService.deletepublisher(Book_Publisher_Id);
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
