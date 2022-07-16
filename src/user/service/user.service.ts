import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../model/user.entity';
import { User } from '../model/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private authService: AuthService,
    ) {}
    //throw HttpException if username and email already exists
    create(createUserDto: CreateUserDto): Observable<User> {
        return from(this.userRepository.findOneBy({ username: createUserDto.username })).pipe(
            switchMap((user) => {
                if (user) {
                    throw new HttpException('Username already exists', 400);
                }
                return from(this.userRepository.findOneBy({ email: createUserDto.email }));
            }),
            switchMap((user) => {
                if (user) {
                    throw new HttpException('Email already exists', 400);
                }
                return this.authService.hashPassword(createUserDto.password).pipe(
                    switchMap((hash) => {
                        createUserDto.password = hash;
                        return from(this.userRepository.save(createUserDto));
                    }),
                );
            }),
        );
    }
    //delete password from list of users
    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users) => {
                users.forEach((user) => {
                    delete user.password;
                });
                return users;
            }),
        );
    }

    findOneByEmail(email: string): Observable<User> {
        return from(this.userRepository.findOneBy({ email: email }));
    }
    findOneByUsername(username: string): Observable<User> {
        return from(this.userRepository.findOneBy({ username: username }));
    }

    findOne(id: number): Observable<User> {
        //delete password from user
        return from(this.userRepository.findOneBy({ id: id })).pipe(
            map((user) => {
                delete user.password;
                return user;
            }),
        );
    }
    //updateOne using hashPassword from AuthService
    update(id: number, updateUserDto: UpdateUserDto): Observable<any> {
        return from(this.userRepository.findOneBy({ id: id })).pipe(
            switchMap((user) => {
                return this.authService.hashPassword(updateUserDto.password).pipe(
                    switchMap((hash) => {
                        user.password = hash;
                        return from(this.userRepository.save(user));
                    }),
                );
            }),
        );
    }

    remove(id: number): Observable<any> {
        //throw HttpException if user is not found
        return from(this.userRepository.findOneBy({ id: id })).pipe(
            switchMap((user) => {
                if (!user) {
                    throw new HttpException('User not found', 400);
                }
                return from(this.userRepository.delete({ id: id }));
            }),
        );
    }
    //findOneByEmail and findOneByUsername
    findOneBy(type: string, value: string): Observable<User> {
        return from(this.userRepository.findOneBy({ [type]: value }));
    }
}
