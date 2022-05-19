import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dto";
import { users } from "src/models/user.entity";
import { Repository, UpdateResult } from "typeorm";
import * as bcrypt from 'bcrypt';
import { sendEmail } from "../email/sendemail";
import { JwtService } from "@nestjs/jwt";
import { identity } from "rxjs";
import { Response } from "express";
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(users)
        private readonly userrepo: Repository<users>, private jwt: JwtService) { }
    private user: users[] = [];
    async signup(dto: UserDto): Promise<users> {
        try {
            const hash = await bcrypt.hash(dto.User_password, 5)
            const user = this.userrepo.create()
            user.User_name = dto.User_name;
            user.User_Emailid = dto.User_Emailid;
            user.User_password = hash;
            user.Contact_number = dto.Contact_number;

            const userdata=await this.userrepo.save(user);
            sendEmail(dto.User_Emailid,userdata.User_id)
            return userdata;
        }
         catch (error) {
            throw new ForbiddenException("Credential taken")
        }

    }
    getallusers():Promise<UserDto[]>{
        return this.userrepo.find()
    }
    
    finduser(condtinion: any): Promise<users> {
        return this.userrepo.findOne({ where: condtinion });
    }
    updateuser(User_id: number, user: users): Promise<UpdateResult> {
        return this.userrepo.update(User_id, user)
    }

   async confirmEmail(id:string,res:Response){
  const userId = await this.userrepo.findOne({where:{User_id:id}})
    if(!userId){
        throw new NotFoundException();
    }
  await this.userrepo.update({User_id:id},{Confirmed:true})
  res.send("Confirm")

   }
}

