import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/user.controller';
import { users } from 'src/models/user.entity';
import { UsersService } from 'src/services/user.service';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([users]),
  JwtModule.register({
    secret:'secret',
    signOptions:{expiresIn :'36000s'}
  })],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
 

})
export class userModule{}
