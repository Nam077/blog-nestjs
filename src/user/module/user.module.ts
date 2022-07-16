import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { AuthService } from 'src/auth/service/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
