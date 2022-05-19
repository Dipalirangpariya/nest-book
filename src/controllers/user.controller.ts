import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException, HttpCode, HttpStatus, Put, UseGuards, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/user.service';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { Request, response } from 'express';
import * as bcrypt from 'bcrypt';
import { users } from 'src/models/user.entity';
import { Any } from 'typeorm';
import { PassThrough } from 'stream';
import { UserDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { Response as reS } from 'express';

@Controller('user')
export class UsersController {
    constructor(private readonly userservice: UsersService, private JwtService: JwtService) { }


    @Get('/confirm/:id')
    async confirmEmail(@Param('id') id: string, @Response() res: reS) {
        return this.userservice.confirmEmail(id, res);
    }

    @Post('signup')
    signup(@Body() dto: UserDto) {
        return this.userservice.signup(dto)
    }



    @Post('login')
    async login(
        @Body('User_Emailid') User_Emailid: string,
        @Body('User_password') User_password: string,
        @Res({ passthrough: true }) response: reS) {

        const user = await this.userservice.finduser({ User_Emailid })
        if (!User_Emailid) {
            throw new BadRequestException('invalid emailid')
        }
        if(user.Confirmed==false){
            throw new BadRequestException('Please,confirm Email');
            
        }
        if (!await bcrypt.compare(User_password, user.User_password)) {
            throw new BadRequestException('invalid password')
        }

        const jwt = await this.JwtService.signAsync({ User_id: user.User_id });
        response.cookie('jwt', jwt, { httpOnly: true });
        var token = jwt;
        return ({ "access_token": token });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/updateuser/:User_id')
    async updateuser(
        @Param('User_id') User_id: number,
        @Body() user: users) {
        let update = await this.userservice.updateuser(User_id, user);
        if (update) {

            return {
                status: 'success',
                code: HttpStatus.ACCEPTED,
                userdetails: update
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
    @Get('users_details')
    async alluser() {
        const allusers = await this.userservice.getallusers()
        if (allusers) {
            return {
                message: "All books Details",
                status: HttpStatus.CREATED,
                usersdata: allusers
            }
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('userdetails')
    async user(@Req() request: Request) {
        try {
            const Access_token = request.cookies['jwt'];
            const data = await this.JwtService.verifyAsync(Access_token);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userservice.finduser({ id: data['id'] })
            return user;
        }
        catch (e) {
            throw new UnauthorizedException();

        }
    }
}
