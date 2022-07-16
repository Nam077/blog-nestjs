import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { UserService } from 'src/user/service/user.service';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [AuthService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
